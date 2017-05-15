import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';


import {
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
import LoggedIn_landing from './loggedin_landing'
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  static navigationOptions = {
    title: 'Location of Flock',
  };

  constructor(props) {
    super(props);
    this.state = { 
    region: {
        latitude: 0.78825,
        longitude: 0.4324,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      } };
  }

  componentWillMount() {
    const {state} = this.props.navigation;
    if (state.params && state.params.post) {
      console.log("post " + state.params.post);
      this.setState({'region': {
        'latitude': state.params.post.Latitude,
        'longitude': state.params.post.Longitude,
        'latitudeDelta': 0.0043,
        'longitudeDelta': 0.0034,
      }});
    }
  }

  render() {
    return (
      <View style={styles.mapcontainer}>
      <Text style={{marginTop: 10}}>Map!</Text>
      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }} />

      </View>
      );
    }
  }
