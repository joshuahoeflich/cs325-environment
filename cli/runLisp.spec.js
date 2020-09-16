const path = require("path");
const childProcess = require("child_process");
const chokidar = require("chokidar");
const { PACKAGE_ROOT } = require("./utils");
const { runLisp, runLispLogic } = require("./runLisp");

jest.mock("child_process");

describe("runLisp", () => {
  test("Invokes sbcl with the appropriate commands", async () => {
    await runLisp("./package.json", { watch: false });
    const absoluteFilePath = path.join(PACKAGE_ROOT, "package.json");
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      [
        "--noinform",
        "--userinit",
        path.join(PACKAGE_ROOT, "quicklisp", "sbclrc"),
        "--non-interactive",
        "--load",
        absoluteFilePath,
      ],
      { stdio: "inherit" }
    );
  });
  test("Invokes watch in the appropriate way", async () => {
    await runLisp("./package.json", { watch: true });
    const absoluteFilePath = path.join(PACKAGE_ROOT, "package.json");
    expect(chokidar.watch).toHaveBeenCalledWith(absoluteFilePath, {
      persistent: true,
    });
    expect(chokidar.watch().on).toHaveBeenCalledWith("add", runLispLogic);
  });
});
