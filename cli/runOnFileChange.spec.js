const chokidar = require("chokidar");
const { runOnFileChange } = require("./runOnFileChange");

describe("runOnFileChange", () => {
  test("Uses chokidar to run updates when the file changes", () => {
    const onChangeFunc = jest.fn();
    runOnFileChange("test", onChangeFunc);
    expect(chokidar.watch).toHaveBeenCalledWith("test", { persistent: true });
    expect(chokidar.watch().on).toHaveBeenCalledWith("add", onChangeFunc);
    expect(chokidar.watch().on).toHaveBeenCalledWith("change", onChangeFunc);
  });
});
