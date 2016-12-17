import React, { Component } from 'react'
import { AppRegistry, ListView, Text, View } from 'react-native'

const API_URL = 'http://10.0.1.31:8000/'

export default class FarmersList extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  constructor(props) {
   super(props);
   this.state = {
     loading: true,
     error: false,
     farmers: []
   };
 }

  componentWillMount() {
    this.getFarmers();
  }

  render() {

    if(this.state.loading) {
        return(
          <View>
            <Text>Loading</Text>
          </View>
        );
    }

    if(this.state.error) {
      return(
        <View>
          <Text>Error</Text>
        </View>
      );
    }

    return(
      <ListView
        dataSource={this.state.farmers}
        renderRow={this.renderRow}
      />
    );

  }

  renderRow = (rowData) => {
    return(
      <View>
        <Text>{rowData.first_name}</Text>
        <Text>{rowData.surname}</Text>
        <Text>{rowData.town}</Text>
      </View>
    );
  }

  async getFarmers() {
    try {
      let response = await fetch(API_URL + 'farmers/');
      let responseJson = await response.json();
      this.setState({ loading: false, farmers: this.ds.cloneWithRows(responseJson) });
    } catch(error) {
      console.error(error);
      this.setState({ loading: false, error: true });
    }
  }
}

AppRegistry.registerComponent('FarmersList', () => FarmersList);
