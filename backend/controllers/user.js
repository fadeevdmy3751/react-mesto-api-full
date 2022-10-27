require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const {
  UnauthorizedError, IncorrectDataError, DefaultError, NotFoundError, ConflictError,
} = require('../errors/errors');

function getUsers(req, res, next) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => next(new DefaultError(`ошибка получения пользователя: ${err.message}`)));
}

function getUser(req, res, next) {
  userModel.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) res.send(user);
      else next(new NotFoundError('пользователь'));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('ID пользователя'));
      else next(new DefaultError(`ошибка получения пользователя: ${err.message}`));
    });
}

function getMe(req, res, next) {
  userModel.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) res.send(user);
      else next(new NotFoundError('пользователь'));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('ID пользователя'));
      else next(new DefaultError(`ошибка получения пользователя: ${err.message}`));
    });
}

function updateProfile(req, res, next) {
  const { name = null, about = null } = req.body; // для валидации обнуляем
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('профиль'));
      else next(new DefaultError(`обновление профиля: ${err.message}`));
    });
}

function updateAvatar(req, res, next) {
  const { avatar = null } = req.body; // для валидации обнуляем
  // eslint-disable-next-line max-len
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('аватар'));
      else next(new DefaultError(`обновление аватара: ${err.message}`));
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      const toSend = { ...newUser.toJSON() };
      delete toSend.password; // todo check
      res.send(toSend);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('почта/пароль'));
      else if (err.code === 11000) next(new ConflictError('пользователь с такой почтой уже существует'));
      else next(new DefaultError(`ошибка создания пользователя: ${err.message}`));
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      // вернём токен
      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true, // не то похоже или только для https
        sameSite: 'none',
      })
        .send({
          message: 'успешная авторизация',
        });
    })
    .catch((err) => {
      // ошибка аутентификации
      next(new UnauthorizedError(err.message));
    });
}

function logout(req, res) {
  // Set token to none and expire after 5 seconds
  res.cookie('jwt', 'none', {
    maxAge: 5,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
    .send({
      message: 'вы разлогинены успешно',
    });
}

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login, getMe, logout,
};
