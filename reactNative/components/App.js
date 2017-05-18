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

import { selectSongs, fetchPostsIfNeeded, invalidateSongs } from '../actions';
import styles from './css/styles.css';

// Import components
import SongListEntry from './SongListEntry';
import Loading from './Loading';

let messageInterval;

// MAIN COMPONENT

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      songs: [],
      message: '',
      loading: false,
    };

    this._onPressButton = this._onPressButton.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._addSong = this._addSong.bind(this);
    this._removeSong = this._removeSong.bind(this);
  }

  _addSong(song, message) {
    clearInterval(messageInterval);
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` }, () => {
      messageInterval = setInterval(() => this.setState({ message: '' }), 3500);
    });
  }

  _removeSong(song, message) {
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` }, () => {
      messageInterval = setInterval(() => this.setState({ message: '' }), 3500);
    });
  }

  _onPressButton(name) {
    console.log('You pressed a button');
    const text = `Selected ${name}`;
    this.setState({ text });
  }

  _onSearch() {
    this.setState({ songs: [], loading: true });

    return fetch(`https://tribal-global-mobile.herokuapp.com/tracks?trackName=${this.state.text}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((songs) => {
        console.log('fetch: ', songs);
        this.setState({ songs, loading: false });
      })
      .catch(err => console.warn('fetch error: ', err));
  }

  render() {
    console.log({ props: this.props });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../public/images/logo.png')} style={{ width: '100%', height: '100%' }} />
        </View>

        <View style={styles.textInput} >
          <TextInput
            style={styles.inputBox}
            placeholder="Search songs or artist"
            onChangeText={text => this.setState({ text })}
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

          {this.state.loading && <Loading /> }

          {!this.state.loading && this.state.songs.map(song => (
            <SongListEntry
              key={song.uri}
              song={song}
              _addSong={this._addSong}
              _removeSong={this._removeSong}
            />
          ))}
        </ScrollView>

        {this.state.message !== '' &&
          <View style={styles.messageBox}>
            <Text style={styles.message}>{this.state.message}</Text>
          </View>
        }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { songsByQuery, currentQuery } = state;
  debugger;
  const {
    isFetching,
    lastUpdated,
    items: songs,
  } = songsByQuery[currentQuery] || {
    isFetching: true,
    items: [],
  };

  return {
    currentQuery,
    songs,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps)(App);
