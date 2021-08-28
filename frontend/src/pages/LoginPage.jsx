import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import FormInputText from "../components/FormInputText";
import PageContainer from "../components/PageContainer";
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
    <PageContainer>
      <h1 className="title">Welcome to LKeeper</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <div className="field">
          <label className="label">Email</label>
          <FormInputText
            {...register("email", { required: true })}
            type="email"
            placeholder="e.g. alex@example.com"
            errorMessage={errors.email && "Email is Required!"}
          />
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <FormInputText
              {...register("password", { required: true })}
              type="password"
              placeholder="********"
              errorMessage={errors.password && "Password is Required!"}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`button is-primary ${loading && "is-loading"}`}
        >
          Sign in
        </button>
      </form>
    </PageContainer>
  );
};

export default LoginPage;
