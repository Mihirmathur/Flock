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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      
      <Button backgroundColor='#0355F5' 
      buttonStyle={{borderRadius: 0, marginLeft: 50, marginRight: 50, marginBottom: 10}}
      title='Profile Page' 
      onPress={()=>
        this.profile()
      }
      />

      <Button backgroundColor='#0355F5' 
      buttonStyle={{borderRadius: 0, marginLeft: 50, marginRight: 50, marginBottom: 10}}
      title='Friends'
      onPress={()=>this.friends()} />

      <Button backgroundColor='#0355F5' 
      buttonStyle={{borderRadius: 0, marginLeft: 50, marginRight: 50, marginBottom: 10}}
      title= 'Start Flock' 
      onPress={()=>navigate('CreateFlockView')}
      />

      <Text style={{marginTop: 10}}>Join a flock!</Text>
      
      <ScrollView>

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

      <Card title='Event 1'>
      <Text style={{marginBottom: 10}}>
      Will map the events with cards here. 
      We can put an image of the poster and the event description here. 
      </Text>
      <Button backgroundColor='#03A9F4' 
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='Join this Flock!' 
      onPress={()=>navigate('EventView')}
      />
      </Card>

      <Card title='Event 2'>
      <Text style={{marginBottom: 10}}>
      Will map the events with cards here. 
      We can put an image of the poster and the event description here. 
      </Text>
      <Button backgroundColor='#03A9F4' 
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='Join this Flock!' />
      </Card>

      <Card title='Event 3'>
      <Text style={{marginBottom: 10}}>
      Will map the events with cards here. 
      We can put an image of the poster and the event description here. 
      </Text>
      <Button backgroundColor='#03A9F4' 
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='Join this Flock!' />
      </Card>


      </ScrollView>

      </View>
      );
  }
}
