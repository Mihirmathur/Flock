import React, { Component } from 'react';
import { Grid, Row,  FormLabel, Button, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';  
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
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
import flockLogo from '../img/flock_logo.png';

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
          this.setState({'posts': responseJson.posts.reverse()})
          const _this = this;
          responseJson.posts.map(function(post, i) {
            if (!_this.state['userForPost' + post.Id]) {
              console.log(post.Id);
              fetch('https://flock-site-api.herokuapp.com/users/' + post.User_id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }}).then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.status == "success") {
                  if (responseJson.user) {
                    console.log(responseJson.user)
                    var key = 'userForPost' + post.Id
                    var val = responseJson.user
                    var obj  = {}
                    obj[key] = val
                    _this.setState(obj)
                  }
                }
              })
              .catch((error) => {
                console.error(error);
              });
            }
          });
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
      
      <Image source={require('../img/flock_logo.png')} style={{width: 120, height: 80}}/>
      <ScrollView style={styles.scrollContainer}>

      {this.state.posts.map(function(post, i) {
        return (
          <View style={styles.card} title={post.Title}>

          <Text style={styles.title}>{post.Title}</Text>

         


        <View
        style={{
          borderBottomColor: '#F4EEF0',
          borderBottomWidth: 1,
          marginTop:2,
          marginBottom: 4
        }}
        />

         {_this.state['userForPost' + post.Id] && 
          <TouchableHighlight underlayColor="white" onPress={() => _this.props.navigation.navigate('ProfileView', {'user': _this.state['userForPost' + post.Id], 'fb_user': _this.state['userForPost' + post.Id].Fb_id})}>
          <View>
          <Image style={{width: 64, height: 64, borderRadius: 32, marginTop: 10, marginBottom: 10}} source={{uri: "https://graph.facebook.com/" + _this.state['userForPost' + post.Id].Fb_id + "/picture?width=160&height=160" }} />

          </View>
          </TouchableHighlight>
        }


        <Text style={styles.description}>
        Location: {post.Location}
        </Text>

        <Text style={styles.description}>
        {post.Description}
        </Text>

        <TimeAgo style={styles.description} time={post.Time_created} />

        <Button backgroundColor='#03A9F4' 
        buttonStyle={{borderRadius: 20, width: 130, height: 30, fontFamily: 'Avenir-Light', fontSize: 10, marginTop: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='View Flock!' 
        onPress={()=>navigate('EventView', {'post': post})}
        />

        </View>
        );
      })}

      </ScrollView>

      <View style={styles.navBar}>
      <CircleButton size={50} 
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
