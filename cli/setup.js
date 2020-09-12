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

const cloneCourseCode = async () => {
  await git.clone(
    process.env.CS325_LISP_REPO,
    path.join(PACKAGE_ROOT, "quicklisp", "local-projects")
  );
};

const configureQuicklisp = async () => {
  const { data } = await axios.get(process.env.QUICKLISP_URL);
  await fs.writeFile(
    path.resolve(PACKAGE_ROOT, "setup.lisp"),
    `${data}\n${QUICKLISP_SETUP}`
  );
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

module.exports = { setup, setupLogic, QUICKLISP_SETUP };
