const path = require("path");
const { PACKAGE_ROOT, toAbsolutePath } = require("./utils");

describe("toAbsolutePath", () => {
  test("Works with absolute paths", async () => {
    const result = await toAbsolutePath(
      path.join(PACKAGE_ROOT, "package.json")
    );
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Works with relative paths", async () => {
    process.chdir(PACKAGE_ROOT);
    const result = await toAbsolutePath("./package.json");
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Works with relative paths that do not have ./", async () => {
    process.chdir(PACKAGE_ROOT);
    const result = await toAbsolutePath("package.json");
    expect(result).toBe(path.join(PACKAGE_ROOT, "package.json"));
  });
  test("Works with nonexistant paths", async () => {
    const result = await toAbsolutePath("___THIS_FILE_DOES_NOT_EXIST____");
    expect(result).toBe(null);
  });
});
