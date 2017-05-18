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

  // try {
  //   const response = await fetch(`http://localhost:4242/tracks?trackName=${query}`);
  //   const json = await response.json();
  //   dispatch(receiveSongs(query, json)));
  // } catch (err) {
  //   console.error(err);
  // }
};

const shouldFetchSongs = (state, query) => {
  const songs = state.songsByQuery[query];
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
