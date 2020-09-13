const chokidar = require("chokidar");

const runOnFileChange = (filePath, fn) => {
  const watcher = chokidar.watch(filePath, { persistent: true });
  watcher.on("add", fn);
  watcher.on("change", fn);
};

module.exports = { runOnFileChange };
