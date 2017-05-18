import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

import { fetchSongsIfNeeded, updateQuery } from '../actions';

import styles from './css/styles.css';

// Import components
import SongListEntry from './SongListEntry';
import Loading from './Loading';

let messageInterval;

// MAIN COMPONENT

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this._onChangeText = this._onChangeText.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._addSong = this._addSong.bind(this);
    this._removeSong = this._removeSong.bind(this);
  }

  _addSong(song, message) {
    clearInterval(messageInterval);
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` }, () => {
      setTimeout(() => this.setState({ message: '' }), 3500);
    });
  }

  _removeSong(song, message) {
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` }, () => {
      setTimeout(() => this.setState({ message: '' }), 3500);
    });
  }

  _onChangeText(name) {
    const { dispatch } = this.props;
    dispatch(updateQuery(name));
  }

  _onSearch() {
    const { dispatch, currentQuery } = this.props;
    dispatch(fetchSongsIfNeeded(currentQuery));
  }

  render() {
    const { message } = this.state;
    const { isFetching, songs } = this.props;
    const isEmpty = songs.length === 0;

    return (
      <View style={styles.container}>
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
            onChangeText={this._onChangeText}
          />
          <Button
            title="Search"
            style={styles.button}
            onPress={this._onSearch}
            raised
            backgrounColor="#f00"
            theme="light"
            textColor="white"
          />
        </View>

        <ScrollView style={{ borderWidth: 1, borderColor: 'gray', flex: 3 }}>
          {isEmpty                                                //eslint-disable-line
            ? (isFetching ? <Loading /> : <Text>Empty.</Text>)
            : songs.map(song => (
              <SongListEntry
                key={song.uri}
                song={song}
                _addSong={this._addSong}
                _removeSong={this._removeSong}
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
  }
}

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

export default connect(mapStateToProps)(App);
