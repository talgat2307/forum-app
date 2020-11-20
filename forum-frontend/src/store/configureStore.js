import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import thunkMiddleware from 'redux-thunk';
import usersReducer from './reducers/usersReducer';
import postsReducer from './reducers/postsReducer';
import commentsReducer from './reducers/commentsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  router: connectRouter(history),
});

const persistedState = loadFromLocalStorage();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware)));

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      userInfo: store.getState().users.userInfo,
    },
  });
});

export default store;