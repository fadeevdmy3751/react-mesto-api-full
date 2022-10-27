const { CONFLICT, MestoError } = require('./errors');

class ConflictError extends MestoError {
  constructor(message) {
    const errMsg = `конфликт: ${message}`;
    super(errMsg);
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictError;
