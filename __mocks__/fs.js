const fs = jest.createMockFromModule("fs");

fs.promises = {
  access: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  unlink: jest.fn(),
};

module.exports = fs;
