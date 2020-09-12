const path = require("path");
const fs = require("fs").promises;

const PACKAGE_ROOT = path.resolve(__dirname, "..");

const existsAsync = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = {
  PACKAGE_ROOT,
  existsAsync,
};
