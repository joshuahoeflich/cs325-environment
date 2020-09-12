#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");

const createProgram = (programConfig) => {
  const program = new Command();
  const { setup } = programConfig;
  program
    .name("ai")
    .version("0.0.0")
    .command("setup")
    .description("Installs Quicklisp and the CS 325 library.")
    .action(setup);
  return program;
};

module.exports = createProgram;

process.on("unhandledRejection", (fatalError) => {
  throw fatalError;
});

const PROGRAM_CONFIG = {
  setup: quicklispSetup,
};

const main = async () => {
  const program = createProgram(PROGRAM_CONFIG);
  await program.parseAsync(process.argv);
};

if (require.main === module) {
  main();
}
