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
import { GMAPS_AUTH } from '../environment.js'

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


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

/*

      <FormLabel>Location</FormLabel>
      <FormInput onChangeText={(location) => this.setState({location})} autoCapitalize='none'/>

      <FormLabel>Latitude</FormLabel>
      <FormInput  onChangeText={(latitude) => this.setState({latitude})} autoCapitalize='none'/>

      <FormLabel>Longitude</FormLabel>
      <FormInput  onChangeText={(longitude) => this.setState({longitude})} autoCapitalize='none'/>

      <FormLabel>Zip</FormLabel>
      <FormInput  onChangeText={(zip) => this.setState({zip})} autoCapitalize='none'/>


*/

  render() {
    const { navigate } = this.props.navigation;
    API_KEY=GMAPS_AUTH;
    console.log(API_KEY);
    return (
      <View style={styles.container}>
      <Text style={{marginTop: 10}}>Create a Flock!</Text>

      <FormLabel >Title</FormLabel>
      <FormInput onChangeText={(title) => this.setState({title})} autoCapitalize='none'/>

      <FormLabel>Description</FormLabel>
      <FormInput onChangeText={(description) => this.setState({description})} autoCapitalize='none'/>

      <FormLabel>Location</FormLabel>
      <FormInput onChangeText={(location) => this.setState({location})} autoCapitalize='none'/>


       <FormLabel> Search for address </FormLabel>

       <GooglePlacesAutocomplete

        placeholder='Search'
        minLength={1} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed='true'    // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          this.state.latitude = details.geometry.location.lat.toString();
          this.state.longitude = details.geometry.location.lng.toString();
          this.state.zip = '90024';
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: `${API_KEY}`,
          language: 'en', // language of the results
        }}
         styles={{
           container: {
              width:300,
              height: 100,
           },
            textInputContainer: {
              backgroundColor: 'grey',
              borderTopWidth: 0,
              borderBottomWidth:0
            },
            textInput: {
              width: 300,
              height: 30,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}

        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />

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
