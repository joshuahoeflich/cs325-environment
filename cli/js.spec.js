const browserSync = require("browser-sync");
const path = require("path");
const { PACKAGE_ROOT } = require("./utils");
const { js } = require("./js");

describe("js function", () => {
  test("Starts a server on port 5500", async () => {
    await js();
    expect(browserSync.create().init).toHaveBeenCalledWith({
      server: path.resolve(PACKAGE_ROOT, "js"),
      port: 5500,
    });
  });
});
