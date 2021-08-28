import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import LinksPage from "./pages/LinksPage";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const ProtectedRoute = (props) => {
    if (auth.isLoggedIn) {
      return <Route {...props}>{props.children}</Route>;
    }
    return <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      {auth.isLoggedIn && <Navbar />}
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <ProtectedRoute path="/" exact>
          <h1>Bem vindo!</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/links" exact>
          <LinksPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact>
          <h1>Bem vindo aos Users!!</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
