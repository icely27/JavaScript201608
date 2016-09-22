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
    View,
    Image
} from 'react-native';

class ImgTest extends Component {
    render() {
        return (
            <Text>
                <Text>标题:{this.props.name}</Text>
                <Image
                    source={{uri:"https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"}}
                    style={styles.container}
                    />
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:193,
        height:110
    }

});
module.exports=ImgTest;


