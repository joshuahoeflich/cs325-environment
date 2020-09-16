#!/usr/bin/env node

const { Command } = require("commander");
const { setup: quicklispSetup } = require("./setup");
const { clean: cleanSetup } = require("./clean");
const { repl: aiRepl } = require("./repl");
const { js: aiJs } = require("./js");
const { critic: aiCritic } = require("./critic");
const { unitTest } = require("./unitTest");
const { runLisp } = require("./runLisp");

const DEFAULT_PROGRAM_CONFIG = {
  setup: quicklispSetup,
  clean: cleanSetup,
  repl: aiRepl,
  js: aiJs,
  critic: aiCritic,
  test: unitTest,
  run: runLisp,
};

const createProgram = (programConfig = DEFAULT_PROGRAM_CONFIG) => {
  const program = new Command();
  const { setup, clean, repl, js, critic, test, run } = programConfig;
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
  program
    .command("test <file>")
    .description("Unit test the exercise in the provided file.")
    .option("-w, --watch", "Watch for changes.", false)
    .action(test);
  program
    .command("run <file>")
    .description("Run a bit of Lisp code with the CS325 library.")
    .option("-w, --watch", "Watch for changes.", false)
    .action(run);
  return program;
};

module.exports = createProgram;
