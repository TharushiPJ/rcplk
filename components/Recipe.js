import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, FlatList, View, WebView
} from 'react-native';

import { Content, List, ListItem, Container } from 'native-base';

import { db } from '../config';

export default class Recipe extends Component {


  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  componentDidMount() {
   
  }

  render() {


    return (
     
      <View style={styles.container}>
        <WebView
          scalesPageToFit={true}
          source={{uri: 'https://github.com/facebook/react-native'}}
        /> 
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});