import React from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import styles from './css/styles.css';
import Loading from './Loading';
import SongListEntry from './SongListEntry';

const Search = ({
  isFetching, message, songs, _onChangeText, _onSearch, _addSong, _removeSong,
}) => (
  <View style={styles.container}>

    <View style={styles.headerBar} />

    <View style={styles.header}>
      <Image
        source={require('../public/images/logo.png')}
        style={{ width: '100%', height: '100%' }}
      />
    </View>

    <View style={styles.textInput} >
      <TextInput
        style={styles.inputBox}
        placeholder="Search songs or artist"
        onChangeText={_onChangeText}
      />
      <Button
        title="Search"
        style={styles.button}
        onPress={_onSearch}
        raised
        backgrounColor="#f00"
        theme="light"
        textColor="white"
      />
    </View>

    <ScrollView style={{ flex: 3 }}>
      {(songs.length === 0)                                                //eslint-disable-line
        ? (isFetching ? <Loading /> : <Text>Empty.</Text>)
        : songs.map(song => (
          <SongListEntry
            key={song.uri}
            song={song}
            _addSong={_addSong}
            _removeSong={_removeSong}
          />
        ))}
    </ScrollView>

    {message !== '' &&
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
    }
  </View>
);

const mapStateToProps = (state) => {
  const { songsByQuery, currentQuery } = state;
  const {
    isFetching,
    lastUpdated,
    songs,
  } = songsByQuery[currentQuery] || {
    isFetching: false,
    songs: [],
  };

  return {
    currentQuery,
    songs,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps)(Search);
