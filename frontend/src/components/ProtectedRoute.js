import React from "react";
import { Route, Redirect} from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

const ProtectedRoute = ({component: Component, ...props}) => {
  const value = React.useContext(AppContext);
  return (
    <Route>
      {
        () => value.loggedIn === true ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;
