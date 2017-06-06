import React, { Component } from 'react';
import {Grid, Row, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import {styles} from './views/styles';
import LoggedIn_landing from './views/loggedin_landing'
import EventPage from './views/EventPage'
import Profile from './views/Profile'
import CreateFlock from './views/CreateFlock'
import AttendeeListPage from './views/AttendeeListPage'
import Friends from './views/Friends'
import Map from './views/Map'

console.disableYellowBox = true;


//Home Screen
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
    email: '', 
    password: '', 
    firstname : '', 
    lastname: ''  };
  }

  static navigationOptions = {
    title: 'Flock'
  };

  signup() {
    return fetch('https://flock-site-api.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            First_name: this.state.firstname,
            Last_name: this.state.lastname,
            Email: this.state.email,
            Password: this.state.password
          })
        }).then((response) => response.json());
  }

  login() {
    return fetch('https://flock-site-api.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: this.state.email,
            Password: this.state.password
          })
        }).then((response) => response.json());
  }

  loginWithFB(token) {
    return fetch('https://flock-site-api.herokuapp.com/loginWithFB', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token
          })
        }).then((response) => response.json());
  }

  render() {
    const { navigate } = this.props.navigation;
    var _this = this;
    return (
      <View style={styles.container}>

      <FBLogin style={{ marginBottom: 10, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          _this.loginWithFB(data.credentials.token).then((responseJson) => {
            if(responseJson.status == "success") {
              try {
                console.log("Saving token")
                AsyncStorage.setItem('token', responseJson.app_token);
                AsyncStorage.setItem('fb_token', responseJson.fb_token);
                AsyncStorage.setItem('fb_user', data.credentials.userId);
                navigate('LoggedIn');
              } catch (error) {
                console.log(error)
                Alert.alert('Login Error', 'An error occurred when saving login credentials')
              }
            }
          });
        }}
        onLogout={function(){
          try {
            console.log("Deleting token")
            AsyncStorage.setItem('token', '');
            console.log("Logged out.");
          } catch (error) {
            console.log(error)
          }
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.loginWithFB(data.credentials.token).then((responseJson) => {
            if(responseJson.status == "success") {
              try {
                console.log("Saving token")
                AsyncStorage.setItem('token', responseJson.app_token);
                AsyncStorage.setItem('fb_token', responseJson.fb_token);
                navigate('LoggedIn');
              } catch (error) {
                console.log(error)
                Alert.alert('Login Error', 'An error occurred when saving login credentials')
              }
            }
          });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          try {
            console.log("Deleting token")
            AsyncStorage.setItem('token', '');
          } catch (error) {
            console.log(error)
          }
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
          try {
            console.log("Deleting token")
            AsyncStorage.setItem('token', '');
          } catch (error) {
            console.log(error)
          }
        }}
        onCancel={function(){
          console.log("User cancelled.");
          try {
            console.log("Deleting token")
            AsyncStorage.setItem('token', '');
          } catch (error) {
            console.log(error)
          }
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
          try {
            console.log("Deleting token")
            AsyncStorage.setItem('token', '');
          } catch (error) {
            console.log(error)
          }
        }}
      />

      {/*
      <FormLabel >Email</FormLabel>
      <FormInput onChangeText={(email) => this.setState({email})} ref='forminput' textInputRef='email' autoCapitalize='none'/>

      <FormLabel>Password</FormLabel>
      <FormInput onChangeText={(password) => this.setState({password})} autoCapitalize='none'/>

      <FormLabel>First Name</FormLabel>
      <FormInput onChangeText={(firstname) => this.setState({firstname})}/>

      <FormLabel>Last Name</FormLabel>
      <FormInput  onChangeText={(lastname) => this.setState({lastname})}/>

      <Button style={styles.pad} onPress={() => {
        this.signup().then((responseJson) => {
          if(responseJson.status == "success") {
            Alert.alert('Registration Successful', "Your user has been created")
            this.login().then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status == "success") {
                try {
                  console.log("Saving token")
                  AsyncStorage.setItem('token', responseJson.token);
                  navigate('LoggedIn');
                } catch (error) {
                  console.log(error)
                }
              }
            });
          } else {
            Alert.alert('Registration Error', "The user could not be created")
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }} title="SignUp" />

      <Button style={styles.pad} onPress={() => {
        this.login().then((responseJson) => {
          console.log(responseJson.token);
          if(responseJson.status == "success") {
            try {
              console.log("Saving token")
              AsyncStorage.setItem('token', responseJson.token);
              navigate('LoggedIn');
            } catch (error) {
              console.log(error)
              Alert.alert('Login Error', 'An internal server error occurred. Please wait before trying again')
            }
          } else {
            Alert.alert('Login Error', 'Please check your credentials and try again')
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }} title="Login" />

      <Button style={styles.pad} onPress={() => {
        try {
          console.log("Deleting token")
          AsyncStorage.setItem('token', '');
          Alert.alert('Logout Successful', 'You have been logged out')
        } catch (error) {
          console.log(error)
        }
      }} title="Logout" />*/}

      </View>
      );
    }
  }

  const flock = StackNavigator({
    Home: { screen: HomeScreen },
    LoggedIn: { screen: LoggedIn_landing },
    EventView: {screen: EventPage},
    ProfileView: {screen: Profile},
    CreateFlockView: {screen: CreateFlock},
    AttendeeList: {screen: AttendeeListPage},
    Friends: {screen: Friends},
    Map: {screen: Map}
  });



  AppRegistry.registerComponent('flock', () => flock);
