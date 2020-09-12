const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");
const { PACKAGE_ROOT } = require("./utils");

const QUICKLISP_SETUP = `
(quicklisp-quickstart:install :path #P"${path.resolve(
  PACKAGE_ROOT,
  "quicklisp"
)}")

(ql:register-local-projects)
`;

const configureQuicklisp = async () => {
  const { data } = await axios.get("https://beta.quicklisp.org/quicklisp.lisp");
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
}

const setup = async () => {
  if (fs.existsSync(path.join(PACKAGE_ROOT, "quicklisp"))) {
    // eslint-disable-next-line no-console
    console.log(chalk.bold.blue("Setup has already been completed, skipping."));
    return;
  }
  await configureQuicklisp();
};

module.exports = { setup, QUICKLISP_SETUP };
