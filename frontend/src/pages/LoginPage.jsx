import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import FormInputText from "../components/FormInputText";
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
  console.log(errors);
  return (
    <div className="container ">
      <h1 className="title">Welcome to LKeeper</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <FormInputText
          labelText="Email"
          isInvalid={errors.email}
          errorMessage={errors.email && "Email is Required!"}
          inputProps={{
            ...register("email", { required: true }),
            type: "email",
            placeholder: "e.g. alex@example.com",
          }}
        />

        <FormInputText
          inputProps={{
            ...register("password", { required: true }),
            type: "password",
            placeholder: "********",
          }}
          labelText="Password"
          isInvalid={errors.password}
          errorMessage={errors.password && "Password is Required!"}
        />

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
