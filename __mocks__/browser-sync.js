const browserSyncInit = jest.fn();

module.exports = { browserSyncInit, create: () => ({ init: browserSyncInit }) };
