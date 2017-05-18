import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';  

import {
  AsyncStorage,
  AppRegistry,
  Image,
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
    fb_user: 0,
    posts: [],
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
    console.log("BEGINNING")
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
          if (responseJson.status == "success") {
            this.setState({'user': responseJson.user})
            console.log(this.state.user)
            fetch('https://flock-site-api.herokuapp.com/posts/search', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "User_id": responseJson.user.Id
                })
              }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status == "success") {
                  if (responseJson.posts) {
                    this.setState({'posts': responseJson.posts})
                  }
                  console.log(this.state.posts)
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
    AsyncStorage.getItem('fb_user').then((value) => {
      if (value) {
        console.log(value)
        this.setState({'fb_user': value});
        this.forceUpdate()
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Image style={{width: 128, height: 128, borderRadius: 64}} source={{uri: "https://graph.facebook.com/" + this.state.fb_user + "/picture?width=160&height=160" }} />

      <Text style={{marginTop: 10}}>{this.state.user.First_name} {this.state.user.Last_name}</Text>

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
            title='Join this Flock!' 
            onPress={()=>navigate('MapView', {'post': post})}
            />
          </Card>
        );
      })}

      </View>
      );
    }
  }
