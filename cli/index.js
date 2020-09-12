const { Command } = require("commander");

const createProgram = (programConfig) => {
  const program = new Command();
  const { setup } = programConfig;
  program.command("setup").action(setup);
  return program;
};

module.exports = createProgram;

process.on("unhandledRejection", (fatalError) => {
  throw fatalError;
});

const PROGRAM_CONFIG = {
  setup: async () => {},
};

const main = async () => {
  const program = createProgram(PROGRAM_CONFIG);
  await program.parseAsync(process.argv);
};

if (require.main === module) {
  main();
}
