const path = require("path");
const utils = require("./utils");

utils.existsAsync = jest.fn();
const { PACKAGE_ROOT } = utils;

const toAbsolutePath = require("./toAbsolutePath");

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

describe("toAbsolutePath", () => {
  test("Works with absolute paths", async () => {
    utils.existsAsync.mockResolvedValueOnce(true);
    const result = await toAbsolutePath(
      path.join(PACKAGE_ROOT, "package.json")
    );
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Works with relative paths", async () => {
    utils.existsAsync.mockResolvedValueOnce(true);
    process.chdir(PACKAGE_ROOT);
    const result = await toAbsolutePath("./package.json");
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Works with relative paths that do not have ./", async () => {
    utils.existsAsync.mockResolvedValueOnce(true);
    process.chdir(PACKAGE_ROOT);
    const result = await toAbsolutePath("package.json");
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Quits with an error code on nonexistant paths", async () => {
    utils.existsAsync.mockResolvedValueOnce(false);
    await toAbsolutePath("___THIS_FILE_DOES_NOT_EXIST____");
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
