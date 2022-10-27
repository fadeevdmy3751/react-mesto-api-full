// e slint-disable-next-line max-classes-per-file
const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401; // — передан неверный логин или пароль.
// Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
const FORBIDDEN = 403; // — попытка удалить чужую карточку;
const CONFLICT = 409; // при регистрации указан email, который уже существует на сервере
const DEFAULT_ERROR = 500;

class MestoError extends Error {
  constructor(message) {
    super(message);
    this.message = `Mesto error: ${this.message}`;
  }
}

module.exports = {
  MestoError,
  INCORRECT_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
};
