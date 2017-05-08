import React, { Component } from 'react';
import {Grid, Row, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import {styles} from './styles';

export default class LoggedIn_landing extends React.Component {
  static navigationOptions = {
    title: 'Flocks Near You',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Join a flock!</Text>
      </View>
    );
  }
}

