import { createAuthRequest } from "../../apis/backend";
import { GET_LINKS } from "../types";

export const getLinks = (query) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const request = createAuthRequest(auth.user.token);

    const response = await request.get("/links")

    dispatch({
      type: GET_LINKS,
      payload: response.data,
    });
  };
};
