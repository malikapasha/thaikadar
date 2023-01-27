

import React ,{ useState} from 'react';
import {View,Text,StatusBar,TouchableOpacity,ImageBackground,Image,FlatList,TextInput,StyleSheet,Dimensions, ScrollView,Alert,Platform,
  ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements/';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/AntDesign'
import AsyncStorage from '@react-native-community/async-storage';
import Iconico from 'react-native-vector-icons/dist/Ionicons'
import IconFeat from 'react-native-vector-icons/dist/Feather';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import CountryPicker from "react-native-region-country-picker";
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { styles } from "../../Auth/SignUpScreen/SignUpScreenStyle";
import { color } from 'react-native-elements/dist/helpers';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {  images, SIZES, COLORS, FONTS } from '../../../constant'
const window = Dimensions.get('window');
const height = window.height
const width = window.width
export default class  OtpSocial extends React.Component {
    constructor(props){  
        super(props);  
        this.state = {  
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            isFave :'false',
            longitude: 0,
            latitude: 0,
            position: {
                "longitude": 0,
                "latitude": 0,

            },
            region: {
                
                latitude: 34.663949,
                longitude: 3.248348,
                latitudeDelta: 6,
                longitudeDelta: 6,
            },
         address:'',
         isloading:false,
         countryName:"PK",
         
         phoneNo: '',
 confirmResult: null,
 userId: '',
 verificationId:'',
 callingCode:+92,


          }  
       
      }  
     
    
      // componentDidMount() {
      //   // this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //     //this.handleGetAddress()
      //    //this.handleSendCode()
         
      //  // });
      //  }
      // componentWillUnmount() {
      //   this._unsubscribe();
      // }





    
    // validatePhoneNumber = () => {
    //     var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    //     return regexp.test(this.state.phone)
    //     }
    //     handleSendCode = () => {
    //         // Request to send OTP
    //         if (this.validatePhoneNumber()) {
    //           firebase
    //             .auth()
    //             .signInWithPhoneNumber(this.state.phone)
    //             .then(confirmResult => {
    //               this.setState({ confirmResult })
    //             })
    //             .catch(error => {
    //               alert(error.message)
    //               console.log(error)
    //             })
    //         } else {
    //           alert('Invalid Phone Number')
    //         }
    //       }
   
    handleGetPhoneNo = async () =>{
      const userValue =  await AsyncStorage.getItem('phoneNo')
     console.log('userValue:::',userValue)
     
  }

     handleSendCode = () => {
        // let number = data.contact;
    //+923139704187

    this.setState({isloading:true})

    var pattern = new RegExp(/^[0-9\b]+$/);
    
    if (this.state.phoneNo==""){
      Alert.alert("Food Wala","Enter your phone number kindly")
      this.setState({isloading:false})
    }

    else if (!pattern.test(this.state.phoneNo)) {
    
      isValid = false;
  
      // errors["phone"] = "Please enter only number.";
      Alert.alert("Food Wala","Please enter only number");
      
      this.setState({isloading:false})
  
    }else if(this.state.phoneNo.length != 10){
  
      isValid = false;
  
      // errors["phone"] = "Please enter valid phone number.";

      Alert.alert("Food Wala","Please enter valid phone number")

      this.setState({isloading:false})
    
    }

    else
    {

    

     
      
         let plus = '+'
         let number = plus+this.state.callingCode+this.state.phoneNo
         console.log('Value: ',number);
         
         AsyncStorage.setItem('phoneNo', number);
         this.handleGetPhoneNo()
         
        
    
        // Request to send OTP
    
            // this.setState(
            //         isshow: 'true',
            //       });
    
    
                   if (Platform.OS === 'ios') {
                     console.log('ios');
                    //  Linking.openURL('tel://+123456789');
                   
                  firebase
                      .auth()
                      .signInWithPhoneNumber(number)
                      .then(confirmResult => {
                           this.setState({ confirmResult: confirmResult })
                          //this.setState(confirmResult);
                          console.log("ConfirmResult::::",this.state.confirmResult)
                          console.log("verificationId::::",confirmResult.verificationId)
                          this.setState({
                            verificationId:confirmResult.verificationId
                          })

                          this.setState({isloading:false})
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:0})

                          
                      })
                      .catch(error => {
                          alert(error.message)
                          this.setState({isloading:false})
                          console.log(error)
                      })
    
                      }
    
                      else
                      {
    
                           firebase
                      .auth()
                      .signInWithPhoneNumber(number)
                      .then(confirmResult => {
                        console.log("ConfirmResult::::::;",confirmResult)
                          // this.setState({ confirmResult: confirmResult })
                          this.setState(confirmResult);
                          console.log("verificationId::::",confirmResult.verificationId)
                          this.setState({
                            verificationId:confirmResult.verificationId
                          })
                          this.setState({isloading:false})
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:0})

                      })
                      .catch(error => {
                          alert(error.message)
    
                          this.setState({isloading:false})
                          console.log(error)
                      })
   
                           console.log('android');
                         
    
                  // firebase
                  //   .auth()
                  
                  //   .verifyPhoneNumber(number)
                  //   .on(
                  //     'state_changed',
                  //     phoneAuthSnapshot => {
                  //       switch (phoneAuthSnapshot.state) {
                  //         case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                  //           console.log('codeSend', phoneAuthSnapshot);
    
                  //           // this.setState({
                  //           //   verificationId: phoneAuthSnapshot.verificationId,
                  //           //   codefound: phoneAuthSnapshot.code,
                  //           // });
    
                  //           setverificationId(phoneAuthSnapshot.verificationId);
                  //           setcodefound(phoneAuthSnapshot.code);
    
                  //           // confirmResult => {
    
                  //           //       console.log('Confirm',confirmResult);
                  //           //   this.setState({confirmResult: confirmResult});
                  //           // };
    
                  //           break;
                  //         case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                  //           console.log('verification error');
    
                  //           break;
    
                  //         // ---------------------
                  //         // ANDROID ONLY EVENTS
                  //         // ---------------------
                  //         case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                  //           console.log('auto verify on android timed out');
    
                  //           break;
                  //         case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                  //           console.log('auto verified on android');
                  //           console.log(phoneAuthSnapshot);
    
                  //           ToastAndroid.show(
                  //            lang === 'En'
                  //               ? 'Contact verified successfully' :
                  //                'تم التحقق من الاتصال بنجاح'
                  //              ,
                  //             ToastAndroid.SHORT,
                  //           );
    
                  //           signupuser();
    
                  //           break;
                  //       }
                  //     },
                  //     error => {
                  //       console.log(error);
                  //     },
                  //     phoneAuthSnapshot => {
                  //       console.log(phoneAuthSnapshot);
                  //     },
                  //   );
    
                    
                    }
    
        // if (true) {
        //   firebase
        //     .auth()
        //     .signInWithPhoneNumber(number)
        //     .then((confirmResult) => {
        //       setconfirmResult();
        //       console.log(confirmResult);
        //     })
        //     .catch((error) => {
        //       alert(error.message);
        //       alert(error);
        //       console.log(error);
        //     });
        // }

                  }
      };



     
handleOnChange = (code)=>{
  console.log("Code is here:::::",code)
  this.setState({
    callingCode:code
  })
  
}


    
      render(){
        let countryPickerRef = undefined;
          return(
              <View style={{height:"100%",width:"100%",backgroundColor:"white"}}> 
            
               
                <View
                 style={
                  Platform.OS === "android" ? 
                  {height:55,width:"100%",backgroundColor:"transparent",flexDirection:"row",
              marginTop:30,marginLeft:30
              }
              :
              {height:55,width:"100%",backgroundColor:"transparent",flexDirection:"row",
              marginTop:50,marginLeft:30
              }
              }>
<TouchableOpacity style={{height:50,width:50,backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}} onPress={()=>this.props.navigation.goBack()}>
<View style={
     Platform.OS === "android" ? 
     
  {height:"100%",width:"100%",backgroundColor:"white",justifyContent:"center",alignItems:"flex-end",
  shadowOffset:{   width: 11,
    height: 8},shadowOpacity:1,elevation:5, shadowColor: 'gray',
    borderRadius:15,
 opacity:10,
} :
{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"flex-end",
  shadowOffset:{   width: 11,
    borderRadius:15,
  
    height: 8},shadowOpacity:0.1,elevation:0.01, shadowColor: 'gray',
 opacity:10,
}
}>
   
{/* <Iconico name={"arrow-back"}
     size = {25}
     color = { COLORS.buttonColor}
/> */}

<Image
       source = {images.backiconfood}
    style={{height:30,width:30,alignSelf:'center',
      
}}
    
     />

    
    </View>
    </TouchableOpacity>

  

   
<View style={{height:"100%",width:"10%",backgroundColor:"transparent"}}>
    </View>
</View>
<ScrollView >

<View style={{marginTop:10,
      width:"100%",backgroundColor:"transparent",justifyContent:"center"}}>
    <Image
       source = {images.foodwalalogo}
    style={{height:96,width:140,alignSelf:'center'
}}
    
     />

</View>

<View >

               
                <View style={{width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                    <View style={{height:40,width:'100%',justifyContent:"center",alignItems:"center",borderRadius:125/2}}>
                    {/* <Image
       source = {images.foodwalalogo}
    style={{height:130,width:240,margin:5
}}
    
     /> */}
                        </View>
                        <View style={{height:70,width:"100%",backgroundColor:"transparent"}}>
                          <Text style={{fontSize:22,fontFamily:'Poppins-Regular',color:"#2E3333",textAlign:'center',
                        fontWeight:'700'}}>
                        Sign Up with Number
                                    </Text>
                         
                            <Text style={
                              Platform.OS === "android" ?
                              {fontSize:12,color:"#434848",fontWeight:"600",marginTop:30,marginLeft:18}
                              :
                              {fontSize:12,color:"#434848",fontWeight:"600",marginTop:40,marginLeft:18}
                              }>
                            Phone Number

                                </Text>
                          
                        </View>
                    </View>
                    

                        <View style={{height:height*0.1,backgroundColor:"tranparent",justifyContent:"center"}}>
                    
                    <View style={{alignSelf:'center',width:'100%',height:50,flexDirection:'row',
                    
                     }}>

<View style={{alignSelf:'center',
backgroundColor:"white",
width:"20%",
marginLeft:15,marginRight:5,
height:"100%",
flexDirection:'row',
alignItems:"center",
justifyContent:"center",
borderRadius:10,
borderColor:"#E0E0E0",
borderWidth:0.5, }}>
<CountryPicker
  countryPickerRef={(ref: any) => {
    countryPickerRef = ref;
  }}
  
  enable={true}
  darkMode={false}
  countryCode={this.state.countryName}
  containerConfig={{
  showFlag: false,
  showCallingCode: true,
  showCountryName: false,
  showCountryCode: false,
  }}
  modalConfig={{
    showFlag: true,
    showCallingCode: true,
    showCountryName: false,
    showCountryCode: true,
  }}
  onSelectCountry={(data: any) => {
     
    console.log("DATA", data);
    this.setState({
      countryName:data.code
    })
    let code = data.callingCode
    console.log("CallingCode:::",code)
      this.state.callingCode = code
   

    // this.handleOnChange(code)
    
    

  }}
  onInit={(data: any) => {
    console.log("DATA", data.callingCode);
    
  }}
  onOpen={() => {
    console.log("Open");
  }}
  onClose={() => {
    console.log("Close");
  }}
  containerStyle={{
    container: {},
    flagStyle: {},
    callingCodeStyle: {
        
    },
    countryCodeStyle: {},
    countryNameStyle: {},
  }}
  modalStyle={{
    container: {},
    searchStyle: {},
    tileStyle: {},
    itemStyle: {
      itemContainer: {},
      flagStyle: {},
      countryCodeStyle: {},
      countryNameStyle: {},
      callingNameStyle: {},
    },
  }}
  title={"Country"}
  searchPlaceholder={"Search"}
  showCloseButton={true}
  showModalTitle={true}
/>

<Image
       source = {images.smalldown}
    style={{height:24,width:22,resizeMode:'center',
}}
    
     />

</View>

<View style={{flex: 3,height:'100%',alignSelf:'center',justifyContent:"center",
borderRadius:10,
borderColor:'#CBFF96',
marginRight :15,  
borderWidth:0.5,
}}>
<TextInput style={{ height: 45,fontSize:14, width: '90%',color:"black", left:5,paddingLeft:5,}}
    placeholder={
      "Enter your phone number"
    }
        keyboardType="phone-pad"
  
        maxLength={10}
    underlineColorAndroid='transparent'
     onChangeText={text =>  this.setState({
      phoneNo:text
  })
 } 
    
    />

</View>



</View>

</View>


<View style={{height:"10%",width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>

                {this.state.isloading === true ?
           <ActivityIndicator size="small" color={COLORS.buttonColor}  style={{
          alignItems:"center",
             width: '100%', height: '100%',
             alignSelf:"center"}} />

:
<View style={{ height: 50, width: '80%',marginTop:50}}>
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: COLORS.buttonColor, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }} 
   onPress = {()=> this.handleSendCode()}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont,

      fontWeight:'500',
      }}>
    
Send Code
            
    
  
</Text>
    </TouchableOpacity>
    </View>
      }

                   {/* <TouchableOpacity style={{height:40,width:"75%",backgroundColor:COLORS.buttonColor,alignItems:"center",justifyContent:"center",borderRadius:5}} onPress = {()=> this.handleSendCode()}>
                    <View >
                        <Text style={{color:"white",fontSize:14,fontWeight:"600"}}>
                            Send Code
                            </Text>

                        
                        </View>
                        </TouchableOpacity> */}
                        
                    </View>
                        
                   
                  
                    </View>
                    <KeyboardSpacer/>
                    </ScrollView>
                  



        </View>


          )
      }
    }