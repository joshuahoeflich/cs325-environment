function SimpleGit() {}

SimpleGit.prototype.clone = jest.fn().mockResolvedValue(true);

module.exports = SimpleGit;
