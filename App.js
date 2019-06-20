import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator,FlatList, Dimensions,Image } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const {height,width} = Dimensions.get('window');
export default class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoading:true,  
      images:[]
  
    }
    
  }

  loadWallpapers = () => {
  return fetch('https://api.unsplash.com/photos/random?count=30&client_id=c06b52a54b8f3a5fd94e8510a8801f651d3e48a406749ab666961022db3cd970')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          images: responseJson,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount(){
    this.loadWallpapers()
    
  
  }

  renderItem = ({item}) => {
    return  (
      <View style={{height,width }}>
        <Image 
        style={{flex:1, height:null, width: null}} 
        source ={{uri:item.urls.regular}}
        resizeMode="cover"></Image>
      </View>
    )
  }
  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
       <ActivityIndicator size="large" color="grey"></ActivityIndicator>
        <Text style={styles.welcome}>Loading ... Please wait {this.state.isLoading}</Text>
      </View>
    ) : <View style={styles.images}>
      <FlatList 
      horizontal 
      pagingEnabled 
      data={this.state.images}
      renderItem={this.renderItem}
      keyExtractor = { item => item.id }  />     
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'white',
    paddingTop:10
  },
  images: {
    flex: 1,
    color: '#333333',
    backgroundColor: 'white',
  },
});
