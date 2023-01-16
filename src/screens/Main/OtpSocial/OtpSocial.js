import React ,{ useState} from 'react';
import {View,Text,StatusBar,TouchableOpacity,ImageBackground,Image,FlatList,TextInput,StyleSheet,Dimensions, ScrollView,Alert} from 'react-native';
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
const backgroundImage = require('../../../assets/images/home-screen/home-screen.png');
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
    
    if (firebase.auth().currentUser)
    {
            firebase.auth().currentUser.delete();
            console.log('user deleted')
    }

    if (this.state.phoneNo==""){
      Alert.alert("Thaikadar.com","Enter your register phone no.")
    }

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
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult})

                          
                      })
                      .catch(error => {
                          alert(error.message)
    
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
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult})

                      })
                      .catch(error => {
                          alert(error.message)
    
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
            
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
                <View style={{height:"11%",width:"100%",backgroundColor:"transparent",flexDirection:"row",}}>
<TouchableOpacity style={{height:"100%",width:"10%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}} onPress={()=>this.props.navigation.goBack()}>
<View style={{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}}>
   
<Iconico name={"arrow-back"}
     size = {25}
     color = {"white"}
/>

    
    </View>
    </TouchableOpacity>
    <View style={{height:"100%",width:"80%",backgroundColor:"transparent",justifyContent:"flex-end"}}>
        

</View>
<View style={{height:"100%",width:"10%",backgroundColor:"transparent"}}>
    </View>
</View>
<ScrollView >
<View style={{flex:1}}>

               
                <View style={{height:height*0.5,width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                    <View style={{height:125,width:125,backgroundColor:"#388e3c",justifyContent:"center",alignItems:"center",borderRadius:125/2}}>
                       <IconAwe
                       name={"phone"}
                       size = {65}
                       color="white"
                       
                      />
                        </View>
                        <View style={{height:120,width:"100%",backgroundColor:"transparent"}}>
                        <View style={{height:"50%",width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>
                            Continue with Phone
                                </Text>
                            </View>
                            <View style={{height:"50%",width:"90%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center",}}>
                            <Text style={{fontSize:14,textAlign:"center",color:"white",fontWeight:"600"}}>
                            We need to register your phone number before we start!

                                </Text>
                            </View>
                        </View>
                    </View>
                    

                        <View style={{height:height*0.1,backgroundColor:"tranparent",justifyContent:"center"}}>
                    
                    <View style={{alignSelf:'center', borderBottomWidth: 0.5,width:'85%',height:45,flexDirection:'row' ,backgroundColor:"transparent",borderBottomColor:"gray",borderColor:"white",borderWidth:1,}}>

<View style={{alignSelf:'center',backgroundColor:"white",width:"10%",height:"100%",alignItems:"center",justifyContent:"center",borderRightWidth:0.5,borderRightColor:"green" }}>
<CountryPicker
  countryPickerRef={(ref: any) => {
    countryPickerRef = ref;
  }}
  enable={true}
  darkMode={false}
  countryCode={this.state.countryName}
  containerConfig={{
  showFlag: true,
  showCallingCode: false,
  showCountryName: false,
  showCountryCode: false,
  }}
  modalConfig={{
    showFlag: true,
    showCallingCode: true,
    showCountryName: true,
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


</View>

<View style={{flex: 3,height:'100%',alignSelf:'center',justifyContent:"center",backgroundColor:"white" }}>
<TextInput style={{ height: 45,fontSize:14, width: '90%',color:"black", left:5}}
    placeholder={
      "Enter phone number"
    }
        keyboardType="phone-pad"
  
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
                   <TouchableOpacity style={{height:40,width:"75%",backgroundColor:"#388e3c",alignItems:"center",justifyContent:"center",borderRadius:5}} onPress = {()=> this.handleSendCode()}>
                    <View >
                        <Text style={{color:"white",fontSize:14,fontWeight:"600"}}>
                            Submit
                            </Text>

                        
                        </View>
                        </TouchableOpacity>
                        
                    </View>
                        
                   
                  
                    </View>
                    <KeyboardSpacer/>
                    </ScrollView>
                  
</ImageBackground>


        </View>


          )
      }
    }