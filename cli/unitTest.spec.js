const path = require("path");
const childProcess = require("child_process");
const chokidar = require("chokidar");
const { unitTest, unitTestLogic, getTestSnippets } = require("./unitTest");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("child_process");

describe("getTestSnippets", () => {
  test("Returns an array that will execute a unit test via eval", () => {
    const absolutePath = path.resolve(PACKAGE_ROOT, "package.json");
    expect(getTestSnippets(absolutePath)).toEqual([
      "--eval",
      `(load "${absolutePath}")`,
      "--eval",
      `(run-tests ${path.basename(absolutePath, ".lisp")})`,
    ]);
  });
});

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
        ...getTestSnippets(path.join(PACKAGE_ROOT, "package.json")),
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
