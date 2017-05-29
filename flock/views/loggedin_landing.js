import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';  
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

import CircleButton from 'react-native-circle-button';

import mapIcon from '../img/map.png';
import profileIcon from '../img/profile.png';
import createflockIcon from '../img/startflock.png';
import friendsIcon from '../img/friends.png';

export default class LoggedIn_landing extends React.Component {
  static navigationOptions = {
    title: 'Flocks Near You',
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = { 
      posts: []
    };
  }

  map() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({'region': {
          'latitude': position.coords.latitude,
          'longitude': position.coords.longitude,
          'latitudeDelta': 0.043,
          'longitudeDelta': 0.034,
        }});
        this.props.navigation.navigate('Map', {'region': this.state.region, 'posts': this.state.posts});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  friends() {
    AsyncStorage.getItem('fb_user').then((fb_user) => {
      if(fb_user) {
        AsyncStorage.getItem('fb_token').then((fb_token) => {
          if(fb_token) {
            fetch("https://graph.facebook.com/" + fb_user + "/friends?access_token=" + fb_token, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.data) {
                this.props.navigation.navigate('Friends', {'friends': responseJson.data})
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }
        })
      }
    })
  }


  profile() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        fetch('https://flock-site-api.herokuapp.com/profile', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == "success") {
            AsyncStorage.getItem('fb_user').then((fb_user) => {
              if (fb_user) {
                this.props.navigation.navigate('ProfileView', {'token': token, 'user': responseJson.user, 'fb_user': fb_user})
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  }

  componentWillMount() {
    fetch('https://flock-site-api.herokuapp.com/posts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "success") {
        if (responseJson.posts) {
          this.setState({'posts': responseJson.posts})
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const _this = this;
    return (
      <View style={styles.container}>
      

      <Text style={{marginTop: 20}}>Join a flock!</Text>
      
      <ScrollView style={styles.scrollContainer}>

      {this.state.posts.reverse().map(function(post, i) {
        return (
          <Card title={post.Title}>
          <Text style={{marginBottom: 10}}>
          Location: {post.Location}
          </Text>
          <Text style={{marginBottom: 10}}>
          {post.Description}
          </Text>
          <TimeAgo time={post.Time_created} />
          <Button backgroundColor='#03A9F4' 
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='View this Flock!' 
          onPress={()=>navigate('EventView', {'post': post})}
          />
          </Card>
          );
      })}

      </ScrollView>

            <View style={styles.navBar}>
                <CircleButton size={40} 
                primaryColor = "#9C2A4D" secondaryColor="#CB3E6A" 
                iconButtonRight={createflockIcon} iconButtonTop={profileIcon} iconButtonLeft={friendsIcon} iconButtonBottom={mapIcon}
                onPressButtonTop={()=>this.profile()} onPressButtonLeft={()=>this.friends()}
                onPressButtonRight={()=>navigate('CreateFlockView')} onPressButtonBottom={()=>this.map()}

                />
            </View>



      </View>
      );
  }
}
