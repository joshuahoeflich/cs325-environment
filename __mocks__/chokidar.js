const mockWatch = {
  on: jest.fn(),
};

module.exports = {
  watch: jest.fn().mockImplementation(() => mockWatch),
};
