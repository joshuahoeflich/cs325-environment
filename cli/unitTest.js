const path = require("path");
const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");
const toAbsolutePath = require("./toAbsolutePath");
const { runOnFileChange } = require("./runOnFileChange");
const { PACKAGE_ROOT } = require("./utils");

const getTestSnippets = (absolutePath) => {
  return [
    "--eval",
    `(load "${absolutePath}")`,
    "--eval",
    `(run-tests ${path.basename(absolutePath, ".lisp")})`,
  ];
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
      ...getTestSnippets(absolutePath),
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
  getTestSnippets,
};
