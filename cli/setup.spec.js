const path = require("path");
const axios = require("axios");
const fs = require("fs");
const childProcess = require("child_process");
const setup = require("./setup");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("fs");
jest.mock("child_process");

describe("setup", () => {
  test("Downloads quicklisp", async () => {
    await setup();
    expect(axios.get).toHaveBeenCalledWith(
      "https://beta.quicklisp.org/quicklisp.lisp"
    );
  });
  test("Saves quicklisp installer to the file setup.lisp", async () => {
    await setup();
    const { data } = await axios.get();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
      `${data}\n(quicklisp-quickstart:install :path ${path.resolve(
        PACKAGE_ROOT,
        "quicklisp"
      )})`
    );
  });
  test("Runs the quicklisp installer", async () => {
    await setup();
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      [
        "--no-userinitPACKAGE_ROOT--non-interactive",
        path.resolve(PACKAGE_ROOT, "setup.lisp"),
      ],
      { stdio: "inherit" }
    );
  });
  test("Deletes the quicklisp installer", async () => {
    expect(fs.unlinkSync).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp")
    );
  });
});
