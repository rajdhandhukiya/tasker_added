import _ from "lodash";
import { useDispatch } from "react-redux";
import jsonPlaceholder from "../api/jsonplaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

//Action Creator returning a function using Redux-Thunk
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  console.log("apiresponce==>", response.data);

  dispatch({ type: "FETCH_POSTS", payload: response.data });
  return response.data;
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
