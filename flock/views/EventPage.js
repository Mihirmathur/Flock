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
    title: 'Flock Event',
  };

  constructor(props) {
    super(props);
    this.state = { 
      region: {
          latitude: 0.78825,
          longitude: 0.4324,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        }, 
      attendees: [],
      attending: false,
      user_email: '',
      profile: null,
    };
  }

  componentWillMount() {
    const {state} = this.props.navigation;
    console.log("This is the postID:" + state.params.post.Id);
    fetch('https://flock-site-api.herokuapp.com/posts/' + state.params.post.Id + "/attendees" , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status == "success") {
            if (responseJson.attendees) {
              this.setState({'attendees': responseJson.attendees})
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });

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
            console.log("USER PROFILE");
            console.log(responseJson.user.Email);
            if (responseJson.status == "success") {
              if (responseJson.user){
                this.state.user_email = responseJson.user.Email;
                this.state.profile = responseJson.user;
                for(var i = 0; i < this.state.attendees.length; i++){
                  if(this.state.attendees[i].Email == this.state.user_email){
                      console.log("FOUND FOUND FOUND FOUND FOUND")
                      this.setState({'attending': true});
                    }
                 }
                    console.log("The user may be attending: " + this.state.attending);
                    console.log("This is the users email: " + this.state.user_email);
                    console.log("This is the attendees: " + this.state.attendees);
              }
            }
          })
        .catch((error) => {
          console.error(error);
        });

      }
    });

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

  createNewAttendee = () => {
    user_token = AsyncStorage.getItem("token");
    console.log(user_token);
    console.log("This is the postID:" + this.props.navigation.state.params.post.Id);
    AsyncStorage.getItem('token').then((value) => {
      if (value) {
       fetch('https://flock-site-api.herokuapp.com/posts/' + this.props.navigation.state.params.post.Id + "/attend", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + value,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: user_token
          })
        })
       .then((response) => response.json())
          .then((responseJson) => {
               if (responseJson.status == "success") {
                  this.state.attendees.push(this.state.profile);
                  this.setState({attending: true});
                  console.log("STATE SHOULD CHANGE TO ATTENDING");

                }
          })
      }
  });    
  Alert.alert('You have been added to the Flock!');
};

  removeAttendance = () => {
    user_token = AsyncStorage.getItem("token");
    console.log(user_token);
    console.log("This is the postID:" + this.props.navigation.state.params.post.Id);
    AsyncStorage.getItem('token').then((value) => {
      if (value) {
       fetch('https://flock-site-api.herokuapp.com/posts/' + this.props.navigation.state.params.post.Id + "/attendance", {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + value,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: user_token
          })
        })
       .then((response) => response.json())
          .then((responseJson) => {
            console.log("THIS IS THE RESPONSE STATUS OF REMOVING ATTENDANCE: " +  responseJson.status);
               if (responseJson.status == "success") {
                  var i;
                  for (i = 0; i < this.state.attendees.length; i++){
                    if (this.state.attendees[i].Id == this.state.profile.Id){
                      break;
                    }
                  }
                  if (i < this.state.attendees.length)
                    this.state.attendees.splice(i, 1)

                  this.setState({'attending': false});
                  console.log("STATE SHOULD CHANGE TO NOT ATTENDING");
                }
          })
      }
  });    
  Alert.alert('You have been removed from the Flock!');
};

  

  render() {
    const { navigate } = this.props.navigation;
    var attendeesButtonTitle = 'Attendee List (' + this.state.attendees.length + ')';
    console.log("THIS IS THE VALUE OF ATTENDING AT TIME OF RENDER:" + this.state.attending)
    return (
      <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{this.props.navigation.state.params.post.Title}</Text>
      <Text style={{fontSize:14}}>{this.props.navigation.state.params.post.Description}</Text>

      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }} />

          <Button backgroundColor='green' 
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title={attendeesButtonTitle}
              onPress={()=>navigate('AttendeeList', {'attendees': this.state.attendees})} />

          {this.state.attending == false ?
              <Button backgroundColor='#03A9F4' 
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Join this Flock!' 
              onPress={this.createNewAttendee} /> :

              <Button backgroundColor='#03A9F4' 
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Leave this Flock!' 
              onPress={this.removeAttendance} /> 
            }

      </View>
      );
    }
  }
