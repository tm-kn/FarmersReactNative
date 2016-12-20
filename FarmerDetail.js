import React, { Component } from 'react'
import { AppRegistry, Text, TouchableHighlight, View } from 'react-native'

export default class FarmerDetail extends Component {
  render() {
    return(
      <View>
        <Text>Detail page</Text>
        <Text>{this.props.rowData.first_name}  {this.props.rowData.surname}</Text>
        <Text onPress={() => {this.props.navigator.pop();}}>Back</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('FarmerDetail', () => FarmerDetail);
