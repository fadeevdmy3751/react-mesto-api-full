import logo from "../images/logo.svg";
import {Link, Route, Switch} from "react-router-dom";

export default function Header({ email, onSignOut }) {
    return (
        <header className="header">
          <Link to="/"><img alt="Место Россия" className="header__logo" src={logo}/></Link>
            <Switch>
                <Route path="/sign-in">
                    <Link className="header__link" to="/sign-up">Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link className="header__link" to="/sign-in">Войти</Link>
                </Route>
                <Route exact path="/">
                        <div className="header__info">
                            <p className="header__email">{email}</p>
                            <Link className="header__link" onClick={onSignOut} to="/sign-in">Выйти</Link>
                        </div>
                </Route>
            </Switch>
        </header>)
}

