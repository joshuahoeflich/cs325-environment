const path = require("path");
const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");
const toAbsolutePath = require("./toAbsolutePath");
const { runOnFileChange } = require("./runOnFileChange");
const { PACKAGE_ROOT } = require("./utils");

const criticLogic = (absolutePath) => {
  const sbclrc = path.join(PACKAGE_ROOT, "quicklisp", "sbclrc");
  childProcess.spawnSync(
    "sbcl",
    [
      "--noinform",
      "--userinit",
      sbclrc,
      "--non-interactive",
      "--eval",
      `(critique-file "${absolutePath}")`,
    ],
    { stdio: "inherit" }
  );
};

const critic = async (filePath, { watch }) => {
  await setupWhenNeeded();
  const absoluteFilePath = await toAbsolutePath(filePath);
  if (!watch) {
    criticLogic(absoluteFilePath);
    return;
  }
  runOnFileChange(absoluteFilePath, criticLogic);
};

module.exports = {
  critic,
  criticLogic,
};
