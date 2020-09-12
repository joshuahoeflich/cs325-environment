#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");
const { clean: cleanSetup } = require("./clean");

const DEFAULT_PROGRAM_CONFIG = {
  setup: quicklispSetup,
  clean: cleanSetup,
};

const createProgram = (programConfig = DEFAULT_PROGRAM_CONFIG) => {
  const program = new Command();
  const { setup, clean } = programConfig;
  program
    .name("ai")
    .version("0.0.0")
    .command("setup")
    .description("Installs Quicklisp and the CS 325 library.")
    .action(setup);
  program
    .command("clean")
    .description("Cleans all installed lisp files")
    .action(clean);
  return program;
};

module.exports = createProgram;
