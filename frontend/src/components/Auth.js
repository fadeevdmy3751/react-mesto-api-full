export const BASE_URL = 'https://api.fdmitrij.nomoredomains.icu';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({"email": email, "password": password})
  })
    .then((response) => checkResponse(response, 'Ошибка при обращении по API регистрации!'))
    .then((res) => {
      return res;
    })
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({"email": identifier, "password": password})
  })
    .then((response => checkResponse(response, 'Ошибка при обращении по API авторизации!')))
    .then(data => data)
};

// чтобы проверить токен и получить данные пользователя
export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(res => checkResponse(res, 'Ошибка при обращении по API получения информации об аккаунте!'))
    .then(data => data)
}

// функция проверки ответа от сервера
function checkResponse(res, errorMes) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`${errorMes + res.status}`);
}