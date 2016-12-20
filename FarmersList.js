import React, { Component } from 'react'
import { AppRegistry, ListView, ScrollView, StyleSheet, Text,
          TouchableHighlight, View } from 'react-native'

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
      <ScrollView>
        <ListView
          dataSource={this.state.farmers}
          renderRow={this.renderRow}
        />
      </ScrollView>
    );

  }

  renderRow = (rowData) => {
    return(
      <TouchableHighlight onPress={() => this._goToDetailPage(rowData)}>
        <View style={styles.farmerRow}>
          <Text style={styles.farmerName}>{rowData.first_name} {rowData.surname}</Text>
          <Text>{rowData.town}</Text>
        </View>
      </TouchableHighlight>
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

  _goToDetailPage = (rowData) => {
    console.log("Clicked on farmer " + rowData.first_name + " " + rowData.surname);
    this.props.navigator.push({
      index: 1,
      passProps: {
        rowData: rowData
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
});

AppRegistry.registerComponent('FarmersList', () => FarmersList);
