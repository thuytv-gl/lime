
function log({ type, msg, correlationId, dir }) {
  // remove root directory to simplify log content
  dir = ('' + dir).replace(require.main.path,'');
  console.log(
    `[${new Date().toUTCString()}][${type}][${correlationId}][${dir}]`,
    msg
  );
}

function createLogger(dir) {
  const level = process.env.LOG_LEVEL || 'info';

  return {
    /* istanbul ignore next */
    debug({ msg, correlationId }) {
      if (level === 'debug') {
        log({ type: 'debug', msg, correlationId, dir });
      }
    },
    /* istanbul ignore next */
    info({ msg, correlationId }) {
      if (['debug', 'info'].includes(level)) {
        log({ type: 'info', msg, correlationId, dir });
      }
    },
    /* istanbul ignore next */
    error({ msg, correlationId }) {
      log({ type: 'error', msg: (msg.stack || msg), correlationId, dir });
    }
  }
}

exports.createLogger = createLogger;
