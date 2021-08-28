import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../store/actions";
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" href="#">
          <h1 className="title has-text-white">LKeeper</h1>
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/links">
          Links
        </Link>
        <Link className="navbar-item" to="/users">
          User
        </Link>
      </div>
      <div className="navbar-end">
        <span className="navbar-item">
          <div className="mr-2">
            <button onClick={() => {}} className="button is-dark">
              <span className="icon is-small">
                <i className="fas fa-eye"></i>
              </span>
            </button>
          </div>
          <button
            onClick={() => {
              dispatch(signOut());
              history.push("/login");
            }}
            className="button is-danger"
          >
            Logout
          </button>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
