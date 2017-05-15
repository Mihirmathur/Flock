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

import LoggedIn_landing from './loggedin_landing'
import { styles } from './styles';


export default class CreateFlock extends React.Component {
  static navigationOptions = {
    title: 'Create Flock',
  };

  constructor(props) {
    super(props);
    this.state = { 
    title: '', 
    description: '', 
    location : '', 
    latitude: '',
    longitude: '',
    zip: 0  };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text style={{marginTop: 10}}>Create a Flock!</Text>

      <FormLabel >Title</FormLabel>
      <FormInput onChangeText={(title) => this.setState({title})} autoCapitalize='none'/>

      <FormLabel>Description</FormLabel>
      <FormInput onChangeText={(description) => this.setState({description})} autoCapitalize='none'/>

      <FormLabel>Location</FormLabel>
      <FormInput onChangeText={(location) => this.setState({location})} autoCapitalize='none'/>

      <FormLabel>Latitude</FormLabel>
      <FormInput  onChangeText={(latitude) => this.setState({latitude})} autoCapitalize='none'/>

      <FormLabel>Longitude</FormLabel>
      <FormInput  onChangeText={(longitude) => this.setState({longitude})} autoCapitalize='none'/>

      <FormLabel>Zip</FormLabel>
      <FormInput  onChangeText={(zip) => this.setState({zip})} autoCapitalize='none'/>

      <Button style={styles.pad} onPress={() => {
        AsyncStorage.getItem('token').then((value) => {
          if (value) {
            fetch('https://flock-site-api.herokuapp.com/posts', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                Title: this.state.title,
                Description: this.state.description,
                Location: this.state.location,
                Latitude: this.state.latitude,
                Longitude: this.state.longitude,
                Zip: parseInt(this.state.zip)
              })
            }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
            })
            .catch((error) => {
              console.error(error);
            });
            navigate('LoggedIn');
          }
        });
      }} title="Create Flock" />

      </View>
      );
    }
  }

  const flock = StackNavigator({
    LoggedIn: { screen: LoggedIn_landing }
  });
