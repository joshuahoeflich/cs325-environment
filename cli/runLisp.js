const path = require("path");
const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");
const toAbsolutePath = require("./toAbsolutePath");
const { runOnFileChange } = require("./runOnFileChange");
const { PACKAGE_ROOT } = require("./utils");

const runLispLogic = (absolutePath) => {
  const sbclrc = path.join(PACKAGE_ROOT, "quicklisp", "sbclrc");
  childProcess.spawnSync(
    "sbcl",
    [
      "--noinform",
      "--userinit",
      sbclrc,
      "--non-interactive",
      "--load",
      absolutePath,
    ],
    { stdio: "inherit" }
  );
};

const runLisp = async (filePath, { watch }) => {
  await setupWhenNeeded();
  const absoluteFilePath = await toAbsolutePath(filePath);
  if (!watch) {
    runLispLogic(absoluteFilePath);
    return;
  }
  runOnFileChange(absoluteFilePath, runLispLogic);
};

module.exports = {
  runLisp,
  runLispLogic,
};
