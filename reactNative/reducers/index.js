import { combineReducers } from 'redux';

import {
  REQUEST_SONGS,
  RECEIVE_SONGS,
  INVALIDATE_SONGS,
  UPDATE_QUERY,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
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
  songs: [],
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
        songs: action.songs,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const songsByQuery = (state = {}, action) => {
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

const playlist = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_PLAYLIST: {
      const newState = state.filter(song => song.uri !== action.song.uri);
      return [...newState, action.song];
    }
    case REMOVE_FROM_PLAYLIST:
      return state.filter(song => song.uri !== action.song.uri);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  songsByQuery,
  currentQuery,
  playlist,
});

export default rootReducer;
