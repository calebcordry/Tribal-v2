import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import styles from './src/css/styles.css';

// Import components
import SongListEntry from './src/SongListEntry';
import Loading from './src/Loading';


let messageInterval;

// MAIN COMPONENT

export default class reactNative extends Component {
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
    /**
     *  NOTE: NEED TO REFACTOR FOR RELATIVE ADDRESS
     */

    this.setState({ songs: [], loading: true });

    return fetch(`http://localhost:4242/tracks?trackName=${this.state.text}`, {
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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./public/images/logo.png')} style={{ width: '100%', height: '100%' }} />
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

          {this.state.loading &&
            <Loading />
          }

          {!this.state.loading && this.state.songs.map((song, index) => (
            <SongListEntry
              key={index}
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

AppRegistry.registerComponent('reactNative', () => reactNative);
