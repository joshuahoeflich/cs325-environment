const path = require("path");
const childProcess = require("child_process");
const { PACKAGE_ROOT } = require("./utils");
const { setupWhenNeeded } = require("./setup");

const repl = async () => {
  await setupWhenNeeded();
  childProcess.spawnSync("sbcl", [
    "--userinit",
    path.join(PACKAGE_ROOT, "quicklisp", "sbclrc"),
  ]);
};

module.exports = { repl };
