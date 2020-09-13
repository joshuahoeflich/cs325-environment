#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");
const { clean: cleanSetup } = require("./clean");
const { repl: aiRepl } = require("./repl");

const DEFAULT_PROGRAM_CONFIG = {
  setup: quicklispSetup,
  clean: cleanSetup,
  repl: aiRepl,
};

const createProgram = (programConfig = DEFAULT_PROGRAM_CONFIG) => {
  const program = new Command();
  const { setup, clean, repl } = programConfig;
  program
    .name("ai")
    .version("0.0.0")
    .command("setup")
    .description("Installs Quicklisp and the CS 325 library.")
    .action(setup);
  program
    .command("clean")
    .description("Removes Quicklisp and the CS 325 library.")
    .action(clean);
  program
    .command("repl")
    .description("Run a repl with the CS 325 libraries loaded.")
    .action(repl);
  return program;
};

module.exports = createProgram;
