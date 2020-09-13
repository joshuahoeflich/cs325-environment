const path = require("path");
const browserSyncFactory = require("browser-sync");
const { PACKAGE_ROOT } = require("./utils");

const js = () => {
  const browserSync = browserSyncFactory.create();
  browserSync.init({
    server: path.resolve(PACKAGE_ROOT, "js"),
    port: 5500,
  });
};

module.exports = {
  js,
};
