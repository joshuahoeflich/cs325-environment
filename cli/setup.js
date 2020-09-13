const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const Git = require("simple-git");
const ora = require("ora");
const chalk = require("chalk");
const { exec, existsAsync, PACKAGE_ROOT } = require("./utils");

const git = new Git();

const QUICKLISP_SETUP = `
(quicklisp-quickstart:install :path #P"${path.resolve(
  PACKAGE_ROOT,
  "quicklisp"
)}")

(ql:register-local-projects)
`;

const SBCLRC = `
#-quicklisp
(let ((quicklisp-init #P"${path.resolve(
  PACKAGE_ROOT,
  "quicklisp",
  "setup.lisp"
)}"))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(eval-when (:compile-toplevel :load-toplevel :execute)
  (ql:quickload "cs325")
  (setq *package* (find-package :cs325-user)))
`;

const cloneCourseCode = async () => {
  await git.clone(
    process.env.CS325_LISP_REPO,
    path.join(PACKAGE_ROOT, "quicklisp", "local-projects")
  );
};

const configureQuicklisp = async () => {
  const { data } = await axios.get(process.env.QUICKLISP_URL);
  await Promise.all([
    fs.writeFile(
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
      `${data}\n${QUICKLISP_SETUP}`
    ),
    fs.writeFile(path.resolve(PACKAGE_ROOT, "quicklisp", "sbclrc"), SBCLRC),
  ]);
  await exec("sbcl", [
    "--no-userinit",
    "--non-interactive",
    "--load",
    path.resolve(PACKAGE_ROOT, "setup.lisp"),
  ]);
  await fs.unlink(path.resolve(PACKAGE_ROOT, "setup.lisp"));
};

const setupLogic = async () => {
  const fileExists = await existsAsync(path.join(PACKAGE_ROOT, "quicklisp"));
  if (fileExists) return;
  await cloneCourseCode();
  await configureQuicklisp();
};

const setup = async () => {
  const spinner = ora("Beginning setup...").start();
  try {
    await setupLogic();
    spinner.succeed(chalk.bold.green("Set up successful."));
  } catch (err) {
    spinner.fail(chalk.bold.red("ERROR: ", err));
  }
};

const setupWhenNeeded = async () => {
  const fileExists = await existsAsync(path.join(PACKAGE_ROOT, "quicklisp"));
  if (fileExists) return;
  // eslint-disable-next-line no-console
  console.log(chalk.blue("Quicklisp not found. Initiating setup..."));
  await setup();
};

module.exports = {
  setupWhenNeeded,
  setup,
  setupLogic,
  QUICKLISP_SETUP,
  SBCLRC,
};
