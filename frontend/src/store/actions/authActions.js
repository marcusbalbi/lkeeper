import backend from "../../apis/backend";
import { SIGN_IN, SIGN_OUT } from "../types";
export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await backend.post("/login/", {
      email,
      password,
    });

    dispatch({
      type: SIGN_IN,
      payload: response.data,
    });
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
