import React, { Component } from 'react'
import { AppRegistry, View, Text, ScrollView } from 'react-native'


import FarmersList from './FarmersList'

export default class FarmersReactNative extends Component {
  render() {
    return(
      <View>
        <ScrollView>
          <FarmersList />
        </ScrollView>
      </View>
    );
  }

}

AppRegistry.registerComponent('FarmersReactNative', () => FarmersReactNative);
