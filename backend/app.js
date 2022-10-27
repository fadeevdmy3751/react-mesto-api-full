const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const fs = require('fs');
const { login, createUser, logout } = require('./controllers/user');
const auth = require('./middlewares/auth');
const ErrorHandler = require('./errors/ErrorHandler');
const { validateNewUser, validateCredentials } = require('./middlewares/celebrations');
const { NotFoundError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

// для разработки
/* eslint-disable no-console */
fs.unlink('./error.log', console.log);
fs.unlink('./request.log', console.log);
/* eslint-enable no-console */

app.use(cors({
  origin: ['http://localhost:3000', 'http://localho.st:3000', 'http://fdmitrij.nomoredomains.icu', 'https://fdmitrij.nomoredomains.icu'],
  credentials: true,
}));
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // парсер кук

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateCredentials, login);
app.post('/signup', validateNewUser, createUser);
// авторизация
app.use(auth);
// роуты
app.post('/logout', logout);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
// ошибки
app.use(errorLogger); // подключаем логгер ошибок
app.use('/', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
}); // todo check
app.use(errors()); // обработчик ошибок celebrate
app.use(ErrorHandler);

app.listen(
  PORT,
  () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    // запрещено линтером, поэтому
    /* eslint-disable no-console */
    console.log(`App listening on port ${PORT}`);
    /* eslint-enable no-console */
  },
);
