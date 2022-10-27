import {Link} from 'react-router-dom';
import {useState} from "react";

export default function Register({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePwdChange(e) {
    setPwd(e.target.value);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form name="form_register" className="login__form" onSubmit={(e ) => {onSubmit(e, email, pwd)}}>
        <fieldset className="login__fieldset">
          <label className="login__label">
            <input
              className="login__input"
              type="email"
              placeholder="Email"
              name="email"
              minLength="2"
              maxLength="40"
              value={email || ''}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label className="login__label">
            <input
              className="login__input"
              type="password"
              placeholder="Пароль"
              name="password"
              minLength="2"
              maxLength="40"
              value={pwd || ''}
              onChange={handlePwdChange}
              required
            />
          </label>
        </fieldset>
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </div>
  )
}
