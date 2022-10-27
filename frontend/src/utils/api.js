import {BASE_URL} from '../components/Auth'

/**
 * Абстрактный класс по работе с Api, от которого наследуются классы для соответствующих элементов страницы
 */
class Api {
  /**
   * Конструктор класса
   * @param headers - хедеры, передаваемые в запросах (токен авторизации и Content-Type)
   */
  constructor(headers) {
    this._headers = headers;
  }

  /**
   * Метод выполнения запроса по url-ресурсу
   * @param fetchResource - нужный урл на REST-сервере;
   * @param requestMethod - метод запроса (GET, POST и т.д.) в формате строки;
   * @param errorMes - сообщение, выводимое при ошибке, вернувшейся с сервера;
   * @param requestBody - тело запроса.
   * @returns возвращается или json, или Promise.reject
   */
  _makeFetch(fetchResource, requestMethod, errorMes, requestBody = undefined) {
    const fetchOptions = {
      method: requestMethod,
      headers: this._headers,
        credentials: 'include'
    };

    // проверка на наличие body и включение в тело запроса
    if(requestBody !== undefined) {
      fetchOptions.body = JSON.stringify(requestBody);
    }

    return fetch(fetchResource, fetchOptions)
        .then(res => this._checkResponse(res, errorMes))
  }

  /**
   * Метод проверки ответа от сервера на наличие ошибки
   * @param res - ответ сервера;
   * @param errorMes - сообщение, выводимое при ошибке, вернувшейся с сервера.
   * @returns возвращается или json, или Promise.reject
   */
  _checkResponse(res, errorMes) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`${errorMes + res.status}`);
  }
}

/**
 * Класс по работе с Api аватарки пользователя
 */
export class AvatarApi extends Api {
  /**
   * Конструктор класса по работе с Api аватарки пользователя
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._avatarUrl = baseUrl + '/users/me/avatar';
  }

  /**
   * Метод редактирования аватара
   * @param url - урл нового аватара.
   * @returns возвращается или json, или Promise.reject
   */
  editAvatar(url) {
    return this._makeFetch(this._avatarUrl,
        'PATCH', 'Ошибка editAvatar: ', {avatar: url});
  }
}

/**
 * Класс по работе с Api профиля пользователя
 */
export class ProfileApi extends Api {
  /**
   * Конструктор класса по работе с Api профиля пользователя
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._profileUrl = baseUrl + '/users/me';
  }

  /**
   * Метод получения данных собственного профиля
   * @returns возвращается или json, или Promise.reject
   */
  getMe() {
    return this._makeFetch(this._profileUrl, 'GET',
        'Ошибка getMe: ');
  }

  /**
   * Метод редактирования собственного профиля
   * @param name - имя пользователя
   * @param about - описание пользователя
   * @returns возвращается или json, или Promise.reject
   */
  editProfile(name, about) {
    return this._makeFetch(this._profileUrl, 'PATCH',
        'Ошибка editProfile: ', {name: name, about: about});
  }

}

/**
 * Класс по работе с Api карточек
 */
export class CardsApi extends Api {
  /**
   * Конструктор класса по работе с Api карточек
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._cardsBaseUrl = baseUrl + '/cards';
    // this._cardsLikeUrl = baseUrl + '/cards/likes/';
  }

  /**
   * Метод получения текущих карточек с сервера
   * @returns возвращается или json, или Promise.reject
   */
  getInitialCards() {
    return this._makeFetch(this._cardsBaseUrl, 'GET',
        'Ошибка getInitialCards: ');
  }

  /**
   * Метод добавления новой карточки на сервер
   * @param name - имя новой карточки;
   * @param link - ссылка на картинку для новой карточки.
   * @returns возвращается или json, или Promise.reject
   */
  addCardOnServer(name, link) {
    return this._makeFetch(this._cardsBaseUrl, 'POST',
        'Ошибка addCardOnServer: ', {name: name, link: link});
  }

  /**
   * Метод удаления выбранной (определяется по event) карточки
   * @param card - карточка (html)
   * @returns возвращается или json, или Promise.reject
   */
  deleteCard(card) {
    console.log(card)
    // const card = event.target.closest('.card');
    return this._makeFetch(this._cardsBaseUrl +'/' + card._id, 'DELETE',
        'Ошибка deleteCard: ');
  }

  /**
   * Метод присвоения/удаления лайка карточке
   * @param card - html-элемент карточки
   * @param isLiked - снять или поставить лайк
   * @returns возвращается или json, или Promise.reject
   */
  likeCard(card, isLiked) {
    // инициализация параметров
    let requestMethod;
    let errorMes;

    // заполнение параметров значениями в зависимости от требуемого действия с карточкой
    if (isLiked) { //удалить лайк
      requestMethod = 'DELETE';
      errorMes = 'Ошибка delete like: ';
    } else {  // поставить лайк
      requestMethod = 'PUT';
      errorMes = 'Ошибка put like: ';
    }

    return this._makeFetch(this._cardsBaseUrl +'/'+ card._id + '/likes', requestMethod, errorMes);
  }
}


const apiConfig = {
    baseUrl: BASE_URL,
  headers: {
    // authorization: TOKEN,
    credentials: 'include',
    'Content-Type': 'application/json'
  }
}

const cardsApi = new CardsApi(apiConfig);
const profileApi = new ProfileApi(apiConfig);
const avatarApi = new AvatarApi(apiConfig);

export { cardsApi, profileApi, avatarApi }