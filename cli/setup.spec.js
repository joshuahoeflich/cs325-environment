const path = require("path");
const axios = require("axios");
const fs = require("fs");
const setup = require("./setup");

jest.mock("fs");

describe("setup", () => {
  test("Downloads quicklisp, saves it to the file setup.lisp, and runs it", async () => {
    await setup();
    expect(axios.get).toHaveBeenCalledWith(
      "https://beta.quicklisp.org/quicklisp.lisp"
    );
    const { data } = await axios.get();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.resolve("..", "setup.lisp"),
      `${data}\n(quicklisp-quickstart:install :path ${path.resolve(
        "..",
        "quicklisp"
      )})`
    );
  });
});
