const createProgram = require("./createProgram");

describe("Calling cli setup", () => {
  test("Runs the provided setup function", async () => {
    const mockSetup = jest.fn();
    const program = createProgram({
      setup: mockSetup,
    });
    await program.parseAsync(["", "", "setup"]);
    expect(mockSetup).toHaveBeenCalled();
  });
  test("Runs the provided clean function", async () => {
    const mockSetup = jest.fn();
    const mockClean = jest.fn();
    const program = createProgram({
      setup: mockSetup,
      clean: mockClean,
    });
    await program.parseAsync(["", "", "clean"]);
    expect(mockClean).toHaveBeenCalled();
  });
});
