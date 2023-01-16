import React ,{useState,Component} from 'react';
import {View,Text,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {globalStyle} from '../styleSheet/globalStyle';
import { icons, images, SIZES, COLORS, FONTS } from '../constant'
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import {Input, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import IconsEnt from 'react-native-vector-icons/dist/Entypo';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
export default class Map extends React.Component{
   
     render(){
         return (    
           
           <View style={{height:"100%",width:"100%",backgroundColor:"transparent"}}> 
           <View style={{height:"5%"}}>
             </View>
           <View style={{height:40,width:"100%",backgroundColor:"pink"}}>
           <View style={{height:40,width:"100%",backgroundColor:"#fffafa",borderColor:COLORS.darkgray,borderRadius:5,flexDirection:"row",borderBottomColor:COLORS.GrayColor,borderBottomWidth:0.4}}>
    <View style={{height:"100%",width:35,backgroundColor:"transparent",justifyContent:"center",}}>    
    <TouchableOpacity  onPress={() => this.props.navigation.goBack()} >
   <Iconic
      name="arrow-back"
      size = {20}
      style={{alignSelf:"center"}}
      color={COLORS.buttonColor}
     />
     </TouchableOpacity>
     </View>

      <View style={{height:"80%",width:"76%",backgroundColor:"transparent",alignSelf:"center",justifyContent:"center"}}>
      
       <Text style={{fontWeight:"bold"}}>
         Select location
         </Text>
          </View>
          <View style={{height:"80%",width:"85%",backgroundColor:"transparent",alignSelf:"center",justifyContent:"center"}}>
          <View style={{height:"100%",width:35,backgroundColor:"transparent",justifyContent:"center",}}>    
   <Icons
      name="search1"
      size = {20}
      style={{alignSelf:"center"}}
      color={COLORS.buttonColor}
     />
     </View>

          </View>

         
</View>
             </View>
           <View style={{height:"88%",justifyContent:"center"}}>
             
            <MapView
            provider ={PROVIDER_GOOGLE}
           style={{height:"100%"}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
      
      coordinate={{ latitude: 37.78825,longitude: -122.4324,}}
     title={"Pakistan"}
      description={"i love my country."}
    />
            </MapView>
            <View style={{height:0,width:0,backgroundColor:"red",alignSelf:"center",marginLeft:"70%",justifyContent:"center",position:"absolute",left:"5%",top:"75%"}}>
                <TouchableOpacity>
                <View style={{height:50,width:50,backgroundColor:"#fffafa",alignSelf:"flex-end",borderRadius:50/2,justifyContent:"center"}}>
                  
                <View style={{height:"100%",width:35,backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>    
                      <IconsEnt
                      name="direction"
                      size = {20}
                      style={{alignSelf:"center"}}
                      color={COLORS.buttonColor}
                      />
                    </View>
                  </View>
                  </TouchableOpacity>

                </View>
            
           
              
                <View style={{height:50,width:285,backgroundColor:"transparent",position:"absolute",alignSelf:"center",top:"89%"}}>
            <View style={{height:"100%",backgroundColor:"transparent",justifyContent:"flex-end"}}>
                      
                      <View style={{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
                                <Button
                                    titleStyle={{
                                    color: "white",
                                    fontWeight:"bold",
                                    fontSize: 15,
                                     }}
                                     buttonStyle={{
                                      backgroundColor :COLORS.buttonColor,
                                      height: 45,
                                      width: 280,
                                      alignSelf:"center",
                                      borderRadius:15  
                                       }}
                                  // onPress={() => navigation.navigate('Home')}
                                 title="Confirm"
                                 />    
                                 </View>  
                      
                                    </View>
              </View>
                
              
              
              
            </View>
           
            </View>
            
            
            ); 
         }
        }
        const styles = StyleSheet.create({
          input: {
            height: "100%",
           width:"100%"
            
          },
        });