const path = require("path");
const fs = require("fs").promises;
const util = require("util");
const exec = util.promisify(require("child_process").execFile);

const PACKAGE_ROOT = path.resolve(__dirname, "..");

const existsAsync = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (_) {
    return false;
  }
};

const allFilesExist = async () => {
  const filesExist = new Set(
    await Promise.all([
      existsAsync(path.join(PACKAGE_ROOT, "quicklisp")),
      existsAsync(path.join(PACKAGE_ROOT, "js")),
    ])
  );
  return !filesExist.has(false);
};

const toAbsolutePath = async (filePath) => {
  const normalizedPath = path.normalize(filePath);
  const pathExists = await existsAsync(normalizedPath);
  return pathExists ? path.resolve(normalizedPath) : null;
};

module.exports = {
  PACKAGE_ROOT,
  existsAsync,
  allFilesExist,
  exec,
  toAbsolutePath,
};
