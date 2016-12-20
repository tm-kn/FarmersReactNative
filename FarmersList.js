import React, { Component } from 'react'
import { Animated, AppRegistry, ActivityIndicator, ListView,
          ScrollView, StyleSheet, Text,
          TouchableHighlight, View } from 'react-native'

const API_URL = 'http://10.0.1.31:8000/'

export default class FarmersList extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  animatedValue = new Animated.Value(0);

  constructor(props) {
   super(props);
   this.state = {
     loading: true,
     error: false,
     fadeAnim: new Animated.Value(0),
     farmers: []
   };
 }

  componentWillMount() {
    this.getFarmers();
  }

  render() {
    if(this.state.loading) {
        return(
          <View style={styles.centerView}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    if(this.state.error) {
      return(
        <View style={styles.centerView}>
          <Text>Error</Text>
        </View>
      );
    }

    return(
      <Animated.View
        style={{
          opacity: this.state.fadeAnim,
          transform: [{
            translateY: this.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0]
            }),
          }],
        }}>
        <ScrollView>
          <ListView
            dataSource={this.state.farmers}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </Animated.View>
    );

  }

  renderRow = (farmer) => {
    return(
      <TouchableHighlight onPress={() => this.goToDetailPage(farmer)}>
        <View style={styles.farmerRow}>
          <Text style={styles.farmerName}>{farmer.first_name} {farmer.surname}</Text>
          <Text>{farmer.town}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  async getFarmers() {
    try {
      let response = await fetch(API_URL + 'farmers/');
      let responseJson = await response.json();

      this.setState({ loading: false, farmers: this.ds.cloneWithRows(responseJson) });

      this.animate();
    } catch(error) {
      console.error(error);
      this.setState({ loading: false, error: true });
    }
  }

  animate = () => {
    this.state.fadeAnim.setValue(0);

    Animated.timing(
       this.state.fadeAnim,
       {toValue: 1}
     ).start();
  }

  goToDetailPage = (farmer) => {
    this.props.navigator.push({
      index: 1,
      passProps: {
        farmer: farmer
      },
    });
  }
}

const styles = StyleSheet.create({
  farmerRow: {
    flex: 1,
    flexDirection: 'column',
  },
  farmerName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  centerView: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  }
});

AppRegistry.registerComponent('FarmersList', () => FarmersList);
