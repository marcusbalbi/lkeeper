import { createAuthRequest } from "../../apis/backend";
import { ADD_LINK, GET_LINKS } from "../types";

export const getLinks = (query) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const request = createAuthRequest(auth.user.token);

    const response = await request.get("/links");

    dispatch({
      type: GET_LINKS,
      payload: response.data,
    });
  };
};

export const addLink = ({ title, link }) => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const request = createAuthRequest(auth.user.token);

      const response = await request.post("/links", {
        title,
        link,
      });

      dispatch({
        type: ADD_LINK,
        payload: response.data,
      });
    } catch (err) {
      console.log("failed to add Link:" + err.message);
    }
  };
};
