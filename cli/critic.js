const childProcess = require("child_process");
const { setupWhenNeeded } = require("./setup");

const critic = async () => {
  await setupWhenNeeded();
  childProcess.spawnSync("sbcl", [], {
    stdio: "inherit",
  });
};

module.exports = {
  critic,
};
