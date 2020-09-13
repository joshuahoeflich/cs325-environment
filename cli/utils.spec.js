const path = require("path");
const fs = require("fs");
const { allFilesExist, PACKAGE_ROOT, existsAsync } = require("./utils");

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

describe("allFilesExist", () => {
  test("Returns true when all the files exist", async () => {
    fs.promises.access.mockImplementationOnce(() => true);
    const result = await allFilesExist();
    expect(result).toBe(true);
  });
  test("Returns false if any one of the files does not exist", async () => {
    fs.promises.access.mockImplementationOnce((arg) => {
      if (arg === path.join(PACKAGE_ROOT, "quicklisp")) {
        throw new Error("FILE NOT FOUND EXCEPTION");
      }
      return true;
    });
    const result = await allFilesExist();
    expect(result).toBe(false);
  });
});
