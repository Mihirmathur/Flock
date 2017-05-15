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

  constructor(props) {
    super(props);

    this.state = { 
    email: 'defaultemail@gmail.com', 
    password: 'defaultpw', 
    firstname : 'Mihir', 
    lastname: 'Default'  };
  }

  static navigationOptions = {
    title: 'Flock'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

      <Text>Hello!</Text>

      <FormLabel >Email</FormLabel>
      <FormInput onChangeText={(email) => this.setState({email})} ref='forminput' textInputRef='email'/>

      <FormLabel>Password</FormLabel>
      <FormInput onChangeText={(password) => this.setState({password})}/>

      <FormLabel>First Name</FormLabel>
      <FormInput onChangeText={(firstname) => this.setState({firstname})}/>

      <FormLabel>Last Name</FormLabel>
      <FormInput  onChangeText={(lastname) => this.setState({lastname})}/>

      <Button style={styles.pad} onPress={() => {
        fetch('https://flock-site-api.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            First_name: this.state.firstname,
            Last_name: this.state.lastname,
            Email: this.state.email,
            Password: this.state.password
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
        navigate('LoggedIn');
      }} title="SignUp" />

      </View>
      );
    }
  }

  const flock = StackNavigator({
    Home: { screen: HomeScreen },
    LoggedIn: { screen: LoggedIn_landing }
  });



  AppRegistry.registerComponent('flock', () => flock);
