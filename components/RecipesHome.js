import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  WebView
} from 'react-native';

import {
  Content,
  List,
  ListItem,
  Container,
  Button
} from 'native-base';

import { db } from '../config';





export default class RecipesHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // refreshing: false,
      loading: true,
      recipes: [],
      modalVisible: false,
    };

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
   
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    if (!this.state.loading) {
      // this.getAllRecipes();
      this.setState({ refreshing: false });
    }
  }

  getRecipePage(demo){
    alert(demo);
  }

  render() {
    // console.log(this.props.recipes)
    return (

      <ScrollView

      // refreshControl={
      //   <RefreshControl
      //     refreshing={this.state.refreshing}
      //     onRefresh={this.onRefresh}
      //   />
      // }
      >

            

        <Content style={{ backgroundColor: '#FFFFFF' }}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize:20}}>back</Text>
              </TouchableHighlight>
              
    
            </View>
            
          </View>
        </Modal>

          <FlatList
            data={this.props.recipes}

            renderItem={({ item }) => (
              <Content>
                <TouchableOpacity onPress={() =>  this.setModalVisible(true)}>
                <View style={{ flex: 1, flexDirection: 'column', margin: 2, backgroundColor: '#f0f7fa', borderRadius: 10 }}>
                  <Image style={styles.imageThumbnail} source={{ uri: item[4] }} />
                  <Text style={styles.recipeNameText}>{item[1]}</Text>
                </View>
                </TouchableOpacity >
              </Content>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
          />

        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  recipeNameText: {
    fontSize: 16,
    color: '#000000',
    width: '100%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  container: {
    flex: 1,
  },
});