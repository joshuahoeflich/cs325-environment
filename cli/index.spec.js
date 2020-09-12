const sum = require(".");

describe("Adding two numbers", () => {
  test("Performs summation correctly", () => {
    expect(sum(7, 3)).toEqual(10);
  });
});
