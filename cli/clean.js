const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const fsExtra = require("fs-extra");
const { PACKAGE_ROOT } = require("./utils");

const cleanLogic = async () => {
  await Promise.all([
    fsExtra.remove(path.join(PACKAGE_ROOT, "quicklisp")),
    fsExtra.remove(path.join(PACKAGE_ROOT, "js")),
  ]);
};

const clean = async () => {
  const spinner = ora("Beginning setup...").start();
  try {
    await cleanLogic();
    spinner.succeed(chalk.bold.green("Cleaning successful."));
  } catch (err) {
    spinner.fail(chalk.bold.red("ERROR: ", err));
  }
};

module.exports = {
  cleanLogic,
  clean,
};
