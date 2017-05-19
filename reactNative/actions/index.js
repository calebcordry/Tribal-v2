export const REQUEST_SONGS = 'REQUEST_SONGS';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const INVALIDATE_SONGS = 'INVALIDATE_SONGS';

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
  songs,  // data.children.map(child => child.data) FORMAT RESPONSE HERE
  receivedAt: Date.now(),
});

const fetchSongs = query => (dispatch) => {
  dispatch(requestSongs(query));
  return fetch(`http://tribal-global-mobile.herokuapp.com/tracks?trackName=${query}`)
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
