import React, { Component } from 'react';
import {
  Button,
  View,
  Image,
} from 'react-native';
import styles from './css/styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  get() {
    fetch('https://tribal-global-mobile.herokuapp.com/login', {
      method: 'GET',
    }).then(result => console.log(result));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar} />
        <View style={styles.header}>
          <Image
            source={require('../public/images/logo.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.row}>
          <Button
            style={styles.buttonText}
            onPress={this.get.bind(this)}
            title="Login with Spotify"
          />
        </View>
      </View>
    );
  }
}

export default Login;
