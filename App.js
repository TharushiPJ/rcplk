import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Drawer } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from './components/AppHeader';
// import AppBody from './appBody';
// import AppFooter from './appFooter';
import Sidebar from './components/SideBar';
import RecipesHome from './components/RecipesHome';


import { db } from './config';
let recipesRef = db.ref('/recipes');


import Recipe from './components/Recipe';

// const MainNavigator = StackNavigator({
//   Home: {screen: Recipe},
// });



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    this.loadAll = this.loadAll.bind(this)
    this.state = {
      isReady: false,
      recipes: [],
      title: '',
    };
  }


  getRecipesByCategory(catId) {
    recipesRef
      .orderByChild('category')
      .equalTo(catId)
      .on('value', snapshot => {
        let recipes = []
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          var a = [childSnapshot.key, childData.name, childData.category, childData.desc, childData.image, childData.url];
          recipes.push(a);
        });
        this.setState({ recipes });
      });
  }

  getAllRecipes() {
    recipesRef
      .on('value', snapshot => {
        let recipes = []
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          var a = [childSnapshot.key, childData.name, childData.category, childData.desc, childData.image, childData.url];
          recipes.push(a);
        });
        this.setState({ recipes });
      });
  }

  handler(title, id) {
    this.getRecipesByCategory(id)
    this.setState({ title: title })
    this.closeDrawer();
  }

  loadAll(){
    this.getAllRecipes();
    this.setState({ title: "All Recipes" })
    this.closeDrawer();
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

    this.getAllRecipes();
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (

      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar handler={this.handler} loadAll = {this.loadAll}/>}
        onClose={() => this.closeDrawer()} >

        <AppHeader title={this.state.title}
          openDrawer={this.openDrawer.bind(this)}
        />
        {
         
          <RecipesHome recipes={this.state.recipes}></RecipesHome>
          // <Recipe></Recipe>
        }        
      </Drawer>
    );
  }
}

