export const REQUEST_SONGS = 'REQUEST_SONGS';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const INVALIDATE_SONGS = 'INVALIDATE_SONGS';

export const requestSongs = query => ({
  type: REQUEST_SONGS,
  query,
});

export const receiveSongs = (query, json) => ({
  type: RECEIVE_SONGS,
  query,
  songs: json,  // data.children.map(child => child.data) FORMAT RESPONSE HERE
  receivedAt: Date.now(),
});

const fetchSongs = query => (dispatch) => {
  dispatch(requestSongs(query));

  return fetch(`http://localhost:4242/tracks?trackName=${query}`)
    .then(response => response.json())
    .then(json => dispatch(receiveSongs(query, json)));
};

const shouldFetchSongs = (state, query) => {
  const songs = state.postsByQuery[query];
  if (!songs) { return true; }
  if (songs.isFetching) { return false; }

  return songs.didInvalidate;
};

export const fetchSongsIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchSongs(getState(), query)) {
    return dispatch(fetchSongs(query));
  }
  return undefined;
};
