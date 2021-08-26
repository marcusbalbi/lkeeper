import { GET_LINKS } from "../types";

const INITIAL_STATE = {
  links: [],
};
const linksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LINKS: {
      return { ...state, links: action.payload };
    }
    default:
      return state;
  }
};

export default linksReducer;
