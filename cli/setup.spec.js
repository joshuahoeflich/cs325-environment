const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");
const axios = require("axios");
const chalk = require("chalk");
const { setup, QUICKLISP_SETUP } = require("./setup");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("fs");
jest.mock("child_process");
const consoleLog = jest.spyOn(console, "log").mockImplementation();

describe("setup", () => {
  test("Does not run if there exists an existing Quicklisp installation", async () => {
    fs.existsSync.mockImplementationOnce(() => true);
    await setup();
    expect(fs.existsSync).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "quicklisp")
    );
    expect(consoleLog).toHaveBeenCalledWith(
      chalk.bold.blue("Setup has already been completed, skipping.")
    );
  });
  test("Downloads quicklisp", async () => {
    fs.existsSync.mockImplementationOnce(() => false);
    await setup();
    expect(axios.get).toHaveBeenCalledWith(
      "https://beta.quicklisp.org/quicklisp.lisp"
    );
  });
  test("Saves quicklisp installer to the file setup.lisp", async () => {
    fs.existsSync.mockImplementationOnce(() => false);
    await setup();
    const { data } = await axios.get();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
      `${data}\n${QUICKLISP_SETUP}`
    );
  });
  test("Runs the quicklisp installer", async () => {
    fs.existsSync.mockImplementationOnce(() => false);
    await setup();
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      [
        "--no-userinit",
        "--non-interactive",
        "--load",
        path.resolve(PACKAGE_ROOT, "setup.lisp"),
      ],
      { stdio: "inherit" }
    );
  });
  test("Deletes the quicklisp installer", async () => {
    fs.existsSync.mockImplementationOnce(() => false);
    expect(fs.unlinkSync).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp")
    );
  });
});
