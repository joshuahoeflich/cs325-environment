const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const Git = require("simple-git");
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
  await exec(
    "sbcl",
    [
      "--no-userinit",
      "--non-interactive",
      "--load",
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
    ],
    { stdio: "inherit" }
  );
  await fs.unlink(path.resolve(PACKAGE_ROOT, "setup.lisp"));
};

const setup = async () => {
  const fileExists = await existsAsync(path.join(PACKAGE_ROOT, "quicklisp"));
  if (fileExists) return;
  await cloneCourseCode();
  await configureQuicklisp();
};

module.exports = { setup, QUICKLISP_SETUP };
