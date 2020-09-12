const fs = require("fs");
const path = require("path");
const axios = require("axios");

const setup = async () => {
  const { data } = await axios.get("https://beta.quicklisp.org/quicklisp.lisp");
  fs.writeFileSync(
    path.resolve("..", "setup.lisp"),
    `${data}\n(quicklisp-quickstart:install :path ${path.resolve(
      "..",
      "quicklisp"
    )})`
  );
};

module.exports = setup;
