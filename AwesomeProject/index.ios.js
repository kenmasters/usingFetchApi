/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

class AwesomeProject extends Component {

  // Lifecycle methods
  constructor(props) {
    super(props);
    this.state = {
      usersJSON: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoading: true
    };

    this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.fetchJsonData = this.fetchJsonData.bind(this);
  }

  componentDidMount() {
    this.fetchJsonData();
  }

  render() {
    if(this.state.isLoading) {
      return this.renderLoadingMessage()
    }else {
      return this.renderResults()
    }
    
  }

  // Custom methods
  fetchJsonData() {

    console.log('Wallpapers will be fetched');
    /***/
    var url = 'http://unsplash.it/list';
    var tycodeRoot = 'https://jsonplaceholder.typicode.com';

    fetch(`${typicode}/users`)
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData);
        this.setState({
          isLoading: false,
          usersJSON: this.state.usersJSON.cloneWithRows(jsonData)
        }); //update isLoading 
      })
    
    .catch( error => console.log('Fetch error: ' + error) );
    /***/
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'} 
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Contacting jsonplaceholder</Text>
      </View>
    );
  }

 

  renderResults() {
    return (
      <ListView
      dataSource={this.state.usersJSON}
      renderRow={this.renderRow}
      />
    )
  }

  renderRow(rowData) {
    return <Text key={rowData.id}>{rowData.name}</Text>
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
