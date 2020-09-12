const createProgram = require(".");

describe("Calling cli setup", () => {
  test("Runs the provided setup function", async () => {
    const mockSetup = jest.fn();
    const program = createProgram({
      setup: mockSetup,
    });
    await program.parseAsync(["", "", "setup"]);
    expect(mockSetup).toHaveBeenCalled();
  });
});
