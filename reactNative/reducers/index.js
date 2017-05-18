import { combineReducers } from 'redux';

import {
  REQUEST_SONGS,
  RECEIVE_SONGS,
  INVALIDATE_SONGS,
} from '../actions';

const songs = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_SONGS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_SONGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_SONGS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const postsByQuery = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SONGS:
    case RECEIVE_SONGS:
    case REQUEST_SONGS:
      return {
        ...state,
        [action.query]: songs(state[action.query], action),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsByQuery,
});

export default rootReducer;
