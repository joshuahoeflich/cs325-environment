#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");

const DEFAULT_PROGRAM_CONFIG = {
  setup: quicklispSetup,
};

const createProgram = (programConfig = DEFAULT_PROGRAM_CONFIG) => {
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
