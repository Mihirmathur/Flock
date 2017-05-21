import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';


import {
  AsyncStorage,
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { styles } from './styles';
import LoggedIn_landing from './loggedin_landing'
import MapView from 'react-native-maps';


export default class EventPage extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = { 
      region: {
          latitude: 0.78825,
          longitude: 0.4324,
          latitudeDelta: 0.043,
          longitudeDelta: 0.034,
        }, 
      attendees: [],
      attending: false,
      user_email: '',
      profile: null,
    };
  }

  componentWillMount() {
    const { state } = this.props.navigation;
    this.setState({'region': state.params.region});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    return (
      <View style={styles.mapFullContainer}>

      <MapView
        style={ styles.mapFull }
        initialRegion={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }}>

      <MapView.Marker
        coordinate={{latitude: this.state.region.latitude,
        longitude: this.state.region.longitude}}
        title={"Your Location"} />

      {state.params.posts.map((post) => (
      <MapView.Marker
        coordinate={{latitude: parseFloat(post.Latitude),
        longitude: parseFloat(post.Longitude)}}
        onCalloutPress={()=>navigate('EventView', {'post': post})}
        title={post.Title}
        description={post.Description} />
      ))}

      </MapView>

      </View>
      );
    }
  }
