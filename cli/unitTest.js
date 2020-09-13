const path = require("path");
const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");
const toAbsolutePath = require("./toAbsolutePath");
const { runOnFileChange } = require("./runOnFileChange");
const { PACKAGE_ROOT } = require("./utils");

const getTestSnippet = (absolutePath) => {
  const basename = path.basename(absolutePath);
  return `
  (load "${absolutePath}")
  (run-test ${basename})
  `;
};

const unitTestLogic = (absolutePath) => {
  const sbclrc = path.join(PACKAGE_ROOT, "quicklisp", "sbclrc");
  childProcess.spawnSync(
    "sbcl",
    [
      "--noinform",
      "--userinit",
      sbclrc,
      "--non-interactive",
      "--eval",
      getTestSnippet(absolutePath),
    ],
    { stdio: "inherit" }
  );
};

const unitTest = async (filePath, { watch }) => {
  await setupWhenNeeded();
  const absoluteFilePath = await toAbsolutePath(filePath);
  if (!watch) {
    unitTestLogic(absoluteFilePath);
    return;
  }
  runOnFileChange(absoluteFilePath, unitTestLogic);
};

module.exports = {
  unitTest,
  unitTestLogic,
  getTestSnippet,
};
