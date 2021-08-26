import { ADD_LINK, GET_LINKS } from "../types";

const INITIAL_STATE = {
  links: [],
};
const linksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LINKS: {
      return { ...state, links: action.payload };
    }
    case ADD_LINK: {
      return { ...state, links: state.links.concat(action.payload) };
    }
    default:
      return state;
  }
};

export default linksReducer;
