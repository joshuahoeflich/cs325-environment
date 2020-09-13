#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");
const { clean: cleanSetup } = require("./clean");
const { repl: aiRepl } = require("./repl");
const { js: aiJs } = require("./js");
const { critic: aiCritic } = require("./critic");

const DEFAULT_PROGRAM_CONFIG = {
  setup: quicklispSetup,
  clean: cleanSetup,
  repl: aiRepl,
  js: aiJs,
  critic: aiCritic,
};

const createProgram = (programConfig = DEFAULT_PROGRAM_CONFIG) => {
  const program = new Command();
  const { setup, clean, repl, js, critic } = programConfig;
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
  program
    .command("js")
    .description("Run a server with the CS 325 QUnit tests")
    .action(js);
  program
    .command("critic <file>")
    .description("Run the code critic over the provided file.")
    .option("-w, --watch", "Watch for changes.", false)
    .action(critic);
  return program;
};

module.exports = createProgram;
