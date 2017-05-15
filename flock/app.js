import React, { Component } from 'react';
import {Grid, Row, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {
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
import Maps from './views/maps'
import Profile from './views/Profile'
import CreateFlock from './views/CreateFlock'

//Home Screen
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
    email: 'defaultemail@gmail.com', 
    password: 'defaultpw', 
    firstname : 'Mihir', 
    lastname: 'Default'  };
  }

  static navigationOptions = {
    title: 'Flock'
  };

  render() {
    const { navigate } = this.props.navigation;
    var _this = this;
    return (
      <View style={styles.container}>

      <Text>Hello!</Text>

      <FBLogin style={{ marginBottom: 10, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />

      <FormLabel >Email</FormLabel>
      <FormInput onChangeText={(email) => this.setState({email})} ref='forminput' textInputRef='email' autoCapitalize='none'/>

      <FormLabel>Password</FormLabel>
      <FormInput onChangeText={(password) => this.setState({password})} autoCapitalize='none'/>

      <FormLabel>First Name</FormLabel>
      <FormInput onChangeText={(firstname) => this.setState({firstname})}/>

      <FormLabel>Last Name</FormLabel>
      <FormInput  onChangeText={(lastname) => this.setState({lastname})}/>

      <Button style={styles.pad} onPress={() => {
        fetch('https://flock-site-api.herokuapp.com/signup', {
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
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
        navigate('LoggedIn');
      }} title="SignUp" />

      <Button style={styles.pad} onPress={() => {
        fetch('https://flock-site-api.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: this.state.email,
            Password: this.state.password
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.token);
          if(responseJson.status == "success") {
            try {
              console.log("Saving token")
              AsyncStorage.setItem('token', responseJson.token);
            } catch (error) {
              console.log(error)
            }
          } else {
            console.log(responseJson.message)
          }
        })
        .catch((error) => {
          console.error(error);
        });
        navigate('LoggedIn');
      }} title="Login" />

      <Button style={styles.pad} onPress={() => {
        try {
          console.log("Deleting token")
          AsyncStorage.setItem('token', '');
        } catch (error) {
          console.log(error)
        }
        navigate('LoggedIn');
      }} title="Logout" />

      </View>
      );
    }
  }

  const flock = StackNavigator({
    Home: { screen: HomeScreen },
    LoggedIn: { screen: LoggedIn_landing },
    MapView: {screen: Maps},
    ProfileView: {screen: Profile},
    CreateFlockView: {screen: CreateFlock}
  });



  AppRegistry.registerComponent('flock', () => flock);
