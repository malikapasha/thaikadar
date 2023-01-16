import React, { Component } from 'react';

import { WebView } from 'react-native-webview';
import {View,Text,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Dimensions} from 'react-native';
import {globalStyle} from '../stylesheet/globalStyle';
import { Button,Icon } from 'react-native-elements/';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
// ...
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class Web extends Component {
  constructor(props){  
    super(props);  
    this.state = {  
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        url:""

      }  
   
  }  
  componentDidMount() {
        console.log("WebView",this.props.route.params.urlItems)
        this.setState({
          url:this.props.route.params.urlItems
        })

       }
     
 

  

  render() {

    return (

      <View style={{flex:1,width:"100%",backgroundColor:"transparent"}}>   
      <View style={{height:"3%"}}>
        </View>
      <View style={{height:"7%",width:"100%",backgroundColor:"transparent",flexDirection:"row",borderBottomWidth:0.5,borderBottomColor:"gray"}}>
                <View style={{height:"100%",width:"15%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>    
                    <TouchableOpacity>
                <Iconic
                    name="arrow-back"
                    size = {20}
                    style={{alignSelf:"center"}}
                    color={"green"}
                    onPress={() => this.props.navigation.goBack()}
                    />
                    </TouchableOpacity>
                    </View>
                     <View style={{height:"100%",width:"65%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>  
                     <Text style={{fontWeight:"bold",color:"black",fontSize:17}}>
                           Thaikadar.com
                         </Text>  
                    </View>
                    <View style={{height:"100%",width:"20%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>  
                   
                    <View style={{height:25,width:25,backgroundColor:"transparent",alignSelf:"center",borderLeftColor:"gray",flexDirection:"row",justifyContent:"center",}}>
                                              

                                                   </View>
                    </View>
                   
                </View>
                <View style={{height:"90%",width:"100%"}}>
      <WebView source={{ uri: this.state.url}} />
      </View>
        </View>
        
    )
    
  }
}
export default Web;