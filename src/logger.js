let handler;
let logLevel;

export const LEVELS = {
  DEBUG: { levelTag: 'DEBUG', weight: 0 },
  INFO: { levelTag: 'INFO', weight: 10 },
  WARN: { levelTag: 'WARN', weight: 20 },
  ERROR: { levelTag: 'ERROR', weight: 30 },
};
const getLevelTag = level => LEVELS[level].levelTag;

const defaultHandler = console.log; // eslint-disable-line no-console
const setUp = ({ loggerHandler = defaultHandler, level = LEVELS.INFO } = {}) => {
  handler = loggerHandler;
  logLevel = level;
};

export const logger = {
  setUp,
};

const sanitize = ({ level, message }) => ({
  message,
  level,
  timestamp: Date.now(),
});

const info = message => handler(sanitize({ level: getLevelTag('INFO'), message }));
const error = message => handler(sanitize({ level: getLevelTag('ERROR'), message }));
const warn = message => handler(sanitize({ level: getLevelTag('WARN'), message }));

const debug = (message) => {
  if (logLevel.weight <= LEVELS.DEBUG.weight) {
    handler(sanitize({ level: getLevelTag('DEBUG'), message }));
  }
};

export const log = {
  info,
  debug,
  error,
  warn,
};
