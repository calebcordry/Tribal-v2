export const REQUEST_SONGS = 'REQUEST_SONGS';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const INVALIDATE_SONGS = 'INVALIDATE_SONGS';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
export const REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
export const ADD_USER_PLAYLIST = 'ADD_USER_PLAYLIST';
export const REMOVE_USER_PLAYLIST = 'REMOVE_USER_PLAYLIST';
export const UPDATE_QUERY = 'UPDATE_QUERY';

export const updateQuery = query => ({
  type: UPDATE_QUERY,
  query,
});

export const invalidateSongs = query => ({
  type: INVALIDATE_SONGS,
  query,
});

export const requestSongs = query => ({
  type: REQUEST_SONGS,
  query,
});

export const receiveSongs = (query, songs) => ({
  type: RECEIVE_SONGS,
  query,
  songs,
  receivedAt: Date.now(),
});

export const addToPlaylist = song => ({
  type: ADD_TO_PLAYLIST,
  song,
});

export const removeFromPlaylist = song => ({
  type: REMOVE_FROM_PLAYLIST,
  song,
});

const fetchSongs = query => (dispatch) => {
  dispatch(requestSongs(query));
  return fetch(`https://tribal-global-mobile.herokuapp.com/tracks?trackName=${query}`)
  .then(response => response.json())
  .then(songs => dispatch(receiveSongs(query, songs)));
};

const shouldFetchSongs = (state, query) => {
  const songs = state.songsByQuery[query];
  if (!songs) { return true; }
  if (songs.isFetching || query === state.currentQuery) {
    return false;
  }

  return songs.didInvalidate;
};

export const fetchSongsIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchSongs(getState(), query)) {
    return dispatch(fetchSongs(query));
  }
  return undefined;
};
