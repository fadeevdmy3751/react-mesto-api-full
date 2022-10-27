const { DEFAULT_ERROR, MestoError } = require('./errors');

class DefaultError extends MestoError {
  constructor(message) {
    const errMsg = `ошибка сервера: ${message}`;
    super(errMsg);
    this.statusCode = DEFAULT_ERROR;
  }
}

module.exports = DefaultError;
