
import React ,{ createRef, useState} from 'react';
import {View,Text,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Dimensions,Animated,StatusBar,ImageBackground,ToastAndroid, ScrollView, Platform, Alert} from 'react-native';
import {globalStyle} from '../stylesheet/globalStyle';
import { Button } from 'react-native-elements/';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import Iconico from 'react-native-vector-icons/dist/Ionicons'
import IconFeat from 'react-native-vector-icons/dist/Feather';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import firebase from '@react-native-firebase/app' 
import AsyncStorage from '@react-native-community/async-storage';
import { styless } from "../../Auth/SignUpScreen/SignUpScreenStyle";
const {width, height} = Dimensions.get('window');
import { CommonActions } from '@react-navigation/native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {  images, SIZES, COLORS, FONTS,AppConfig } from '../../../constant'
import appConfig from '../../../constant/AppConfig';
import messaging from '@react-native-firebase/messaging';
export default class  OtpVerification extends React.Component {
   
    constructor(props){  
        super(props); 
        this.keyboardHeight = new Animated.Value(0)
       
      

         this.ain = createRef(null);
         this.bin = createRef(null);
         this.cin = createRef(null);
         this.din = createRef(null);
         this.ein = createRef(null);
         this.fin = createRef(null);
        this.state = {  
          timer:30,
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
         phoneNo:0,
         a:'',
         b:'',
         c:'',
         d:'',
         e:'',
         f:'',
         confirmResult: this.props.route.params.confirmResult,

 userId: '',
 verificationId:'',
 fcmTkn:"",
 
 
         
         

          }  


          
    

       
      }  




    signup= async() => {
      
          const phnNo =  await AsyncStorage.getItem('phoneNo')
       console.log('phnNo:::',phnNo)
       this.setState({
         phoneNo:phnNo
       })

       let fcmToken = await messaging().getToken();

        console.log("phoneNo:::::::::",this.state.phoneNo)
        console.log("Fcm is :::::::::",fcmToken)
 
this.setState({
  isloading:true
})

      console.log("calling Faizi::::::",AppConfig.baseUrl+'create-user')
      fetch(  appConfig.baseUrl+'create-user',
       {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business_name:"",
            business_number:phnNo,
            business_email:"",
            password:"nopassword",
            user_type:"3",
            my_token:fcmToken,
            login_method:"3",
            identifier:"",
         
          }),

          
        })
        .then((response) => response.json())
        .then((responseJson) => {  
         
         
          console.log(responseJson)

          if (responseJson.status ===1){
          this.setState({
              isloading:false
          })
          let user =responseJson.data
          this.saveUser(user)
        
              }
        
        })
        .catch((error) => {
          console.log(error)
          console.log('error')
  
            ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);

        });

    

}


          saveUser =  async (user)=>{
          console.log("userInformation:::::",user)
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('islogin', JSON.stringify('true'));
          let userValue =  await AsyncStorage.getItem('user')
         let parse = JSON.parse(userValue)
          console.log('userValue:::',parse.email)
          let islogin =  await AsyncStorage.getItem('islogin')
          let parseislogin = JSON.parse(islogin)
          console.log('parseislogin:::',parseislogin)
          //  this.props.navigation.navigate('TabRoutes');
        
            this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'TabRoutes'},
                // {
                //   name: 'Profile',
                //   params: { user: 'jane' },
                // },
              ],
            })
          );

           
          
     
           
          
       }


      verify = async () => {



      //  if (this.state.a===""){
      //    alert("Please Enter otp verification code to proceed request.")
      //  }



        if (
          this.state.a.replace(/^\s+|\s+$/g, '') !== '' &&
          this.state.b.replace(/^\s+|\s+$/g, '') !== '' &&
          this.state.c.replace(/^\s+|\s+$/g, '') !== '' &&
          this.state.d.replace(/^\s+|\s+$/g, '') !== '' &&
          this.state.e.replace(/^\s+|\s+$/g, '') !== '' &&
          this.state.f.replace(/^\s+|\s+$/g, '') !== ''
        ) {
          let str = '';
          str = this.state.a + this.state.b +  this.state.c + this.state.d +  this.state.e + this.state.f;
    
          console.log('COde: ',str)
          
          this.handleVerifyCode(str);
          return;
    
          if (str === '111111') {
          } else {
            alert('Code Not matched');
          }
    
          //this.props.navigation.navigate('completeProfile',{number:this.props.route.params.number})
          //this.props.route.params.number
        } else {
         
         Alert.alert( AppConfig.AppName, "Please enter full otp code.")
        }
      };

      handleVerifyCode = (str) => {
        // Request for OTP verification
    
          const confirmResult = this.state.confirmResult;
         
          console.log("ConfirmResults::::",confirmResult)
            const verificationCode = str;
    
    
            // const userid = await AsyncStorage.getItem('user_id');
    
            // const codefound = this.state.codefound;
    
             const verificationId = this.state.verificationId;
             console.log("verificationCode::::",verificationCode)
             console.log("verificationId::::",verificationId)
    
           
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode,
                );
    
                  console.log(credential);
    
                if(credential.token === "")
                {
                  Alert.alert( AppConfig.AppName, "Please enter a valid 6 digit OTP code.")
                    
                 console.log('Here');  
                }
                else
                {
                      console.log('Here done checked');
                     // alert('You Have Successfully Verify.')
                       // signupuser();
                }
               
    
    
        
            if (verificationCode.length == 6) {
    
    
                confirmResult
                    .confirm(verificationCode)
                    .then(user => {
                        
                        this.setState({ userId: user.uid })
                        // alert(`Verified! ${user.uid}`)
    
                       // this.updateuser();
    
                      //  this.props.navigation.navigate("UpdatePassword")

                      if(this.props.route.params.isforget === 1)
                      {
                        console.log("userforget::::::::: called ",this.props.route.params.isforget)

                        this.props.navigation.navigate("ChangePassword",{isforget:1})
                      }
                      else
                      {
                        this.signup()
                      }
                   
                    })
                    .catch(error => {
                        alert(error.message)
                        console.log(error)
                    })
    
    
            } 
      };
    
     
    
      componentDidMount() {

        this.interval = setInterval(
          () => 
          {
            if(this.state.timer !== 0)
            {
           
                this.setState((prevState)=> ({ timer: prevState.timer - 1 }))
             
           
            }
        },
          1000
        );

      

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.fcm_TokenConfig()
          this.handleGetPhoneNo()
          console.log("ConfirmResukt::::",this.state.confirmResult)
          let id = this.state.confirmResult.verificationId
          this.setState({
            verificationId:id
          })
          console.log("id",this.state.verificationId)
        });

        if (Platform.OS=="ios"){
      console.log("Its ios device so otp verification is necessary.")
        }else{


        firebase.auth().onAuthStateChanged((user) => {
if (user)
{

                        //  console.log("userAuth:::::::::",user)
                         console.log("userforget::::::::: ",this.props.route.params.isforget)

                            ToastAndroid.show(
                           'Contact Verify Sucessfully.',
                              ToastAndroid.SHORT,
                            );
    
                            if(this.props.route.params.isforget === 1)
                            {
                              console.log("userforget::::::::: called ",this.props.route.params.isforget)

                              this.props.navigation.navigate("ChangePassword",{isforget:1})

                            }
                            else
                            {
                              this.signup()
                            }

                        
}
});
        }


      }


      
      componentWillUnmount() {

        clearInterval(this.interval);

       
        this._unsubscribe();
      }

      fcm_TokenConfig = async()=>{
        let fcmToken = await messaging().getToken();
        console.log("It Call",fcmToken)
        this.setState({
          fcmTkn:fcmToken
        })
      }
      

      handleGetPhoneNo = async () =>{
        const userValue =  await AsyncStorage.getItem('phoneNo')
       console.log('userValue:::',userValue)
       this.setState({
         phoneNo:userValue
       })
       
    }
  

    handleSendCode = () => {
    
                 if (Platform.OS === 'ios') {
                   console.log('ios');
                  //  Linking.openURL('tel://+123456789');
                 
                firebase
                    .auth()
                    .signInWithPhoneNumber(this.state.phoneNo)
                    .then(confirmResult => {
                         this.setState({ confirmResult: confirmResult })
                        //this.setState(confirmResult);
                        console.log("ConfirmResult::::",this.state.confirmResult)
                        console.log("verificationId::::",confirmResult.verificationId)
                        this.setState({
                          verificationId:confirmResult.verificationId
                        })

                        this.setState({isloading:false})
                        // this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:0})

                        
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
                    .signInWithPhoneNumber(this.state.phoneNo)
                    .then(confirmResult => {
                      console.log("ConfirmResult::::::;",confirmResult)
                        // this.setState({ confirmResult: confirmResult })
                        this.setState(confirmResult);
                        console.log("verificationId::::",confirmResult.verificationId)
                        this.setState({
                          verificationId:confirmResult.verificationId
                        })
                        this.setState({isloading:false})
                        // this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:0})

                    })
                    .catch(error => {
                        alert(error.message)
  
                        this.setState({isloading:false})
                        console.log(error)
                    })
 
                         console.log('android');
                  
                  }
  
      

                
    };

    handleOnchangePhone = (text)=>{
        
            
            this.setState({
                phoneNo:text
            })
           
            console.log("PhoneNo::::",this.state.phoneNo)

        
    }
      render(){
        let countryPickerRef = undefined;
          return(
              <View style={{height:"100%",width:"100%",backgroundColor:"white"}}> 
             
           
              {/* <View style={{
    width: 100,
    height: 200,
    backgroundColor: '#ED2525',
    borderRadius: 50,
    transform: [{ scaleX: 5 }],
    overflow:'hidden',
    backgroundColor: COLORS.buttonColor,
     alignSelf:'center',
     position:'absolute',
     top:-125
     

      }}>
          



</View> */}
 <View style={{height:"3%",width:"100%"}}>
                </View>
                <View style={{height:60,width:"100%",backgroundColor:"white",
                flexDirection:"row",
                top:20}}>
<TouchableOpacity 


style={
  Platform.OS==="android"?
  {height:50,width:50,backgroundColor:COLORS.white,flexDirection:"row",justifyContent:'center',
        borderRadius:15,
        marginLeft:30,
        shadowOffset:{   width: 11,
          height: 8},shadowOpacity:1,elevation:5, shadowColor: 'gray',
    
      
      
    
      }:
      {height:50,width:50,backgroundColor:COLORS.white,flexDirection:"row",justifyContent:'center',
        borderRadius:15,
        
        shadowOffset:{   width: 11,
          height: 8},shadowOpacity:0.1,elevation:0.01, shadowColor: 'gray',
       opacity:10,
       marginLeft:30,
     
    
      }

} 

onPress={()=>this.props.navigation.goBack()}>

   
{/* <Iconico name={"arrow-back"}
     size = {25}
     color = {COLORS.buttonColor}
/> */}

<Image
       source = {images.backiconfood}
    style={{height:30,width:30,alignSelf:'center'
}}
    
     />


    
  
    </TouchableOpacity>
    <View style={{height:"100%",width:"80%",backgroundColor:"transparent",justifyContent:"flex-end"}}>
        
<Text style={{fontSize:15,alignSelf:'center',color:'white'}}>
    
   
   
         
  
</Text>
</View>
<View style={{height:"100%",width:"10%",backgroundColor:"transparent"}}>
    </View>
</View>

<ScrollView>
                <View style={{height:height*0.3,width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                    <View style={{height:200,

                      width:'90%',justifyContent:"center",alignItems:"center",borderRadius:125/2}}>
                    <Image
                    tintColor="#28A646"
       source = {images.timer}
    style={{height:200,width:200,marginLeft:35
}}
    
     />
      <Text style={{fontSize:22,fontFamily:'Poppins-Regular',
      color:"white",textAlign:'center',fontWeight:'700',
    position:'absolute',top:75,}}>
      00:{this.state.timer}
                         

                                </Text>

                        </View>
                    </View>
                    <View style={{height:60,width:"100%",backgroundColor:"transparent"}}>
                          <Text style={{fontSize:22,
                            fontWeight:'700',
                            fontFamily:'Poppins-Regular',color:"#2E3333",textAlign:'center'}}>
                          Verification Code

                                </Text>
                                <Text style={{fontSize:11,fontFamily:'Poppins-Regular',color:"#434848",textAlign:'center',
                                fontWeight:'500',
                              marginTop:5}}>
                            We have sent the 6 digit OTP to your Mobile Number

                                </Text>
                         
                        </View>
                    
                    <View style={{alignSelf:'center',width:'100%',height:100 ,backgroundColor:"transparent",justifyContent:"center"}}>

                    <View
                style={{
                 justifyContent:"center",
                 alignItems:"center"
                }}>
                
                <View
                  style={{
                    width: '100%',
                  backgroundColor:"transparent",
                    alignItems:"center",
                    flexDirection: 'row',
                    justifyContent:"center"
                  }}>
                    
                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.a}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                          this.setState({a:text});
                          this.bin.current.focus();
                        } else {
                            this.setState({a:text});
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.ain}
                    />
                  </View>

                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.b}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                            this.setState({b:text});
                          this.cin.current.focus();
                        } else {
                            this.setState({b:''});
                          this.ain.current.focus();
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.bin}
                    />
                  </View>

                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.c}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                            this.setState({c:text});
                          this.din.current.focus();
                        } else {
                            this.setState({c:''});
                          this.bin.current.focus();
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.cin}
                    />
                  </View>

                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.d}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                            this.setState({d:text});

                          this.ein.current.focus();
                        } else {
                            this.setState({d:''});
                          this.cin.current.focus();
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.din}
                    />
                  </View>

                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.e}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                            this.setState({e:text});
                          this.fin.current.focus();
                        } else {
                            this.setState({e:''});
                          this.din.current.focus();
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.ein}
                    />
                  </View>

                  <View style={styles.inputview}>
                    <TextInput
                      placeholder=""
                      value={this.state.f}
                      onChangeText={(text) => {
                        if (text.replace(/^\s+|\s+$/g, '') !== '') {
                            this.setState({f:text});
                        } else {
                            this.setState({f:''});

                          this.ein.current.focus();
                        }
                      }}
                      style={styles.input}
                      placeholderTextColor="white"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'numeric'}
                      maxLength={1}
                      ref={this.fin}
                    />
                  </View>
                </View>
              </View>


                    



</View>
                        
                   
                    <View style={{width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                 
                    <TouchableOpacity style={{ 
                      borderRadius: 10, 
                    height:45,
                    backgroundColor: COLORS.buttonColor, 
                    width: '70%',  
                    alignContent: 'center', justifyContent: 'center' }} 
                    onPress = {()=> this.verify()}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont, }}>
    
        Continue
            
    
  
</Text>
    </TouchableOpacity>

    {this.state.timer === 0
   ?
   

    <TouchableOpacity 
    onPress = {()=> 
    {
      // clearInterval(this.interval);
      this.setState({timer:30});

      this.handleSendCode();
      // this.interval = setInterval(
      //   () => 
      //   {
      //     if(this.state.timer !== 0)
      //     {
         
      //         this.setState((prevState)=> ({ timer: prevState.timer - 1 }))
           
         
      //     }
      // },
      //   1000
      // );

    }}>

  
    <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:"#525252",textAlign:'center',
    fontWeight:'400',
                              marginTop:15}}>

                            Didn’t get a code? 
                            <Text style={{fontSize:12,fontFamily:'Poppins-Regular',
                            color:"#00CCCB",textAlign:'center',
                            fontWeight:'400',
                              marginTop:15}}>

                            
                            {" "}Resend
                            </Text>
                                </Text>
                                </TouchableOpacity>

:
null

}
                   {/* <TouchableOpacity style={{height:45,width:"75%",backgroundColor:COLORS.buttonColor,alignItems:"center",justifyContent:"center",borderRadius:5}} 
                   
                   onPress = {()=> this.verify()}>
                    <View >
                        <Text style={{color:"white",fontSize:14,}}>
                         Continue
                            </Text>

                        
                        </View>
                        </TouchableOpacity>
                         */}
                    </View>
                    <KeyboardSpacer/>
                    </ScrollView>


        </View>


          )
      }
      
    }
    const styles = StyleSheet.create({
        button: {
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.09,
          width: '80%',
        },
        buttontext: {color: 'white', fontSize: height * 0.035, fontWeight: 'bold'},
        textfield: {
          justifyContent: 'space-between',
          paddingHorizontal: '3%',
          borderColor: "green",
          backgroundColor:'white',
          elevation:5,
          borderWidth: 1,
          borderRadius: 10,
          height: height * 0.07,
          width: '80%',
          flexDirection: 'row',
          alignItems: 'center',
        },
        radio: {
          height: height * 0.03,
          width: height * 0.03,
          alignSelf: 'center',
          tintColor:"red",
        },
        input: {
          textAlign: 'center',
          //borderBottomWidth: 0.3,
          borderColor: 'black',
          width: 35,
          fontFamily:'Poppins-Regular',
          fontSize:14,  
          height:"100%",
          color:"black",
        },
        inputview: {
          height: 50,
      
          borderWidth: 1,
          borderRadius:8,
          borderColor: "#E0E0E0",
          padding: 2,
          backgroundColor:'white',
          elevation:5,
          marginLeft:3,
         
          
        },
      });
