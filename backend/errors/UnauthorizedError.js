const { UNAUTHORIZED, MestoError } = require('./errors');

class UnauthorizedError extends MestoError {
  constructor(message) {
    const errMsg = `не авторизован: ${message}`;
    super(errMsg);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
