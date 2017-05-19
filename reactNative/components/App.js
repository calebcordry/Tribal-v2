import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TabBarIOS,
} from 'react-native';

import { fetchSongsIfNeeded, updateQuery } from '../actions';

import styles from './css/styles.css';

// Import components
import SongListEntry from './SongListEntry';
import Loading from './Loading';

const playListIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEbElEQVR4Xu2dTYoUQRCFX5/EhVcQRDyGiC7cuhQZ8BiK4M9WURBHcK2ge1EvoBtXnkDRpT+EdENNT3WbVZHVVZHx9XYqsiLe+zqyMiubWYlPagVWqauneAFAcggAAACSK5C8fDoAACRXIHn5dAAASK5A8vLpAADgVuCqewQG8Chw7Amu0QH+eBIg1q2Ay0NX8Dp1AHB76BrA5aErGABcxtUKdnnoCgaAWh66xnF56AoGAJdxtYJdHrqCa1XAOPMpAADzab+IOwPAImyYLwkAmE/7RdwZABZhw3xJDAHgoqSj+VLlzgMUuC3pfcn1QwCwPf/nJYNyzewKXJb0siQLAChRKd41ABDPs6oZA0BVOeMNNgkAFyTdjKdFyozvSvpQUvmQZ4CS8bgmmAIAEMyw2ukCQG1Fg40HAMEMq50uANRWNNh4uwC4J+lGsFpId78CdyTd2r5kFwC2jXgJRZtS4IWkU0f4AaApj/cWAwB5vO6tFAAAwDcFvJNkW4x8lq+APeyd30rT3QF6B1i+Fikz7HuIB4BEKABAIrP7SgUAADi1j8MUkAgKOkAis5kCkpsNAABwSgGmgORQAAAAsArIzAAdILP765+FbZ/nYB8gERR0gERmswxMbjYAAAD7ADBwUgGeAZITAQAAwEZQZgZSdYCzkr5kdrun9lQA/JL0WpL9nO0NIPxTIBUA3f9X8EnSA0lPJf1IDENaADaef5P0eA1DxukhPQAbEH4nnR4AoKf9Z5oeAGDP/J9hegCAggdAmx5eSbrf4OoBAAoA6F7S2vQAAAMBaG31AAAjAeiuHmx6sM2lt86x5ggHgIqqb6aHJ5J+Vhx3yqEAYAJ1I60eAGACACJNDwAwIQB9q4elTQ8AcCAAuquHR5IeLuTVNAAcGIDu9GA/wLg+8wMjAMwAgL11tFfR1gm+z3D/7i0B4EAG2FkE2yew/QI7lGLby0v4AMDELthhE3vws2/854nvNWZ4ABijWkHMktr8vnQBoMDM0kuW2uYBYK1A90xgqakl11mbt7OF9rp4iW0eACYCYNPm7Uyhbf9G/DAFDHQtYpunA1ToAJHbPAA4AGihzQPAQABaa/MAUAhAq20eAP4DQOttHgB6ANi0eVu725m+pezND1yUuC9PtwzM2ObpAGsFjtavYKNu2ri/7j0DpOoAUwgYfUwAiO6gM38AcAoYPRwAojvozB8AnAJGDweA6A468wcAp4DRwwEguoPO/AHAKWD0cACI7qAzfwBwChg9HACiO+jMHwCcAkYPB4DoDjrzBwCngNHDASC6g878AcApYPRwAIjuoDN/AHAKGD0cAKI76MwfAJwCRg+fBIDoomTP3/3v47MLGL1+AIjuoDN/AHAKGD18EADHkq5Er5j8TyjwTNK1bU1WO0Q6I+mcpF1/R9tYCtiPZj9K+loKQKzyyHa0AnzDR0vXRiAAtOHj6CoAYLR0bQQCQBs+jq4CAEZL10YgALTh4+gqAGC0dG0EAkAbPo6uAgBGS9dG4F+d0diQnSKbdAAAAABJRU5ErkJggg==';

const searchIcon = 'data:image/png;base64,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';

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

  _renderSearch() {
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

        <ScrollView style={{ flex: 3 }}>
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

  _renderPlayList() {
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

        <ScrollView style={{ flex: 3 }}>
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

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        itemTintColor="#D3D3D3"
        unselectedTintColor="#989898"
        unselectedItemTintColor="#989898"
        barTintColor="#383838"
      >
        <TabBarIOS.Item
          title="Search"
          icon={{ uri: searchIcon, scale: 5 }}
          selected={this.state.selectedTab === 'searchTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'searchTab',
            });
          }}
        >
          {this._renderSearch()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="PlayList"
          icon={{ uri: playListIcon, scale: 5 }}
          selected={this.state.selectedTab === 'playListTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'playListTab',
            });
          }}
        >
          {this._renderPlayList()}
        </TabBarIOS.Item>
      </TabBarIOS>
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
