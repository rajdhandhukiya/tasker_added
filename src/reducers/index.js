import { combineReducers } from "redux";
import postReducer from "../reducers/reducers";
import usersReducer from "../reducers/rootReducers";

export default combineReducers({
  posts: postReducer,
  users: usersReducer,
});
