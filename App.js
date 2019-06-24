import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator,FlatList, Dimensions,Image,Animated,TouchableWithoutFeedback ,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const {height,width} = Dimensions.get('window');
export default class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,  
      images:[],
      scale: new Animated.Value(1),
      isImageFocused:false
    }
    
    this.scale = {
      transform:[{scale:this.state.scale}]
    }
    this.actionBarY = this.state.scale.interpolate({
      inputRange:[0.9,1],
      outputRange:[0,-80]

    })
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
        
      });
  }
showControls = () =>{
  this.setState((state)=>({
    isImageFocused:!state.isImageFocused
  }),()=>{
    if(this.state.isImageFocused){
        Animated.spring(this.state.scale, {
          toValue:0.9,
 
        }).start()
    }else{
      Animated.spring(this.state.scale, {
        toValue:1,
      }).start()
    }
  })
}
  componentDidMount(){
    this.loadWallpapers()
    
  
  }

  renderItem = ({item}) => {
    return  (
     <View style={{ flex:1 }}>
       <View style={ styles.container}>
          <ActivityIndicator size="large" color="grey"></ActivityIndicator>
        <Text style={styles.welcome}>Loading ... Please wait {this.state.isLoading}</Text>
         </View> 
         <TouchableWithoutFeedback onPress={() => this.showControls(item)}>
       <Animated.View style={[{height,width },this.scale]}>
        <Image 
        style={{flex:1, height:null, width: null}} 
        source ={{uri:item.urls.regular}}
        resizeMode="cover"></Image>
      </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={{right:0,left:0,bottom:this.actionBarY,height:80,position:'absolute',flexDirection: 'row',justifyContent: 'space-around',backgroundColor:'black'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={0.5} onPress = {() => alert('Loading new images....')}>
          <Ionicons name="ios-refresh" size={40} color="white"> </Ionicons></TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={0.5} onPress = {() => alert('Sharing images....')}>
          <Ionicons name="ios-share" size={40} color="white"> </Ionicons></TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={0.5} onPress = {() => alert('Saving images....')}>
          <Ionicons name="ios-save" size={40} color="white"> </Ionicons></TouchableOpacity>
          </View>
      </Animated.View>
      
      </View>
    )
  }
  render() {
    return this.state.isLoading ? (
      <View style={ styles.container}>
      <ActivityIndicator size="large" color="grey"></ActivityIndicator>
    <Text style={styles.welcome}>Loading ... Please wait {this.state.isLoading}</Text>
     </View> 
    ) : <View style={styles.images}>
      <FlatList 
      scrollEnabled = {!this.state.isImageFocused}
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
    position:'absolute',
    top:0, 
    left:0,
    right:0,
    bottom:0,
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
