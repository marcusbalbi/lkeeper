import { ADD_LINK, GET_LINKS, SIGN_OUT } from "../types";

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
    case SIGN_OUT: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};

export default linksReducer;
