import React, { Component } from 'react';
import { Grid, Row, Button, FormLabel, FormInput, FormValidationMessage, Card, ListItem } from 'react-native-elements';

import {
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


export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={{marginTop: 10}}>Name of User</Text>

      </View>
      );
    }
  }
