const path = require("path");
const fsExtra = require("fs-extra");
const { cleanLogic: clean } = require("./clean");
const { PACKAGE_ROOT } = require("./utils");

describe("clean", () => {
  test("Removes all installed lisp files", async () => {
    await clean();
    expect(fsExtra.remove).toHaveBeenCalledWith(
      path.join(PACKAGE_ROOT, "quicklisp")
    );
  });
  test("Removes all installed JavaScript files", async () => {
    await clean();
    expect(fsExtra.remove).toHaveBeenCalledWith(path.join(PACKAGE_ROOT, "js"));
  });
});
