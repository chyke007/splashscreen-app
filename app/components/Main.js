import React, {Component} from 'react';
//import LinearGradient from 'react-native-linear-gradient';
import Note from './Note'
import {
        StyleSheet, 
        Text, 
        View, 
        TextInput, 
        ScrollView, 
        TouchableOpacity,
        KeyboardAvoidingView
    } from 'react-native';


export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            noteArray: [],
            noteText: '',
            checked: false
        }
    }

  render() {
      let notes = this.state.noteArray.map((val, key) => {
          return <Note key={key} keyval={key} val={val}
          deleteMethod={() => this.deleteNote(key)}/>
      })


    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}> 
                    What are you doing today?

            </Text>
        </View>
       

        <ScrollView style={styles.scrollContainer}>
             {notes}
        </ScrollView>
        <KeyboardAvoidingView style={styles.footer}>

        <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='Start Typing'
            placeholderTextColor='white'>
        </TextInput>
        
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
       
      </View>
    );
  }


  addNote(){
      if(this.state.noteText){

          var d = new Date();
          this.state.noteArray.push({
              'date': (d.getHours() -12) + ":" + d.getMinutes(),
              'note': this.state.noteText
          })
          this.setState({ noteArray: this.state.noteArray})
          this.setState({ noteText: ''})
      }
  }


  deleteNote(key){
      this.state.noteArray.splice(key, 1)
      this.setState({ noteArray: this.state.noteArray})
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 10,
      borderBottomColor: 'blue',
  },
  headerText: {
      color: 'white',
      fontSize: 23,
      padding: 30,
      margin: 10
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 40,
      backgroundColor: '#252525',
      borderTopWidth:2,
      borderTopColor: '#ededed',
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right:20,
      bottom: 70,
      backgroundColor: 'blue',
      width: 70,
      height: 70,
      borderRadius:50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24,
  }
});
