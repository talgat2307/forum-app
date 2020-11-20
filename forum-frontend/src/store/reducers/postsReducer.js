import {
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS, SINGLE_POST_FAIL,
  SINGLE_POST_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  posts: null,
  singlePost: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case FETCH_POSTS_FAIL:
      return { ...state, error: action.error };
    case SINGLE_POST_SUCCESS:
      return { ...state, singlePost: action.singlePost };
    case SINGLE_POST_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default postsReducer;