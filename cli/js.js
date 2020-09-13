const path = require("path");
const browserSyncFactory = require("browser-sync");
const { setupWhenNeeded } = require("./setup");
const { PACKAGE_ROOT } = require("./utils");

const js = async () => {
  await setupWhenNeeded();
  const browserSync = browserSyncFactory.create();
  browserSync.init({
    server: path.resolve(PACKAGE_ROOT, "js"),
    port: 5500,
  });
};

module.exports = {
  js,
};
