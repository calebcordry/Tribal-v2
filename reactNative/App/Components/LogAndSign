import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

class LogAndSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <View>
        <Text>LogIn/SignUp</Text>
        <TextInput 
          style={styles.inputBox}
          placeholder='username'
          onChangeText={(text) => this.setState({ username: text })} />
        <TextInput
          style={styles.inputBox}
          placeholder='password'
          onChangeText={(text) => this.setState({ password: text })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
   inputBox: {
    backgroundColor: 'white',
    borderColor: "#F8F8F8",
    height: 20,
    width: 100,
    textAlign: 'center',
  }
})