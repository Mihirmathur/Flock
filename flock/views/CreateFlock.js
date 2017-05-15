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


export default class CreateFlock extends React.Component {
  static navigationOptions = {
    title: 'Create Flock',
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={{marginTop: 10}}>Create a Flock!</Text>

      </View>
      );
    }
  }
