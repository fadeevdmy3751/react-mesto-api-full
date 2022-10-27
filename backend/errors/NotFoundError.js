const { NOT_FOUND, MestoError } = require('./errors');

class NotFoundError extends MestoError {
  constructor(message) {
    const errMsg = `объект не найден: ${message}`;
    super(errMsg);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
