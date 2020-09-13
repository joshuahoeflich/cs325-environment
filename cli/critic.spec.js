const childProcess = require("child_process");
const { critic } = require("./critic");

jest.mock("child_process");

describe("ai critic", () => {
  test("Calls critique-file on a file specified by the user", async () => {
    await critic();
    expect(childProcess.spawnSync).toHaveBeenCalledWith("sbcl", [], {
      stdio: "inherit",
    });
  });
});
