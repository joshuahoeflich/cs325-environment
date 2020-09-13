const path = require("path");
const chalk = require("chalk");
const { existsAsync } = require("./utils");

const toAbsolutePath = async (filePath) => {
  const normalizedPath = path.normalize(filePath);
  const pathExists = await existsAsync(normalizedPath);
  if (pathExists) return path.resolve(normalizedPath);
  /* eslint-disable no-console */
  console.error(chalk.bold.red(`${filePath} DOES NOT EXIST`));
  console.log(chalk.yellow("Please pass a valid file path and try again."));
  process.exit(1);
  /* eslint-enable no-console */
  return null;
};

module.exports = toAbsolutePath;
