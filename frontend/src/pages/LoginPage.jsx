import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  return (
    <div className="container ">
      <h1 className="title">Welcome to LKeeper</h1>
      <form onSubmit={(e) => e.preventDefault()} className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="********" />
          </div>
        </div>

        <button
          onClick={() => {
            console.log("aqui vo o!");
            history.push("/");
          }}
          className={`button is-primary ${loading && "is-loading"}`}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
