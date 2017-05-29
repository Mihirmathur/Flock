import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  navBar:{
    flex: 1, 
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    backgroundColor: "#F4EEF0"
  },
  menuButton: {
    borderRadius: 0, 
    fontSize: 10,
    width: 140,
    height: 50
  },
  scrollContainer:{
    height: 280
  },

  mapFullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pad: {
    padding: 30
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  eventContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    height: 300,
    width: 300,
  },
  mapFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  eventTitle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
  },
  eventParticipants: {
    width: 350,
    backgroundColor: 'red', 
  },
});