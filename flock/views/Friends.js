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
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { styles } from './styles';
import LoggedIn_landing from './loggedin_landing'
import EventPage from './EventPage'
import MapView from 'react-native-maps';


export default class Friends extends React.Component {
  static navigationOptions = {
    title: 'Friends',
  };

  constructor(props) {
    super(props);
      friends: []
  }

  profile(friend) {
    return fetch('https://flock-site-api.herokuapp.com/users/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Fb_id: friend.id
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status == "success" && responseJson.users != []) {
            this.props.navigation.navigate('ProfileView', {'user': responseJson.users[0], 'fb_user': friend.id})
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  componentWillMount() {
    const {state} = this.props.navigation;
    this.setState({ attendees: state.params.attendees})
  }

  render() {
    const { state } = this.props.navigation;
    var _this = this;
    return (
      <View style={styles.containerView}>

        <ScrollView>

        {
          state.params.friends.map(function(friend){
            return(
              <TouchableHighlight onPress={() => _this.profile(friend)}>
                <View style={styles.cardCenter}>
                  
                    <Image style={{width: 60, height: 60, borderRadius: 30, marginBottom: 10}} source={{uri: "https://graph.facebook.com/" + friend.id + "/picture?width=100&height=100" }} />
                  <Text style={styles.title}>  
                    {`${friend.name}`}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          
          })

        }

        </ScrollView>
      </View>
    )
    
  }
}
