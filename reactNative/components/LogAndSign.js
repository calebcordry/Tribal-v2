import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
} from 'react-native';
import styles from './css/styles.css';


class LogAndSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }
  render() {
    const { message } = this.state;

    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../public/images/logo.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: 'red', width: '100%' }}>
          <Text>LogIn/SignUp</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="username"
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="password"
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            title="login"
            style={styles.button}
            onPress={this.props._login}
            raised
            backgroundColor="black"
            theme="light"
            textColor="red"
          />
        </View>


        {message !== '' &&
          <View style={styles.messageBox}>
            <Text style={styles.message}>{message}</Text>
          </View>
        }
      </View>

    );
  }
}

export default LogAndSign;
