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

export default class LoggedIn_landing extends React.Component {
    static navigationOptions = {
        title: 'Flocks Near You',
    };
    render() {
      const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            <Text style={{marginTop: 10}}>Join a flock!</Text>
  
<ScrollView>

<Card title='Event 1'>
    <Text style={{marginBottom: 10}}>
      Will map the events with cards here. 
      We can put an image of the poster and the event description here. 
    </Text>
  <Button backgroundColor='#03A9F4' 
   buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
  title='Join this Flock!' 
  onPress={()=>navigate('MapView')}
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
