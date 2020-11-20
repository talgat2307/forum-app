import { push } from 'connected-react-router';
import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  FETCH_COMMENTS_FAIL,
  FETCH_COMMENTS_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchCommentsSuccess = (comments) => {
  return { type: FETCH_COMMENTS_SUCCESS, comments };
};

const fetchCommentsFail = (error) => {
  return { type: FETCH_COMMENTS_FAIL, error };
};

export const fetchComments = (id) => {
  return async (dispatch, getState) => {

    const token = getState().users.userInfo.user.token;
    const headers = { 'Authorization': token };

    try {
      const response = await axiosApi('/comments', { headers });
      dispatch(fetchCommentsSuccess(response.data));
    } catch (e) {
      dispatch(fetchCommentsFail(e));
    }
  };
};

const createCommentSuccess = () => {
  return { type: CREATE_COMMENT_SUCCESS };
};

const createCommentFail = (error) => {
  return { type: CREATE_COMMENT_FAIL, error };
};

export const createComment = (comment) => {
  return async (dispatch, getState) => {

    const token = getState().users.userInfo.user.token;
    const headers = { 'Authorization': token };

    try {
      await axiosApi.post('/comments', comment, { headers });
      dispatch(createCommentSuccess());
    } catch (e) {
      dispatch(createCommentFail(e));
    }
  };
};