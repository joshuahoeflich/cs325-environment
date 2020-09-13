const path = require("path");
const childProcess = require("child_process");
const { PACKAGE_ROOT } = require("./utils");
const { repl } = require("./repl");

jest.mock("child_process");

describe("ai Repl command", () => {
  test("Runs sbcl with the appropriate config file", async () => {
    await repl();
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      ["--userinit", path.join(PACKAGE_ROOT, "quicklisp", "sbclrc")],
      { stdio: "inherit" }
    );
  });
});
