import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(signIn(data.email, data.password));
      history.push("/");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container ">
      <h1 className="title">Welcome to LKeeper</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              {...register("email", { required: true })}
              defaultValue="balbimarcus@gmail.com"
              className="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
            {errors.email && <span>This field is required</span>}
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              {...register("password", { required: true })}
              defaultValue="abc123"
              className="input"
              type="password"
              placeholder="********"
            />
            {errors.password && <span>This field is required</span>}
          </div>
        </div>

        <button
          type="submit"
          className={`button is-primary ${loading && "is-loading"}`}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
