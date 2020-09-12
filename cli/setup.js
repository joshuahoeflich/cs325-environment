const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");
const axios = require("axios");
const { PACKAGE_ROOT } = require("./utils");

const setup = async () => {
  const { data } = await axios.get("https://beta.quicklisp.org/quicklisp.lisp");
  fs.writeFileSync(
    path.resolve(PACKAGE_ROOT, "setup.lisp"),
    `${data}\n(quicklisp-quickstart:install :path ${path.resolve(
      PACKAGE_ROOT,
      "quicklisp"
    )})`
  );
  childProcess.spawnSync(
    "sbcl",
    [
      "--no-userinitPACKAGE_ROOT--non-interactive",
      path.resolve(PACKAGE_ROOT, "setup.lisp"),
    ],
    { stdio: "inherit" }
  );
  fs.unlinkSync(path.resolve(PACKAGE_ROOT, "setup.lisp"));
};

module.exports = setup;
