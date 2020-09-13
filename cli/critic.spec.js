const path = require("path");
const childProcess = require("child_process");
const { critic } = require("./critic");
const { PACKAGE_ROOT } = require("./utils");

jest.mock("child_process");

describe("ai critic", () => {
  test("Calls critique-file on a file specified by the user", async () => {
    await critic("./package.json", { watch: false });
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      "sbcl",
      [
        "--noinform",
        "--userinit",
        path.join(PACKAGE_ROOT, "quicklisp", "sbclrc"),
        "--non-interactive",
        "--eval",
        `(critique-file "${path.join(PACKAGE_ROOT, "package.json")}")`,
      ],
      { stdio: "inherit" }
    );
  });
});
