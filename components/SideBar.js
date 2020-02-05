import React, { Component } from 'react';
import {
  Text, Image, StyleSheet
} from 'react-native';

import { Content, List, ListItem, Container } from 'native-base';


import { db } from '../config';
let categoryRef = db.ref('/categories');

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      recipes: []
    };

  }

  componentDidMount() {
    categoryRef.on('value', snapshot => {
      let categories = []
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();

        console.log(childSnapshot.key);

        var a = [childSnapshot.key, childData.name, childData.icon_name];

        categories.push(a)

      });

      this.setState({ categories });
    });

  }

  render() {

    return (
      <Content style={{ backgroundColor: '#FFFFFF' }}>

        <Image
          source={require('../assets/images/Food_sidebar.jpg')}
          style={styles.sidebar_image}
        />
        <List style={styles.sidebar_list}>
        <ListItem style={styles.sidebar_listItems} onPress={() => this.props.loadAll()}>
        <Image
                source={require('../assets/images/all.png')}
                style={
                  {
                    height: 16,
                    width: 16,
                    marginRight: 10
                  }
                }
              />
        <Text style={styles.sidebar_items}>All</Text>
        </ListItem>
        </List>
      

        <List>
          {this.state.categories.map(category => (
            <ListItem style={styles.sidebar_listItems} key={category[0]} onPress={() => this.props.handler(category[1], category[0])}>

              <Image
                source={{ uri: category[2] }}
                style={
                  {
                    height: 16,
                    width: 16,
                    marginRight: 10
                  }
                }
              />

              <Text style={styles.sidebar_items}>{category[1]}</Text>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}


const styles = StyleSheet.create({
  sidebar_image: {
    height: 150,
    width: "100%",
    alignSelf: "stretch",
    position: "absolute"
  },
  sidebar_list: {
    marginTop: 150,
  },
  sidebar_listItems: {
    height: 50
  },
  sidebar_items: {
    fontSize: 20,
  }
});
