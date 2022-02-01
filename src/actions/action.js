import _ from "lodash";
// import { useDispatch } from "react-redux";
import jsonPlaceholder from "../api/jsonplaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  console.log("apiresponce==>", response.data);

  dispatch({ type: "FETCH_POSTS", payload: response.data });
  return response.data;
};
