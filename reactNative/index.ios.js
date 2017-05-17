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

export default class reactNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      songs: [],
    };
    this._onPressButton = this._onPressButton.bind(this);
    this._onSearch = this._onSearch.bind(this);
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

        <ScrollView style={{borderWidth:1, borderColor : 'gray', flex:1}}>
          {this.state.songs.map((song, index) => (
            <WebView
              key={index}
              source={{ uri: `https://open.spotify.com/embed?uri=${song.uri}` }}
              style={styles.webview}
              allowsInlineMediaPlayback={true}
              automaticallyAdjustContentInsets={true}
              scrollEnabled={true}
              automaticallyAdjustContentInsets={false}
              height={100}
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
    height: 80
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);
