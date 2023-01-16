import React, { useState, useCallback, useEffect } from 'react'
import {View,Text,StyleSheet,Dimensions,Linking,Image,RefreshControl,TouchableOpacity,FlatList,ActivityIndicator,TextInput, ScrollView, Touchable} from 'react-native';
// import {globalStyle} from '../styleSheet/globalStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import { ceil } from 'react-native-reanimated';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeat from 'react-native-vector-icons/Feather';
import { Searchbar } from 'react-native-paper';
import IconFantiso from 'react-native-vector-icons/Fontisto';
// import Home from './Home';
import db from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app'
//import ImagePicker from 'react-native-image-crop-picker';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
 import moment from 'moment';
 import KeyboardSpacer from 'react-native-keyboard-spacer';
 const window = Dimensions.get("window")
const Chat =(props)=> {

  

    const [text, setText] = useState("");

 const RenderChatRow =({item})=>{
  return(
   


 
<View style={{paddingVertical:5,}}>
  {
    item.sender_id == props.userid
    ?
    <View style={{width:"50%",backgroundColor:"#11c273",top:10,bottom:10,left:"50%",padding:"2%",borderRadius:10,}}>

   
   <Text  style={{fontSize:15,padding:5 }}>
{item.last_message}
     </Text>

   <Text style={{fontSize:10,padding:5 }}>
   {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
     </Text>
   </View>
   :

   <View style={{width:"50%",backgroundColor:"#F0F9F5",padding:"2%",top:10,bottom:10,left:10,borderRadius:10,}}> 
   
   <Text  style={{fontSize:15,padding:5 }}>
{item.last_message}
     </Text>

   <Text style={{fontSize:10,padding:5 }}>
   {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
     </Text>
   </View>

//    <View style={{height:70,width:"40%",backgroundColor:"#F0F9F5",position:'absolute',padding:10,left:10,}}> 
//    <View style={{flex:1}}>
//    <Text  style={{fontSize:15,padding:5 }}>
// {item.last_message}
//      </Text>

//    <Text style={{fontSize:10,padding:5 }}>
//    {moment(item.timeStamp).format('YYYY-MM-DD HH:mm:ss')}
//      </Text>
//      </View>
//    </View>
  

 }
</View>







  )
   }
  

       
    
  
        return(
            

            <View style={{height:"100%",backgroundColor:"white",}}>

         

                <View style={{height:"5%",width:"100%",backgroundColor:"transparent"}}>

                </View>
                <View style={{height:45,width:"100%",backgroundColor:"transparent",flexDirection:"row",borderBottomColor:"lightgray",borderBottomWidth:0.3}}>
                   
                    <View style={{height:"100%",width:"30%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center",}}>    
                    <TouchableOpacity  onPress={() => props.navigation.goBack()}>
                <Iconic
                    name="arrow-back"
                    size = {25}
                    style={{left:15}}
                    color="#28A646"
                  
                    />
                    </TouchableOpacity>
                   
                        </View>
                        <View style={{height:"100%",width:"40%",backgroundColor:"transparent",justifyContent:"center"}}>
                            <View style={{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
                                <Text style={{fontSize:17,color:"black",fontWeight:"bold",alignSelf:"center"}}>
                                   Chat
                                    </Text>
                                </View>
                               
                            </View>
                            <View style={{height:"100%",width:"25%",backgroundColor:"transparent",flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                             
                              {/* <FontAwesome5
                              size={25}
                              name={"video"}
                              color={COLORS.buttonColor}
                              /> */}
                              <TouchableOpacity onPress={()=>props.dialCall()}>
                              <FontAwesome
                              name={"phone"}
                              size={25}
                             color="#28A646"
                  
                              />
                              </TouchableOpacity>
                              </View>
                            
                </View>

               <View style={{height:window.height*0.98,width:"100%",backgroundColor:"transparent",}}>
             
             
              
          <FlatList
        style={{paddingBottom:60}}
        //    refreshControl={
        //     <RefreshControl 
        //         refreshing={props.refreshing} 
        //         onRefresh={()=>props.onRefresh()}
        //         tintColor="pink"/>
        // }
        contentContainerStyle={{ flexGrow: 1 }}
                inverted={true}
                data={props.messages}
                showsVerticalScrollIndicator ={false}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item,index}) => 
              
                 <RenderChatRow item = {item}/>
            
                } 
                
                ></FlatList>
              
                  <View style={{height:window.height*0.2,width:"100%",backgroundColor:"#F0F9F5",borderTopColor:"darkgray",borderTopWidth:1,flexDirection:"row",}}>
                   <View style={{height: 45,width:"80%",backgroundColor:"transparent",justifyContent:"center",borderRadius:20,top:10,shadowColor:"gray",borderWidth:0.25,left:5 }}>
                  
                     <TextInput
                   
                  
                      placeholderTextColor={"gray"}
                      color="black"
                     style={{width:"95%",alignSelf:"center",}}
                      placeholder={"write a message"}
                      value={props.text}
                   
                      onChangeText={txt=>props.setText(txt)}
                     />
                     
                     
                     </View>
                    

                     <View style={{height:45,width:"20%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center",top:10}}>
                     <TouchableOpacity onPress={()=>props.sendMessages()} 
                     style={{height:40,width:40,backgroundColor:"#050A30",justifyContent:"center",borderColor:"#050A30",borderWidth:1,borderRadius:40/2,alignItems:"center"}}>
                     <FontAwesome
                              name={"send"}
                              size={20}
                           
                              color="white"
                              
                              />
                              </TouchableOpacity>
                     </View>
                   
                   
                 </View>
                 <KeyboardSpacer/>
 
                 </View>

                
                
                 
                
                 {
               props.progress === true ?
           <ActivityIndicator size="small" color="orange"  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"50%"}} />
           :
           <View>
               </View>
           }



                </View> 
                 
                 
               


        );

}
const styles = StyleSheet.create({
    sendingContainer: {
        backgroundColor:"transparent",
      justifyContent: 'center',
      alignItems: 'center',
     
      
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      composer:{
        
        borderRadius: 25, 
        borderWidth: 0.5,
        borderColor: 'red',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        fontSize: 16,
       
      },
      btnSend: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: "green",
        
        borderRadius: 50
      },
     
  });
    export default Chat;