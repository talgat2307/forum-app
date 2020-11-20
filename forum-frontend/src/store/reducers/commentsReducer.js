import {
  FETCH_COMMENTS_FAIL,
  FETCH_COMMENTS_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  comments: null,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, comments: action.comments };
    case FETCH_COMMENTS_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default commentsReducer;