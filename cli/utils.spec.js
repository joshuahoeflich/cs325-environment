const path = require("path");
const fs = require("fs");
const { PACKAGE_ROOT } = require("./utils");

describe("PACKAGE_ROOT", () => {
  test("Returns an absolute path to the root of the package", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(PACKAGE_ROOT, "package.json"))
    );
    expect(packageJson.name).toEqual("@cs325/environment");
  });
});
