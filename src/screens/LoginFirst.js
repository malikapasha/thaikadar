import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  Button,
  Image,
  Picker,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ImageStore,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  images, SIZES, COLORS, FONTS } from '../constant'
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import IconFeat from 'react-native-vector-icons/dist/Feather';

const color = '#FC9000';


export default class TopBar extends Component {
  static navigationOptions = {header: null};

  constructor(props) {

    
    super(props);

    this.state = {
   
      isloading: true,
      dataSource: [],
      islogin:true,
      isback:false,
      isprofile:true,
      language: 'En',
      day: '',
      modalVisible: false,
      value: 'malik',
      eng: true,
      Switch: true,
      Delivery: false,
      lang: 'En',
      color: 'white',
      address: '',
      guest: true,
      placeStatus:'',

      mcount: '0',
    };
  }

 

 

  render() {
   

     
    return (
      <View style={{height:"100%",width:"100%",backgroundColor:"transparent"}}>
      <View style={{height:"10%",width:"100%",backgroundColor:"transparent"}}>
  </View>
  <View style={{height:150,width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
     <View style={{height:120,width:120,alignSelf:"center",justifyContent:"center"}}>
         <Image 
         source={images.moreinfo}
         style={{height:220,width:120,alignSelf:"center"}}
         
         >
             </Image>
         </View>
     </View>
     <View style={{height:50,width:"100%",backgroundColor:"transparent",justifyContent:"center",marginTop:40}}>
         <Text style={{alignSelf:"center",fontFamily:COLORS.myfont,color:COLORS.black,fontWeight:"300",
         fontSize:11,margin:5,textAlign:'center'}}>
   Hey there! Plenty of options to explore into.{"\n"} Join Thaikadar.com Now.
      
             </Text>
         </View>
         <View style={{ height: 50, width: '100%',marginTop:10,justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: COLORS.buttonColor, 
      width: '70%', height: '100%', alignContent: 'center', justifyContent: 'center' }} onPress={() => {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'AuthStack'},
              // {
              //   name: 'Profile',
              //   params: { user: 'jane' },
              // },
            ],
          })
        );

       }}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont, }}>
    
Get Started Now
            
    
  
</Text>
    </TouchableOpacity>



</View>

         <View style={{height:30,width:"100%",backgroundColor:"transparent",justifyContent:"center",flexDirection:"row"}}>
             <View style={{height:"100%",width:300,backgroundColor:"transparent",justifyContent:"center"}}>
  
         {/* <Text style={{color:COLORS.black,fontSize:17,textAlign:"center"}}>
         Are you Hungry? Let’s find the perfect meal
             </Text> */}
             </View>
         </View>
      </View>
    );
  }
}
