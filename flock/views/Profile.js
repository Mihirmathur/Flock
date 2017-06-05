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
    const {state} = this.props.navigation;
    if(state.params.token) {
      this.setState({'token': state.params.token})
    }
    if(state.params.user) {
      this.setState({'user': state.params.user})
    }
    if(state.params.fb_user) {
      this.setState({'fb_user': state.params.fb_user})
    }
    fetch('https://flock-site-api.herokuapp.com/posts/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "User_id": state.params.user.Id
        })
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
    const _this = this
    return (
      <View style={styles.cardCenter}>

      <Image style={{width: 150, height: 150, borderRadius: 75, paddingTop: 100, margin: 20}} source={{uri: "https://graph.facebook.com/" + this.state.fb_user + "/picture?width=160&height=160" }} />

      <Text style={styles.title}>{this.state.user.First_name} {this.state.user.Last_name}</Text>

      <ScrollView>

      {this.state.posts.reverse().map(function(post, i) {
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

      </View>
      );
    }
  }
