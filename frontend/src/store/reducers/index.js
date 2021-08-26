import { combineReducers } from "redux";
import authReducer from "./authReducer";
import linksReducer from "./linksReducer";

export default combineReducers({
  auth: authReducer,
  links: linksReducer,
});
