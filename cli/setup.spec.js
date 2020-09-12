const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");
const axios = require("axios");
const simpleGit = require("simple-git");
const { setup, QUICKLISP_SETUP } = require("./setup");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("fs");
jest.mock("child_process");

describe("setup", () => {
  test("Does not run if there exists an existing Quicklisp installation", async () => {
    fs.promises.access.mockImplementationOnce(() => true);
    await setup();
    expect(axios.get).not.toHaveBeenCalled();
  });
  test("Clones the CS395 code", async () => {
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST");
    });
    await setup();
    expect(simpleGit.prototype.clone).toHaveBeenCalledWith(
      process.env.CS325_LISP_REPO,
      path.join(PACKAGE_ROOT, "quicklisp", "local-projects")
    );
  });
  test("Downloads quicklisp", async () => {
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST");
    });
    await setup();
    expect(axios.get).toHaveBeenCalledWith(process.env.QUICKLISP_URL);
  });

  test("Saves quicklisp installer to the file setup.lisp", async () => {
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST");
    });
    await setup();
    const { data } = await axios.get();
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
      `${data}\n${QUICKLISP_SETUP}`
    );
  });
  test("Runs the quicklisp installer", async () => {
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST");
    });
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
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST");
    });
    await setup();
    expect(fs.promises.unlink).toHaveBeenCalledWith(
      path.resolve(PACKAGE_ROOT, "setup.lisp")
    );
  });
});
