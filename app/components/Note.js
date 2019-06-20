import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";


export default class Note extends Component {
  
        state = {
            checked: false
        }
    
  render() {

  
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.date}</Text>

        <CheckBox title={this.props.val.note} 
                  checked={this.state.checked}
                  onIconPress={() => this.setState({checked: !false})}
                  />

        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.noteDelete}
        >
          <Text style={styles.noteDeleteText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: "relative",
    backgroundColor: "white",
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  noteText: {
    color: '#6a11cb',
    borderLeftWidth: 10,
    borderLeftColor: "#E91E63",
  },
  noteDelete: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    color: 'red',
    padding: 15,
    margin: 40,
    right: 2,

  },
  noteDeleteText: {
    color: "white",

  }
});
