import React, { useState,useEffect } from "react";
import { Text, View, StatusBar, ImageBackground, Image,Alert,SafeAreaView, TextInput, ScrollView, TouchableOpacity,Platform } from "react-native";
import { styles } from "./SignInScreenStyle";
const backgroundImage = require('../../../assets/images/home-screen/home-screen.png');
import Icon from 'react-native-vector-icons/Ionicons';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {FBLoginManager} from 'react-native-facebook-login';
import { fbLoginPermissions } from '../../../components/configindex';
import Auth from '../../../components/configauth';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
const logoImage = require('../../../assets/images/logo/logo.png');
const googleLogoImage = require('../../../assets/images/google-logo/google-logo.png');
const fbLogoImage = require('../../../assets/images/fb-logo/fb-logo.png');
const phoneLogoImage = require('../../../assets/images/phone-logo/phone-logo.png');

const SignInScreen = ({ navigation }) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [lang ,setLang] = useState("En")
     const [name,setName] = useState("")
   
    const [user_type,setUserType] = useState("0")
    const isFocused = useIsFocused();
    const [fcmToken,setFcmToken] = useState("")
    useEffect( async() => {
     
      // let fcmToken = await messaging().getToken();
      // console.log("It Call",fcmToken)
      // setFcmToken(fcmToken)
      // console.log("fcmToken Call",fcmToken)
       configureGoogleSign()
        getUsre()
      }, [isFocused]);




      const signup=(login_method,name,email)=>{

        console.log("Status:::::::::",user_type)
        console.log("Email is: :::::::::",email)
        console.log("Name is :::::::::",name)
   
        fetch('https://thaikadar.com/api/create-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({
            business_name:name.replace(/^\s+|\s+$/g, ""),
            business_number:"",
            business_email:email.replace(/^\s+|\s+$/g, ""),
            password:"1234",
            user_type:user_type,
            fcm:fcmToken,
            login_method:login_method,
            identifier:"",
         
          }),

        })
        .then((response) => response.json())
        .then((responseJson) => {
    
          console.log("your user signUp info is here:::::",responseJson)
         
    if (responseJson.status ===1){
      console.log(responseJson)
      let user = responseJson.user
      saveUser(user)
    }
    else if (responseJson.status ===2){
      console.log(responseJson.user)
        let user = responseJson.user
        saveUser(user)
    }
    else{

      if (responseJson.user===""){
        console.log("user is empty")
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
    
    
      




    const viewPassword = () =>{
        setIsVisiblePassword(!isVisiblePassword);
    }

       const skiplogin = () => {
         navigation.navigate('TabRoutes');

    //  navigation.dispatch(
    //         CommonActions.reset({
    //           index: 1,
    //           routes: [
    //             { name: 'TabRoutes'},
    //             // {
    //             //   name: 'Profile',
    //             //   params: { user: 'jane' },
    //             // },
    //           ],
    //         })
    //       );
          

        // Login()
    }

    const handleSubmit = () => {
        // navigation.navigate('TabRoutes');
        Login()
    }

  //  const configureGoogleSign = async ()=>  {
  //       //  await Firebase.initializeApp();
  //     GoogleSignin.configure({
        
  //       webClientId: "43367809738-orrr9ktd01bgcrmtnq0v3a2tp1vp90v2.apps.googleusercontent.com",
  //       offlineAccess: false,
  //       forceConsentPrompt: true,
  //     });
  //   } 


    const  configureGoogleSign =async()=> {
      try {

          if(Platform.OS === 'android')
        {
            await GoogleSignin.configure({
          // iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
                //  webClientId:"589338195076-qaoln8pohva0vn6rgcib2r5ra30knlh0.apps.googleusercontent.com",
                webClientId:"624293013808-3op31jts2qrqe3033uljrbvd8ccobjf0.apps.googleusercontent.com",
               forceConsentPrompt: true,
        });

        }
        else
        {
          // await firebase.initializeApp();
        await GoogleSignin.configure({
          // iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
              webClientId:"624293013808-3op31jts2qrqe3033uljrbvd8ccobjf0.apps.googleusercontent.com",
               forceConsentPrompt: true,
        });
  
      }
          await GoogleSignin.hasPlayServices//({ autoResolve: true });
        // const user = await GoogleSignin.currentUserAsync();
        // console.log("user from google sin in", user);
      } catch (err) {
        console.log("Google signin error", err.code, err.message);
      }
    }

    const getUsre = async()=>{

       signOut();
      
      let islogin =  await AsyncStorage.getItem('islogin')
        let parseislogin = JSON.parse(islogin)
        console.log('parseislogin:::',parseislogin)
      if (parseislogin ==="true"){
        // navigation.navigate('TabRoutes');

           navigation.navigate('TabRoutes')
          //  SimpleSignUp

          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [
          //       { name: 'TabRoHoutes'},
          //       // {
          //       //   name: 'Profile',
          //       //   params: { user: 'jane' },
          //       // },
          //     ],
          //   })
          // );

        }
     

    }
  const  handleFbLogin = () =>{

      Auth.Facebook.login(fbLoginPermissions)
        .then(token => {
          fetch(
            'https://graph.facebook.com/v2.8/me?fields=id,name,email&access_token=' +
              token,
          )
            .then(response => response.json())
            .then(json => {
              const facebookID = json.id;
              const name = json.name;
              const email = json.email;
              setEmail(email)
              setName(name)
              setUserType("1")
            
              console.log('facebookID: ' + facebookID);
              console.log('name: ' + name);
              console.log('email: ' + email);
              console.log("UserFbLoginInfo:::::",json)
            
           
    
              // if (user === ""){
              //   console.log("No Values")
              // }else{
              // // this.SignUpForGmail()
              // }
    
              signup("1",name,email)

            })
            .catch(function(err) {
              console.log('mytoekn: ' + token);
              console.log(err);
            });
        })
        .catch(err => this.onError && this.onError(err));
    
    }
   const signIn =  async   ()=>  {

    Auth.Facebook.logout()    
   signOut();

        try {
          
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('user EMAIL',userInfo.user)
          let user = userInfo.user

          
         setName(user.name)
         setEmail(user.email)

         setUserType("2")
        let name = user.name
        let email = user.email
           signup("2",name,email)
        
      
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // when user cancels sign in process,
            // console.log("HereUserInfo:",this.state.userInfo)
            alert('Process Cancelled');
           
           
           
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // when in progress already
            alert('Process in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // when play services not available
            alert('Play services are not available');
          } else {
            // some other error
           // alert('Something else went wrong... ', error.toString());
            console.log('Other error::',error)
           // setError(error);
          }
        }
        
      }

      const  signOut= async()=> {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setIsLoggedIn(false);
        } catch (error) {
          // Alert.alert('Something else went wrong... ', error.toString());
        }
      }

     const Login = async ()=> {
         console.log("Email:::::::::",email)
         console.log("Password::::::",password)
        if(email.replace(/^\s+|\s+$/g, "")==='')
        { 
          Alert.alert(
            
        'Enter Email'
           
           )
          return
      
      
        }
        else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if (reg.test(email) === false) {
              Alert.alert(
               'Email is not correct'
                      
                    );
              return;
              
        
            }
            else {
              console.log("Email is Correct");
            }
        }
      
        if(password.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
        'Enter password')
          return;
          
      
      
        }
      
        else{
      
            setIsLoading(true)
            fetch( 'https://thaikadar.com/api/login-user',
             {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  
                    email:email.toLowerCase().replace(/^\s+|\s+$/g, ""),
                    password:password.replace(/^\s+|\s+$/g, ""),
                    fcm:"asdjflaksdfavdWAsdnfkj$34asdfjkasdf"
                   
                }),
              })
              .then((response) => response.json())
              .then((responseJson) => {  
               
                console.log(responseJson)
      
               
                if (responseJson.status === true){


                  console.log("your user signUp info is here:::::",responseJson)
                  
                    // AsyncStorage.setItem('user', JSON.stringify(responseJson));
                    // const userValue =  await AsyncStorage.getItem('user')
                    // //var stringWithoutCommas = userValue.replace(/['"]+/g, '')
                    // console.log('userValue:::',userValue)
                    let user =responseJson.data
                  //   this.setState({
                  //     isloading:false,
                  //     statusLogin:"1",
                  //     isTravling:true
                  // })

                  console.log("your response json is here:::::",responseJson)
                  setIsLoading(false)
                    saveUser(user)
                  
                }else{
                  setIsLoading(false)
                    alert(responseJson.message)

      
                }        
              
              })
              .catch((error) => {
                console.log(error)
                console.log('error')
                setIsLoading(false)
        
                  ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
      
              });
      
          }
      
      }
  const  saveUser =  async (user)=>{
        console.log("userInformation:::::",user)
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('islogin', JSON.stringify('true'));
        let userValue =  await AsyncStorage.getItem('user')
       let parse = JSON.parse(userValue)
        console.log('userValue:::',parse.email)
        let islogin =  await AsyncStorage.getItem('islogin')
        let parseislogin = JSON.parse(islogin)
        console.log('parseislogin:::',parseislogin)
        navigation.navigate('TabRoutes');

        //  navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [
        //         { name: 'TabRoutes'},
        //         // {
        //         //   name: 'Profile',
        //         //   params: { user: 'jane' },
        //         // },
        //       ],
        //     })
        //   );
      
          //this.props.navigation.navigate('TabBar',{userData:parse,status:'2'})
           //SimpleSignUp
          //  this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [
          //       { name: 'TabBar'},
          //       // {
          //       //   name: 'Profile',
          //       //   params: { user: 'jane' },
          //       // },
          //     ],
          //   })
          // );
        
   
         
        
     }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                     
                        <View style={styles.logoViewStyle}>
                            <Image source={logoImage} style={styles.imageLogoStyle} />
                        </View>
                        <View style={styles.inputTextViewStyle}>
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Email"
                                placeholderTextColor='#fff'
                                underlineColorAndroid="transparent"
                                keyboardType="email-address"
                                onChangeText={val => {
                                  setEmail(val)
                                   console.log(val);
                                 }}
                                
                            />
                            <View style={styles.textinputiconStyle}>
                                <TextInput
                                    style={[styles.inputBoxStyle, { paddingRight: 45 }]}
                                    placeholder="Password"
                                    placeholderTextColor='#fff'
                                    secureTextEntry={isVisiblePassword}
                                    underlineColorAndroid="transparent"
                                    onChangeText={val => {
                                      setPassword(val)
                                       console.log(val);
                                     }}
                                    
                                />
                                <Icon
                                    name={!isVisiblePassword ? 'eye-outline' : 'eye-off-outline'}
                                    style={styles.eyeIcon}
                                    size={30}
                                    onPress={viewPassword}
                                    />
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.buttonTextStyle}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <Text style={styles.bottomTextStyle,{marginTop:60,fontSize:18,  color: 'black',fontWeight: '300',}}>OR Continue With</Text>
                            </TouchableOpacity>
                            <View style={styles.allLoginLogos}>
                                <TouchableOpacity onPress={()=>signIn()}>
                                <Image source={googleLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleFbLogin()} >
                                <Image source={fbLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>navigation.navigate("OtpSocial")}>
                                <Image source={phoneLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                       
 <View
                      style={styles.accèsdirectStyleinner}
                        >
                        <TouchableOpacity style={styles.accèsdirectStyle} onPress={skiplogin}>
                            <Text style={styles.accèsdirectTextStyle}> Skip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.accèsdirectStyle} onPress={()=>navigation.navigate('SignUpScreen')}>
                            <Text style={styles.accèsdirectTextStyle}> Register</Text>
                        </TouchableOpacity>

                      

                      

                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </ScrollView >
    )
}

export default SignInScreen