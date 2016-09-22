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
    Image,
    ListView,
} from 'react-native';
/*var MOCKED_MOVIES_DATA = [//模拟的假数据
 {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
 ];*/
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class HellowWorld extends Component {
    constructor(props){
        super(props);   //这一句不能省略，照抄即可
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded:false,
        }
        this.fetchData=this.fetchData.bind(this);
    }
    componentDidMount(){//组件加载完成后,想获取真正的数据
        this.fetchData();

    }
    fetchData(){
        fetch(REQUEST_URL)//api地址
            .then((response)=>response.json())//响应的数据类型为JSON格式
            .then((data)=>{//拿到数据
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data.movies),
                    loaded:true,
                })
            })
    }
    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Text>图片正在加载中....</Text>
            </View>
        )
    }
    renderMovie(movie){
        return (
            <View style={styles.container}>
                <Image
                    source={{uri:movie.posters.thumbnail}}
                    style={styles.thumbnail}
                    />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        )
    }
    render() {//render来渲染出你的UI界面
        if(!this.state.loaded){//当没有数据的时候,显示一个数据的提示
            return this.renderLoadingView();
        }
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection:'row',
        paddingLeft:10,
        justifyContent: 'center',
        alignItems:'center',
    },
    thumbnail:{
        width:53,
        height:81,
        marginRight:10,
    },
    rightContainer:{
        flex:1,
    },
    title:{
        fontSize:20,
        marginBottom:8,
        textAlign:'center',
    },
    year:{
        textAlign: 'center',
    }


});

AppRegistry.registerComponent('HellowWorld', () => HellowWorld);
