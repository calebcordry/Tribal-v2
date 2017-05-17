import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableHighlight
} from 'react-native';

class Hero extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props._onPressButton} >
        <View>
          <Text style={styles.hero} >Mr. {this.props.name}</Text>
          <Image source={this.props.image} style={styles.picture}/>
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
    };
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton(name) {
    console.log("You pressed a button");
    const text = "Selected " + name;
    this.setState({ text });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('./public/images/logo.png')} style={{width: "100%", height: "100%"}} />
        </View>
        <View style={styles.profiles}>
          {team.map((hero, index) => (
            <Hero key={index} name={hero.name} image={hero.image} _onPressButton={() => this._onPressButton(hero.name)} />
          ))}
        </View>

        <View style={styles.textInput} >
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your name: "
            onChangeText={(text) => this.setState({ text })}
          />
        </View>

        <Text style={styles.text}>
          {this.state.text}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.welcome}>
            End of App!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin: 2,
    padding: 2,
    width: 100,
    height: 100,
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
    height: 100,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  inputBox: {
    borderColor: "#F8F8F8",
    height: 40,
    width: 250,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
});

AppRegistry.registerComponent('reactNative', () => reactNative);
