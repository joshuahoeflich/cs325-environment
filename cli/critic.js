const path = require("path");
const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");
const toAbsolutePath = require("./toAbsolutePath");
const { PACKAGE_ROOT } = require("./utils");

const critic = async (filePath) => {
  await setupWhenNeeded();
  const absoluteFilePath = await toAbsolutePath(filePath);
  const sbclrc = path.join(PACKAGE_ROOT, "quicklisp", "sbclrc");
  childProcess.spawnSync(
    "sbcl",
    [
      "--userinit",
      sbclrc,
      "--non-interactive",
      "--eval",
      `(critique-file "${absoluteFilePath}")`,
    ],
    { stdio: "inherit" }
  );
};

module.exports = {
  critic,
};
