const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");
const Git = require("simple-git");
const { PACKAGE_ROOT } = require("./utils");

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
  fs.writeFileSync(
    path.resolve(PACKAGE_ROOT, "setup.lisp"),
    `${data}\n${QUICKLISP_SETUP}`
  );
  childProcess.spawnSync(
    "sbcl",
    [
      "--no-userinit",
      "--non-interactive",
      "--load",
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
    ],
    { stdio: "inherit" }
  );
  fs.unlinkSync(path.resolve(PACKAGE_ROOT, "setup.lisp"));
};

const setup = async () => {
  if (fs.existsSync(path.join(PACKAGE_ROOT, "quicklisp"))) {
    // eslint-disable-next-line no-console
    console.log(chalk.bold.blue("Setup has already been completed, skipping."));
    return;
  }
  await cloneCourseCode();
  await configureQuicklisp();
};

module.exports = { setup, QUICKLISP_SETUP };
