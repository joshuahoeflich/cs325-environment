const path = require("path");
const childProcess = require("child_process");
const chokidar = require("chokidar");
const { unitTest, unitTestLogic, getTestSnippet } = require("./unitTest");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("child_process");

describe("ai test", () => {
  test("Unit tests with a file specified by the user", async () => {
    await unitTest("./package.json", { watch: false });
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      [
        "--noinform",
        "--userinit",
        path.join(PACKAGE_ROOT, "quicklisp", "sbclrc"),
        "--non-interactive",
        "--eval",
        getTestSnippet(path.join(PACKAGE_ROOT, "package.json")),
      ],
      { stdio: "inherit" }
    );
  });
  test("Watches when the watch option is specified", async () => {
    await unitTest("./package.json", { watch: true });
    const absoluteFilePath = path.join(PACKAGE_ROOT, "package.json");
    expect(chokidar.watch).toHaveBeenCalledWith(absoluteFilePath, {
      persistent: true,
    });
    expect(chokidar.watch().on).toHaveBeenCalledWith("add", unitTestLogic);
  });
});
