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

import {styles} from './views/styles';
import LoggedIn_landing from './views/loggedin_landing'

//Home Screen
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Flock'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
    
        <Text>Hello!</Text>

        <FormLabel >Email</FormLabel>
        <FormInput />
        <FormLabel>Password</FormLabel>
        <FormInput />
        <Button style={styles.pad}
          onPress={() => navigate('LoggedIn')}
          title="Login"
        />

      </View>
    );
  }
}

const flock = StackNavigator({
  Home: { screen: HomeScreen },
  LoggedIn: { screen: LoggedIn_landing }
});



AppRegistry.registerComponent('flock', () => flock);
