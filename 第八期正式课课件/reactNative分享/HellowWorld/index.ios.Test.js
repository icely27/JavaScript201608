/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var ImgText=require('./ImgTest.js');//通过require来引入我们自定义的组件

class HellowWorld extends Component {
  render() {//render来渲染出你的UI界面
    return (
      <View style={styles.container}>
          <ImgText name="这是图片1"/>
          <ImgText name="这是图片2"/>
          <ImgText name="这是图片3"/>
          <ImgText name="这是图片4"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('HellowWorld', () => HellowWorld);
