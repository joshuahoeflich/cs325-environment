const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");
const axios = require("axios");
const { PACKAGE_ROOT } = require("./utils");

const QUICKLISP_SETUP = `
(quicklisp-quickstart:install :path #P"${path.resolve(
  PACKAGE_ROOT,
  "quicklisp"
)}")

(ql:register-local-projects)
`;

const setup = async () => {
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
};

module.exports = { setup, QUICKLISP_SETUP };
