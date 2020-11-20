import { push } from 'connected-react-router';
import {
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS, SINGLE_POST_FAIL, SINGLE_POST_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchPostsSuccess = (posts) => {
  return { type: FETCH_POSTS_SUCCESS, posts };
};

const fetchPostsFail = (error) => {
  return { type: FETCH_POSTS_FAIL, error };
};

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/posts');
      dispatch(fetchPostsSuccess(response.data));
    } catch (e) {
      dispatch(fetchPostsFail(e));
    }
  };
};

const singlePostSuccess = (singlePost) => {
  return { type: SINGLE_POST_SUCCESS, singlePost };
};

const singlePostFail = (error) => {
  return { type: SINGLE_POST_FAIL, error };
};

export const fetchSinglePost = (id) => {
  return async dispatch => {
    try {
      const response = await axiosApi(`/posts/${id}`);
      dispatch(singlePostSuccess(response.data));
    } catch (e) {
      dispatch(singlePostFail(e));
    }
  };
};

const createPostSuccess = () => {
  return { type: CREATE_POST_SUCCESS };
};

const createPostFail = (error) => {
  return { type: CREATE_POST_FAIL, error };
};

export const createPost = (post) => {
  return async (dispatch, getState) => {
    const token = getState().users.userInfo.user.token;
    const headers = { 'Authorization': token };
    try {
      await axiosApi.post('/posts', post, { headers });
      dispatch(createPostSuccess());
      dispatch(push('/'));
    } catch (e) {
      dispatch(createPostFail(e));
    }
  };
};