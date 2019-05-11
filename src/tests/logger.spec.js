import { log, logger, LEVELS } from '../logger';

describe('Logging', () => {
  const timestamp = 11;

  beforeAll(() => {
    Date.now = jest.fn(() => timestamp);
  });

  afterAll(() => {
    jest.mockReset();
    jest.mockRestore();
  });

  test('should not do anything on debug calls when not running in debug mode', () => {
    const loggerHandler = jest.fn();
    logger.setUp({ loggerHandler, level: LEVELS.INFO });

    log.debug('This is a test of level debug');

    expect(loggerHandler).not.toHaveBeenCalled();
  });

  test('should log on debug calls when running in debug mode', () => {
    const loggerHandler = jest.fn();
    logger.setUp({ loggerHandler, level: LEVELS.DEBUG });

    log.debug('This is a test of level debug');

    expect(loggerHandler).toHaveBeenCalledWith({ message: 'This is a test of level debug', timestamp, level: 'DEBUG' });
  });

  const table = [['info', 'INFO'], ['warn', 'WARN'], ['error', 'ERROR']];
  test.each(table)('should log on %s level', (level, levelTag) => {
    const loggerHandler = jest.fn();
    logger.setUp({ loggerHandler });

    log[level](`This is a test of level ${level}`);

    const expectedLog = {
      message: `This is a test of level ${level}`,
      timestamp,
      level: levelTag,
    };
    expect(loggerHandler).toHaveBeenCalledWith(expectedLog);
  });
});
