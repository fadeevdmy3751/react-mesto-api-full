import React from "react";
import {useState} from "react";

export default function Login({ onSubmit }) {

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
      <h2 className="login__title">Вход</h2>
      <form name="form_login" className="login__form" onSubmit={(e ) => {onSubmit(e, email, pwd, setEmail, setPwd)}}>
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
            <span className="login__error" id="email-error"> </span>
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
            <span className="login__error" id="password-error"> </span>
          </label>
        </fieldset>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  )
}