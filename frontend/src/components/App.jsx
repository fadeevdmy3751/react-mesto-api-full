import {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from './ImagePopup';
import {avatarApi, cardsApi, profileApi} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {AppContext} from '../contexts/AppContext';
import * as Auth from './Auth';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {CurrentPopupContext} from "../contexts/CurrentPopupContext";
import ProtectedRoute from "./ProtectedRoute";
import {Route, Switch, useHistory, Redirect} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import {BASE_URL} from "./Auth";

function App() {
  const history = useHistory();

  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    cardsApi.likeCard(card, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handleCardDelete = (card) => {
    cardsApi.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const handleCardClick = (cardData) => {
    setselectedCard(cardData)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setselectedCard('');
    setIsRegisterPopupOpen(false);
    if (isRegistrationSuccessful === true) {
      history.push("/")
    }
  }

  const handleClosePopup = (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true)
    profileApi.editProfile(name, about)
      .then(me => {
        setCurrentUser(me)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleUpdateAvatar = ({avatar}) => {
    setIsLoading(true)
    avatarApi.editAvatar(avatar)
      .then(me => {
        setCurrentUser(me)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true)
    cardsApi.addCardOnServer(card.name, card.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // получаем данные карточек
  useEffect(() => {
    // если пустой массив вернется - ну просто будем спрашивать пока не появятся карточки
    if (!cards.length) {
      // console.log('cards=[]');
      cardsApi.getInitialCards()
        .then(initCards => {
          setCards(initCards);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    // console.log('if cards', cards)
  }, [history.location])

  // определение залогинен или нет сразу
  useEffect(() => {
    profileApi.getMe()
      .then(me => {
        setCurrentUser(me)
        setEmail(me.email)
        setLoggedIn(true)
        // console.log('auth check success! loggedin', loggedIn);
        history.push('/');
      })
      .catch((err) => {
        console.log('not logged in');
      })
  }, [])

  // инициализация данных профиля
  useEffect(() => {
    if (loggedIn) {
      profileApi.getMe()
        .then(me => setCurrentUser(me))
        .catch((err) => {
          console.log(err);
        })
    } else {
      setCurrentUser({})
      setEmail('')
    }
  }, [loggedIn])

  // esc listener
  useEffect(() => {
    function _handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || Boolean(selectedCard)) {
      document.addEventListener('keyup', _handleEscClose);
    }
    return () => {
      document.removeEventListener('keyup', _handleEscClose);
    }
  }, [isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
    isRegisterPopupOpen])

  const handleRegisterSubmit = (e, email, password) => {
    e.preventDefault();
    Auth.register(email, password)
      .then((res) => {
        if (res) {
          console.log('Успешная регистрация!');
          setIsRegisterPopupOpen(true);
          setIsRegistrationSuccessful(true);
        } else {
          console.log(res);
          console.log('При регистрации что-то пошло не так!');
          setIsRegistrationSuccessful(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsRegisterPopupOpen(true);
      });
  }

  const handleLoginSubmit = (e, email, password, setEmail, setPassword) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    Auth.authorize(email, password)
      .then((data) => {
        if (!data) {
          console.log("При авторизации что-то пошло не так!")
        } else {
          setEmail('');
          setPassword('');
          setLoggedIn(true);
          // console.log('authorise: data', data, 'logedin', loggedIn)
          history.push('/');
        }
      })
      .catch(err => console.log(err)); // запускается, если пользователь не найден
  }

  const handleSignOut = () => {
    setEmail('');
    setLoggedIn(false);
    fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include', // так куки прилетели значит достаточно тут а не в заголовке
    })
      .then(res => res.json())
      .then((data) => {
        console.log('logout:', data)
      })
    history.push('/sign-in');
  }

  return (
    <AppContext.Provider value={{loggedIn: loggedIn}}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}/>
          <Route path="/sign-in">
            <Login onSubmit={handleLoginSubmit}/>
          </Route>
          <Route path="/sign-up">
            <Register onSubmit={handleRegisterSubmit}/>
          </Route>
          <Route>
            {loggedIn ? (
              <Redirect exact to="/"/>
            ) : (
              <Redirect to="/sign-in"/>
            )}
          </Route>
        </Switch>
        <Footer/>
        <CurrentPopupContext.Provider value={{isLoading: isLoading}}>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                           onClose={handleClosePopup}
                           onUpdateAvatar={handleUpdateAvatar}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
                            onClose={handleClosePopup}
                            onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
                         onClose={handleClosePopup}
                         onAddPlace={handleAddPlaceSubmit}/>
          <ImagePopup cardData={selectedCard} onClose={handleClosePopup}/>
          <InfoTooltip onClose={handleClosePopup}
                       status={{isOpen: isRegisterPopupOpen, successful: isRegistrationSuccessful}}/>
        </CurrentPopupContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  )
}

export default App;
