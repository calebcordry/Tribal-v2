import { combineReducers } from 'redux';

import {
  REQUEST_SONGS, RECEIVE_SONGS, INVALIDATE_SONGS, UPDATE_QUERY,
} from '../actions';

const currentQuery = (state = '', action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return action.query;
    default:
      return state;
  }
};

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
        items: action.songs,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const songsByQuery = (state = { }, action) => {
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
  songsByQuery,
  currentQuery,
});

export default rootReducer;
