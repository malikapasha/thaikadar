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
      islogin:false,
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
    
      guest: true,
  

      mcount: '0',
      uservalue:{},
    
    };
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {

 
      
    });

    

  }




getaddressdata = async () => 
     {
      try
      {
        console.log('Called address again')
      // const value = await AsyncStorage.getItem('language');
      const address = await AsyncStorage.getItem('address');
       let parseaddress = JSON.parse(address)
      console.log('add: ',parseaddress)
      if (parseaddress !== null) {

           console.log('add: ',parseaddress.category)

        if(parseaddress.category === 'Home' || parseaddress.category === 'Office' || parseaddress.category === 'Others')
        {
          console.log('Choose Location')
            this.setState({placeStatus:parseaddress.category});
              this.setState({
          address: parseaddress.title,
        });

        }
        else
        {
          this.setState({placeStatus:'Current Location'})
            console.log('Current Location')
              this.setState({
           address: address.replace(/['"]+/g, ''),
        });
        }
      
      } else {
        this.setState({
          address: 'Choose Location Here',
        });
      }

      // if (value !== null) {
      //   this.setState({lang: value});
      // } else {
      //   await AsyncStorage.setItem('language', 'En');
      // }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
   
    
     
    return (
      <View style={{height:50,width:"100%",backgroundColor:"pink"}}>
        

        <View
          style={{
            
            width: '100%',
            height: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: "white",
            borderBottomColor:COLORS.lightGray,
       
           
            
          }}>
          {this.props.isbank? 
            <TouchableOpacity
            style={  
              Platform.OS === "android" ?{ 
                marginLeft:20,
                borderRadius:10,
                shadowOffset:{   width: 11,
                  marginLeft:50,
                  height: 8},shadowOpacity:1,elevation:10, shadowColor: 'gray',
                height: 35,
              width: 35, 
              justifyContent: 'center',
              backgroundColor:"white"}:{  
                shadowOffset:{   width: 11,
                  height: 8},shadowOpacity:0.1,elevation:0.01, shadowColor: 'gray',
               opacity:10,
                height: 35,
              width: 35, 
              borderRadius:10,
              marginLeft:20,
              justifyContent: 'center',
              backgroundColor:"white"}

             }
                onPress={() =>
                  Linking.openURL("https://thaikadar.com/secureinvestment/blog/")
                  }
          >
           
          
              
                         <Image
                         
       source = {images.mainlogo}
    style={{alignSelf:"flex-end",height:35,width:35
}}  />

                                                  
                       
          </TouchableOpacity>
          :

       
           <TouchableOpacity
            style={
              { height: "100%",
              width: 80, 
              justifyContent: 'center',
              backgroundColor:"transparent",
               borderRadius:15}
           }
            onPress={() => {
            
            }}>
            <View style={
         Platform.OS === "android" ?
         {height:50,width:50,justifyContent:"center",
         marginLeft:20,
         shadowColor: 'gray',
         shadowOffset: {
           width: 11,
           height: 8
         },
         borderRadius:10,
         shadowRadius: 1,
         shadowOpacity: 0.01,
         elevation: 10,
         backgroundColor:'white'} :
         {height:50,width:50,justifyContent:"center",
         shadowColor: '#gray',
         marginLeft:20,
         borderRadius:10,
         shadowOffset: {
           width: 11,
           height: 8,
         },
      
         shadowOpacity: 0.03,
         elevation: 0.01,
         backgroundColor:'white'}
         }>
          
              
                         <Image
       source = {images.hamburger}
    style={{alignSelf:"flex-end",height:50,width:50,marginLeft:50
}}
    
     />

                                                  
                        </View>
          </TouchableOpacity>

   }

{/* //here */}



  <TouchableOpacity style={{height:"100%",width:"62%",backgroundColor:"transparent",
       justifyContent:'center',
       padding:10,borderWidth:1,
       position:'absolute',
       right:0,
          
            flexDirection:'row',
            display:'none',
       
              borderRadius:15,borderColor:'black',
            }}
             onPress={() => {
                               console.log("state is "+this.props.islogin)
                              if (!this.props.islogin) {
                                Alert.alert('Thaikadar.com', 'Login to Continue',[
        {
          text: 'Login',
          onPress: () => {
              this.props.navigation.navigate("AuthStack")
            console.log('Yes Pressed')
            }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('No Pressed'), style: 'cancel'
        },
      ],
      {cancelable: false},)
                                console.log('Guest');
                                return;
                              } else {
                                console.log('done');
                                this.props.navigation.navigate('MyAddresses');
                              }
                            }}
            >
           
              <Image
       source = {images.foodwalamarker}
    style={{alignSelf:"flex-start",height:27,width:26,marginLeft:5,}}
     />


            <View style={{height:"100%",width:"75%",backgroundColor:"transparent",
        alignContent:'center',
        alignItems:'center',
       justifyContent:'center',
         
       
            }}>

              

                        <View style={{marginTop:16,height:"50%",width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
                            <TouchableOpacity>
                            <Text style={{color:'black',fontWeight:"bold",height:40,marginBottom:14,fontFamily:'Poppins-Regular'}}>
                               {this.state.placeStatus}
                              
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:"50%",width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
                            <TouchableOpacity
                             onPress={() => {
                               console.log("state is "+this.props.islogin)
                              if (!this.props.islogin) {
                                Alert.alert('Thaikadar.com', 'Login to Continue',[
        {
          text: 'Login',
          onPress: () => {
              this.props.navigation.navigate("AuthStack")
            console.log('Yes Pressed')
            }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('No Pressed'), style: 'cancel'
        },
      ],
      {cancelable: false},)
                                console.log('Guest');
                                return;
                              } else {
                                console.log('done');
                                this.props.navigation.navigate('MyAddresses');
                              }
                            }}
                            
                            
                            >
                              <TouchableOpacity  onPress ={() => 
                              {
                                   console.log("state is "+this.props.islogin)
                              if (!this.props.islogin) {
                               Alert.alert('Thaikadar.com', 'Login to Continue',[
        {
          text: 'Login',
          onPress: () => {
              this.props.navigation.navigate("AuthStack")
            console.log('Yes Pressed')
            }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('No Pressed'), style: 'cancel'
        },
      ],
      {cancelable: false},)
                                console.log('Guest');
                                return;
                              } 
                              
                              else {
                                console.log('done');
                                this.props.navigation.navigate('MyAddresses');
                              }
                            }
                              } >
                         <Text  numberOfLines={1} style={{color:'#8D8D8D',fontSize:10,marginBottom:5,height:40,fontFamily:'Poppins-Regular'}}>
                               
                         {this.state.address}
                        
                                </Text>
                                </TouchableOpacity>
                              
                                </TouchableOpacity>
                            
                            </View>
                          
            
          </View>

            <Image
       source = {images.smalldown}
    style={{alignSelf:"flex-start",height:26,width:26,
}}
    
     />
          </TouchableOpacity>

          <View style={{height:"100%",width:70,
          position:'absolute',
          right:0,
    
        shadowColor: 'gray',
        shadowOffset: {
          width: 0,
          height: 1
        },
       elevation:5,
        shadowOpacity: 0.1,
          flexDirection:"row",justifyContent:"space-evenly",
          alignItems:"center"}}>
                           
                           
                      

{this.props.isbank? null :

                                                       <TouchableOpacity
                                                      onPress={() => 
                                                      
                                                       {
                              if (!this.props.islogin) {

                                console.log(this.props.islogin+" ");

                               Alert.alert('Thaikadar.com', 'Login to Continue',[
        {
          text: 'Login',
          onPress: () => {
              this.props.navigation.navigate("AuthStack")
            console.log('Yes Pressed')
            }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('No Pressed'), style: 'cancel'
        },
      ],
      {cancelable: false},)
                                console.log('Guest');
                                return;
                              } else {
                                console.log('done');
                              
                                this.props.navigation.navigate('MyDetail',{StoreStatus:'0',title:'FoodWala',orderStatus:"0"})
                             
                             
                              }
                            }
                             
                                                  }
                                                        >

                                                         
{this.props.islogin && this.props.screentitle !== "My Profile" ?
    <Image
    source ={{uri:this.props.uservalue.image_path}}
  style={{height:50,width:50,
  borderColor:'black',
  borderRadius:15,borderWidth:0.1,elevation:5,alignSelf:"flex-end",}}
  />
                                     
                    :
                    this.props.screentitle !== "My Profile" ?
                    <Image
                    source = {images.profieicon}
                   
                 style={{alignSelf:"flex-end",height:34,width:34,marginRight:15,}}
                 
                  />
                  :
                  null
}
                                   
                                                       </TouchableOpacity>
  }
                                </View>
                            
        </View>
        
        <Text style={{color:'#2E3333',height:'100%',
 fontFamily:'Poppins-Regular',
 position:'absolute',

bottom:0,
top:10,
 alignContent:'center',
 alignSelf:"center",
 fontSize:18,
 fontWeight:'600',
 textAlign:'center'}}>
 
   
                               {this.props.screentitle}
                              
                                </Text>

      </View>
    );
  }
}
