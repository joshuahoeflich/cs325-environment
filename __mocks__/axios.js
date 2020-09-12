module.exports = {
  get: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: "(lisp code)" })),
};
