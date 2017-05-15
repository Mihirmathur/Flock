import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';

import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { styles } from './styles';


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
    token: null,
    user: {
      First_name: "First name",
      Last_name: "Last name"
    }
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
  };

  componentWillMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value) {
        this.setState({'token': value});
        fetch('https://flock-site-api.herokuapp.com/profile', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status == "success") {
            this.setState({'user': responseJson.user})
            console.log(this.state.user)
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>

      <Text style={{marginTop: 10}}>First Name: {this.state.user.First_name}</Text>

      <Text style={{marginTop: 10}}>Last Name: {this.state.user.Last_name}</Text>

      </View>
      );
    }
  }
