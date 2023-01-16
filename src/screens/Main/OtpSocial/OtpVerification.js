import React ,{ createRef, useState} from 'react';
import {View,Text,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Dimensions,Animated,StatusBar,ImageBackground,ToastAndroid, ScrollView, Platform} from 'react-native';
import {globalStyle} from '../stylesheet/globalStyle';
import { Button } from 'react-native-elements/';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/AntDesign';
// import CountryPicker from "react-native-region-country-picker";
import Iconico from 'react-native-vector-icons/dist/Ionicons'
import IconFeat from 'react-native-vector-icons/dist/Feather';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import firebase from '@react-native-firebase/app'
import AsyncStorage from '@react-native-community/async-storage';
import { styless } from "../../Auth/SignUpScreen/SignUpScreenStyle";
const backgroundImage = require('../../../assets/images/home-screen/home-screen.png');
const {width, height} = Dimensions.get('window');
import KeyboardSpacer from 'react-native-keyboard-spacer';

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
 
 
         
         

          }  


          
    

       
      }  




       signup=async ()=>{

         const userValue =  await AsyncStorage.getItem('phoneNo')
       console.log('userValue:::',userValue)
       this.setState({
         phoneNo:userValue
       })

        console.log("phoneNo:::::::::",this.state.phoneNo)
        // console.log("Status:::::::::",email)
        // console.log("Status:::::::::",name)
        // userValue+"@gmail.com"
        fetch('https://thaikadar.com/api/create-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({
            business_name:"",
            business_number:userValue,
            business_email:"",
            password:"1234",
            user_type:"3",
            fcm:"asdjhfgkhweooriwebdnbjksdASDFandjfsdfEDNFSDOflsdfasdf",
            login_method:"3",
            identifier:"",
         
          }),

        })
        .then((response) => response.json())
        .then((responseJson) => {
    
          console.log("Here response data:::::",responseJson)
         
    if (responseJson.status ===1){
      console.log("Here response data:::::",responseJson)
      let user = responseJson.user
      this.saveUser(user)
    }else{

      if (responseJson.user===""){
        console.log("user is empty")
      }else{
        console.log(responseJson.user)
        let user = responseJson.user
        this.saveUser(user)

      }
    
      
    }
           
    // let user = responseJson.user
    //         
           
        })
        .catch((error) => {
          console.log(error)
          console.log('error')
         // this.setState({progress:false})
    
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
           this.props.navigation.navigate('TabRoutes');
        
          //   this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [
          //       { name: 'TabRoutes'},
          //       // {
          //       //   name: 'Profile',
          //       //   params: { user: 'jane' },
          //       // },
          //     ],
          //   })
          // );

           
          
     
           
          
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
         
         alert("Please enter a valid 6-digit OTP code.")
        }
      };

      handleVerifyCode = (str) => {
        // Request for OTP verification
    
          const confirmResult = this.state.confirmResult;
         
          console.log("checking now ")

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
                     alert('Please enter a valid 6-digit OTP code.')
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
                      this.signup()
                    })
                    .catch(error => {
                        alert(error.message)
                        console.log(error)
                    })
    
    
            } else {
                alert('Veuillez entrer un code OTP valide à 6 chiffres.')
            }
      };
    
     
    
      componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
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

                         console.log("userAuth:::::::::",user)
                            ToastAndroid.show(
                           'Contact vérifié avec succès',
                              ToastAndroid.SHORT,
                            );
    
                           this.signup();
                          
}
});
        }


        //  firebase.auth()
                  
        //             .verifyPhoneNumber(this.state.phoneNo)
        //             .on(
        //               'state_changed',
        //               phoneAuthSnapshot => {
        //                 switch (phoneAuthSnapshot.state) {
        //                   case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
        //                     console.log('codeSend', phoneAuthSnapshot);
    
        //                     // this.setState({
        //                     //   verificationId: phoneAuthSnapshot.verificationId,
        //                     //   codefound: phoneAuthSnapshot.code,
        //                     // });
    
        //                     setverificationId(phoneAuthSnapshot.verificationId);
        //                     setcodefound(phoneAuthSnapshot.code);
    
        //                     // confirmResult => {
    
        //                     //       console.log('Confirm',confirmResult);
        //                     //   this.setState({confirmResult: confirmResult});
        //                     // };
    
        //                     break;
        //                   case firebase.auth.PhoneAuthState.ERROR: // or 'error'
        //                     console.log('verification error');
    
        //                     break;
    
        //                   // ---------------------
        //                   // ANDROID ONLY EVENTS
        //                   // ---------------------
        //                   case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
        //                     console.log('auto verify on android timed out');
    
        //                     break;
        //                   case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
        //                     console.log('auto verified on android');
        //                     console.log(phoneAuthSnapshot);
    
        //                     ToastAndroid.show(
        //                      lang === 'En'
        //                         ? 'Contact verified successfully' :
        //                          'تم التحقق من الاتصال بنجاح'
        //                        ,
        //                       ToastAndroid.SHORT,
        //                     );
    
        //                   this.signup()
    
        //                     break;
        //                 }
        //               },
        //               error => {
        //                 console.log(error);
        //               },
        //               phoneAuthSnapshot => {
        //                 console.log(phoneAuthSnapshot);
        //               },
        //             );

      }
      componentWillUnmount() {
        this._unsubscribe();
      }
      handleGetPhoneNo = async () =>{
        const userValue =  await AsyncStorage.getItem('phoneNo')
       console.log('userValue:::',userValue)
       this.setState({
         phoneNo:userValue
       })
       
    }
  

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
             
                <ImageBackground source={backgroundImage} resizeMode="cover" style={{ flex: 1,
        justifyContent: "center"}}>
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
                <View style={{height:"10%",width:"100%",backgroundColor:"transparent",flexDirection:"row",top:-20}}>
<TouchableOpacity style={{height:"100%",width:"10%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}} onPress={()=>this.props.navigation.goBack()}>
<View style={{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}}>
   
<Iconico name={"arrow-back"}
     size = {25}
     color = {"white"}
/>

    
    </View>
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
                    <View style={{height:125,width:125,backgroundColor:"#388e3c",justifyContent:"center",alignItems:"center",borderRadius:125/2}}>
                    <IconAwe
                       name={"phone"}
                       size = {65}
                       color="white"
                       
                      />
                        </View>
                    </View>
                    <View style={{height:110,width:"100%",backgroundColor:"transparent"}}>
                        <View style={{height:"50%",width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>
                            Verification by phone

                                </Text>
                            </View>
                            <View style={{height:"50%",width:"90%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center",}}>
                            <Text style={{fontSize:14,textAlign:"center",color:"white"}}>
                            We have sent you a six-digit OTP code, please enter it for verification.

                                </Text>
                            </View>
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
                        
                   
                    <View style={{height:120,width:"100%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
                   <TouchableOpacity style={{height:45,width:"75%",backgroundColor:"#388e3c",alignItems:"center",justifyContent:"center",borderRadius:5}} onPress = {()=> this.verify()}>
                    <View >
                        <Text style={{color:"white",fontSize:14,}}>
                           Verify
                            </Text>

                        
                        </View>
                        </TouchableOpacity>
                        
                    </View>
                    <KeyboardSpacer/>
                    </ScrollView>
</ImageBackground>

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
          height:"100%",
          color:"black",
        },
        inputview: {
          height: height * 0.08,
          borderWidth: 1,
          borderRadius:5,
          borderColor: "gray",
          padding: 2,
          backgroundColor:'white',
          elevation:5,
          marginLeft:3,
          paddingBottom: '3%',
          
        },
      });