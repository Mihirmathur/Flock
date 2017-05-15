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
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      } };
  }

  render() {
    return (
      <View style={styles.mapcontainer}>
      <Text style={{marginTop: 10}}>Map!</Text>
      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} />

      </View>
      );
    }
  }
