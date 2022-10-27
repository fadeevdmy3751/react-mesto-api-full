const { FORBIDDEN, MestoError } = require('./errors');

class ForbiddenError extends MestoError {
  constructor(message) {
    const errMsg = `доступ запрещен: ${message}`;
    super(errMsg);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
