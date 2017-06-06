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
    paddingBottom: 60,
    justifyContent: 'center',
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
    height: 400,
    backgroundColor: "white"
  },
  card:{
    borderWidth: 1,
    borderRadius: 5,
    margin: 12,
    padding: 20,
    shadowColor: "#F4EEF0",
    shadowOpacity: .8,
    shadowRadius: 5,
    borderColor: "#E4E1E2",
    backgroundColor: "white"
  },
  createCard:{
    flex: 1,
    borderWidth: 1,
    borderRadius:2,
    margin: 8,
    padding: 20,
    marginBottom:10,
    shadowColor: "#F4EEF0",
    shadowOpacity: .8,
    shadowRadius: 5,
    borderColor: "#E4E1E2",
    backgroundColor: "white"
  },
  cardCenter:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    flex: 1,
    shadowColor: "#F4EEF0",
    shadowOpacity: .8,
    shadowRadius: 5,
    borderColor: "#E4E1E2",
    backgroundColor: "white",
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: "center",
    alignItems: 'center',
  },
  row:{
    flex: 1, 
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title:{
    fontSize: 16,
    fontFamily: 'Avenir-Medium'
  },
  titleCenter:{
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    textAlign: "center"
  },
  description:{
    fontSize: 12,
    marginTop:2,
    marginBottom:2,
    fontFamily: 'Avenir-Light'
  },
  button:{
    backgroundColor:'#03A9F4',
    borderRadius: 20,
    width: 160,
    fontSize: 12,
    marginTop:2,
    marginBottom:2,
    fontFamily: 'Avenir-Light'
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
    margin: 10
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