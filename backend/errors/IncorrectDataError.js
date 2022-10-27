const { MestoError, INCORRECT_DATA } = require('./errors');

class IncorrectDataError extends MestoError {
  constructor(message) {
    const errMsg = `некорректные данные: ${message}`;
    super(errMsg);
    this.statusCode = INCORRECT_DATA;
  }
}

module.exports = IncorrectDataError;
