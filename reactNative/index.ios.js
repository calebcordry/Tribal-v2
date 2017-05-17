import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableHighlight,
  Button,
  ScrollView,
  WebView
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Hero extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props._onPressButton} >
        <View>
          <Text style={styles.hero} >{this.props.name}</Text>
          <Image source={this.props.image} style={styles.picture} />
        </View>
      </TouchableHighlight>
    );
  }
}

const team = [
  { name: 'Caleb', image: require('./public/images/caleb.jpg') },
  { name: 'Carlo', image: require('./public/images/carlo.jpg') },
  { name: 'Vaggelis', image: require('./public/images/vaggelis.jpg') }
];

class SongListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      backgroundColor: '#fff',
      onPlaylist: false,
      opacity: 1
    }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'red' });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: 'green' });
        break;
      case SWIPE_LEFT:
        this.props._removeSong(this.props.song, 'Song removed')  
        this.setState({ backgroundColor: '#282828', onPlaylist: false, opacity: 1 }, () => console.log('Swipe left: ', this.state));  
        break;
      case SWIPE_RIGHT:
        this.props._addSong(this.props.song, 'Song added')  
        this.setState({ backgroundColor: 'red', onPlaylist: true, opacity: 0.3 }, () => console.log('Swipe right: ', this.state));  
        break;
    }
  }

  render() {

    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 10
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
        style={{borderColor: this.state.borderColor}}
      >
        <WebView
          key={this.props.index}
          source={{ uri: `https://open.spotify.com/embed?uri=${this.props.song.uri}` }}
          style={[styles.webview, {opacity: this.state.opacity}]}
          allowsInlineMediaPlayback={true}
          automaticallyAdjustContentInsets={true}
          scrollEnabled={true}
          automaticallyAdjustContentInsets={false}
          height={100}
        />
      </GestureRecognizer>
    );
  }
}

export default class reactNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      songs: [],
      message: ''
    };
    this._onPressButton = this._onPressButton.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._addSong = this._addSong.bind(this);
    this._removeSong = this._removeSong.bind(this);
  }

  _addSong(song, message) {
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` });
  }

  _removeSong(song, message) {
    this.setState({ message: `[${song.artist}] ${song.uri} **${message}** ` });
  }

  _onPressButton(name) {
    console.log("You pressed a button");
    const text = "Selected " + name;
    this.setState({ text });
  }

  _onSearch() {

    /**
     *  NOTE: NEED TO REFACTOR FOR RELATIVE ADDRESS
     */

    return fetch(`http://localhost:4242/tracks?trackName=${this.state.text}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((songs) => {
        console.log('fetch: ', songs);
        this.setState({ songs });
      })
      .catch((err) => console.warn('fetch error: ', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./public/images/logo.png')} style={{ width: "100%", height: "100%" }} />
        </View>
        {/*<View style={styles.profiles}>
          {team.map((hero, index) => (
            <Hero key={index} name={hero.name} image={hero.image} _onPressButton={() => this._onPressButton(hero.name)} />
          ))}
        </View>*/}

        <View style={styles.textInput} >
          <TextInput
            style={styles.inputBox}
            placeholder="Search songs or artist"
            onChangeText={(text) => this.setState({ text })}
          />
          <Button
            title="Search"
            style={styles.button}
            onPress={this._onSearch}
            raised={true}
            backgrounColor='#Foo'
            theme='light'
            textColor='white'
          />
        </View>


        {this.state.message !== '' &&
          <View>
            <Text style={styles.message}>{this.state.message}</Text>
          </View>
        }  

        <ScrollView style={{borderWidth:1, borderColor : 'gray', flex:1}}>
          {this.state.songs.map((song, index) => (
            <SongListEntry
              key={index}
              song={song}
              _addSong={this._addSong}
              _removeSong={this._removeSong}
            />
          ))}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#282828',
  },
  header: {
    width: "100%",
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686868',
  },
  footer: {
    width: "100%",
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686868',
  },
  profiles: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picture: {
    margin: 20,
    padding: 2,
    width: 50,
    height: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F8F8F8'
  },
  instructions: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  hero: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  textInput: {
    borderColor: "#F8F8F8",
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: "#F8F8F8",
    height: 40,
    width: 200,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  webview: {
    backgroundColor: '#282828',
    height: 80,
    borderWidth: 5,
    borderRadius: 2,
    margin: 2,
    padding: 2
  },
  message: {
    backgroundColor: '#282828',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);
