import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';
//import FlatList from 'react-native/Libraries/Lists/FlatList'


import {
  AsyncStorage,
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { styles } from './styles';
import LoggedIn_landing from './loggedin_landing'
import EventPage from './EventPage'
import MapView from 'react-native-maps';


export default class AttendeeListPage extends React.Component {
  static navigationOptions = {
    title: 'Flock Event',
  };

  constructor(props) {
    super(props);
      attendees: []
  }

  componentWillMount() {
    const {state} = this.props.navigation;
    this.setState({ attendees: state.params.attendees})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerView}>
        {
          this.state.attendees.map(function(attendee){
            return(
              <View>
                <Text>
                    <Image style={{width: 40, height: 40, borderRadius: 15}} source={{uri: "https://graph.facebook.com/" + attendee.Fb_id + "/picture?width=100&height=100" }} />
                    {`${attendee.First_name} ${attendee.Last_name}`}
                </Text>
              </View>
            );
          
          })

        }
      </View>
    )
    
  }
}
