const path = require("path");
const fs = require("fs");
const { PACKAGE_ROOT, existsAsync } = require("./utils");

fs.promises.access = jest.fn();

describe("PACKAGE_ROOT", () => {
  test("Returns an absolute path to the root of the package", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(PACKAGE_ROOT, "package.json"))
    );
    expect(packageJson.name).toEqual("@cs325/environment");
  });
});

describe("existsAsync", () => {
  test("Returns true when the folder does exist", async () => {
    fs.promises.access.mockImplementationOnce(() => true);
    const result = await existsAsync("/some/file");
    expect(result).toEqual(true);
  });
  test("Returns false when the folder does not exist", async () => {
    fs.promises.access.mockImplementationOnce(() => {
      throw new Error("FILE DOES NOT EXIST EXCEPTION");
    });
    const result = await existsAsync("/some/file");
    expect(result).toEqual(false);
  });
});
