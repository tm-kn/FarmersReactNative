import React, { Component } from 'react'
import { AppRegistry, Navigator, View, Text, ScrollView } from 'react-native'


import FarmersList from './FarmersList'
import FarmerDetail from './FarmerDetail'

export default class FarmersReactNative extends Component {
  render() {
    return(
      <Navigator
        initialRoute={{index: 0}}
        renderScene={(route, navigator) => {
          if(route.index == 0) {
            return(
              <FarmersList navigator={navigator} {...route.passProps} />
            );
          }

          if(route.index == 1) {
            return (
              <FarmerDetail navigator={navigator} {...route.passProps} />
            );
          }
        }}
      />
    );
  }

}

AppRegistry.registerComponent('FarmersReactNative', () => FarmersReactNative);
