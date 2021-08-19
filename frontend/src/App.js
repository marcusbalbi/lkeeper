import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const ProtectedRoute = (props) => {
    if (auth.isLoggedIn) {
      return <Route {...props}>{props.children}</Route>;
    }
    return <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          {auth.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <ProtectedRoute path="/" exact>
          <h1>Bem vindo!</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/teste" exact>
          <h1>Bem vindo ao teste!!</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
