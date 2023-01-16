import React, { useState,useEffect } from "react";
import { Text, View, StatusBar, ImageBackground, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity,Alert,Platform } from "react-native";
import { styles } from "./SignUpScreenStyle";
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {FBLoginManager} from 'react-native-facebook-login';
import { fbLoginPermissions } from '../../../components/configindex';
import Auth from '../../../components/configauth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
const backgroundImage = require('../../../assets/images/home-screen/home-screen.png');
const logoImage = require('../../../assets/images/logo/logo.png');
const googleLogoImage = require('../../../assets/images/google-logo/google-logo.png');
const fbLogoImage = require('../../../assets/images/fb-logo/fb-logo.png');
const phoneLogoImage = require('../../../assets/images/phone-logo/phone-logo.png');
import KeyboardSpacer from 'react-native-keyboard-spacer';
var radio_props = [
    { label: 'particulier', value: 0 },
    { label: 'professionnel', value: 1 }
];

const SignUpScreen = ({ navigation }) => {
    const [radio, setRadio] = useState(0);
    const isFocused = useIsFocused();
    const [isVisiblePassword, setIsVisiblePassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password ,setPassword] = useState("")
    const [company_name ,setCompany_name] = useState("")
    const [company_number ,setCompany_number] = useState("")
    const [lang ,setLang] = useState("En")
    const [user_type,setUserType] = useState("0")
    const [fcmToken,setFcmToken] = useState("")
    const viewPassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    }

    useEffect( async() => {
      // let fcmToken = await messaging().getToken();
      // console.log("It Call",fcmToken)
      // setFcmToken(fcmToken)
      // console.log("fcmToken Call",fcmToken)

      configureGoogleSign()
      //  getUsre()
     }, [isFocused]);
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
              setUserType("2")
              let userType = "2"
              gmailFbSignUp("1",name,email,userType)
              console.log('facebookID: ' + facebookID);
              console.log('name: ' + name);
              console.log('email: ' + email);
              console.log("UserFbLoginInfo:::::",json)
            
           
    
              if (user === ""){
                console.log("No Values")
              }else{
              // this.SignUpForGmail()
              }
    
            })
            .catch(function(err) {
              console.log('mytoekn: ' + token);
              console.log(err);
            });
        })
        .catch(err => this.onError && this.onError(err));
    
    }
   const signIn =  async   ()=>  {
 signOut();
    
        try {
          
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('user EMAIL',userInfo.user)
          let user = userInfo.user

          
         setName(user.name)
         setEmail(user.email)
         setUserType("1")

           console.log('user Name is: ',userInfo.user.name)

          if (user.name ===""){
            console.log("Please Try Again")
          }else{
            let name = user.name
            let email  = user.email
            let userType = "1"
           gmailFbSignUp("2",name,email,userType)
          }
      
        
          
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
          // setIsLoggedIn(false);
        } catch (error) {
          // Alert.alert('Something else went wrong... ', error.toString());
        }
      }

     const  configureGoogleSign =async()=> {
      try {

        if(Platform.OS === 'android')
        {

             await GoogleSignin.hasPlayServices//({ autoResolve: true });
        await GoogleSignin.configure({
      
      //  iosClientId:"589338195076-kk3flck40sdjig8v6d7e7g3cr8oen5gs.apps.googleusercontent.com",
          webClientId:"624293013808-3op31jts2qrqe3033uljrbvd8ccobjf0.apps.googleusercontent.com",
            //  androidClientId:"589338195076-kk3flck40sdjig8v6d7e7g3cr8oen5gs.apps.googleusercontent.com",
          
        
           forceConsentPrompt: true,
        });

        }
        else
        {
        await GoogleSignin.hasPlayServices//({ autoResolve: true });
        await GoogleSignin.configure({
      
      //  iosClientId:"589338195076-kk3flck40sdjig8v6d7e7g3cr8oen5gs.apps.googleusercontent.com",
          webClientId:"624293013808-3op31jts2qrqe3033uljrbvd8ccobjf0.apps.googleusercontent.com",
            //  androidClientId:"589338195076-kk3flck40sdjig8v6d7e7g3cr8oen5gs.apps.googleusercontent.com",
          
        
           forceConsentPrompt: true,
        });
      }
  
        // const user = await GoogleSignin.currentUserAsync();
        // console.log("user from google sin in", user);
      } catch (err) {
        console.log("Google signin error", err.code, err.message);
      }
    }

    // const getUsre = async()=>{
    //   let islogin =  await AsyncStorage.getItem('islogin')
    //     let parseislogin = JSON.parse(islogin)
    //     console.log('parseislogin:::',parseislogin)
    //   if (parseislogin ==="true"){
    //     navigation.navigate('TabRoutes');
    //     }
     

    // }

    const gmailFbSignUp =(login_method,name,email,userType)=>{
      console.log("Status:::::::::",user_type)
      console.log("Email :::::::::",email)
      console.log("Name :::::::::",name)
 
      // return;
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
          fcm:'fcmToken',
          login_method:login_method,
          identifier:"",
       
        }),

      })
      .then((response) => response.json())
      .then((responseJson) => {
  
     
       
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



    const signup=()=>{

      console.log("password is: "+password)
        if(name.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
       'Enter Name')
          return;
          
      
      
        }
       
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
        if(phone.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
       'Enter Telephone No')
          return;
          
      
      
        }
        

        if(password.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
        'Enter password')
          return;
          
      
      
        }

        if (radio===1){
            if(company_name.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
        'Enter Company Name')
          return;
          
      
      
        }
        if(company_number.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
        'Enter Company Number')
          return;
          
      
      
        }

        }
        else
        {
        
    
        //   this.setState({progress:true})
    
        }
    
        if(radio===1){
            console.log("Status:::::::::::::::",radio)

        fetch('https://thaikadar.com/api/create-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({
            business_name:name.replace(/^\s+|\s+$/g, ""),
            business_number:phone.replace(/^\s+|\s+$/g, ""),
            business_email:email.replace(/^\s+|\s+$/g, ""),
            password:password.replace(/^\s+|\s+$/g, ""),
            user_type:"0",
            company_name:company_name.replace(/^\s+|\s+$/g, ""),
            company_number:company_number.replace(/^\s+|\s+$/g, ""),
            fcm:'fcmToken',
            login_method:"0",
            identifier:"",
           
          }),

        })
        .then((response) => response.json())
        .then((responseJson) => {
    
          console.log(responseJson)
          if (responseJson.status) {
    
            console.log("the values "+responseJson)
            let user = responseJson.data
            saveUser(user)
    
            //   this.setState({progress:false})
            //   this.props.navigation.navigate('Login')
    //          alert(
    //           this.state.lang==='En'?'We will check your profile, and contact you soon': this.state.lang==='Fr'?   'Nous vérifierons votre profil et vous contacterons bientôt' :  'سوف نتحقق من ملفك الشخصي ، وسنتصل بك قريبًا'
    //    )
            }
              else
            {
               console.log(responseJson)
    let user = responseJson.user
            saveUser(user)
            }
        //   else {
        //     Alert.alert(
        //       this.state.lang === 'En' ? 'Email Exist' : this.state.lang === 'Fr' ?'Ee-mail existe' : 'البريد الإلكتروني موجود'
    
        //     )
        //     console.log(responseJson)
        //      this.setState({progress:false})
    
        //   }
        })
        .catch((error) => {
          console.log(error)
          console.log('error')
         // this.setState({progress:false})
    
        });
    
    
    
        }else{

        fetch('https://thaikadar.com/api/create-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({
            business_name:name.replace(/^\s+|\s+$/g, ""),
            business_number:phone.replace(/^\s+|\s+$/g, ""),
            business_email:email.replace(/^\s+|\s+$/g, ""),
            password:password.replace(/^\s+|\s+$/g, ""),
            user_type:"0",
            fcm:'fcmToken',
            login_method:"0",
            identifier:"",
         
          }),

        })
        .then((response) => response.json())
        .then((responseJson) => {
    
          console.log("else portion"+ responseJson)
          if (responseJson.status) {
    
            console.log(responseJson)
    let user = responseJson.data
            saveUser(user)
            //   this.setState({progress:false})
            //   this.props.navigation.navigate('Login')
    //          alert(
    //           this.state.lang==='En'?'We will check your profile, and contact you soon': this.state.lang==='Fr'?   'Nous vérifierons votre profil et vous contacterons bientôt' :  'سوف نتحقق من ملفك الشخصي ، وسنتصل بك قريبًا'
    //    )
            }
            else
            {
               console.log(responseJson)
    let user = responseJson.user
            saveUser(user)
            }
        //   else {
        //     Alert.alert(
        //       this.state.lang === 'En' ? 'Email Exist' : this.state.lang === 'Fr' ?'Ee-mail existe' : 'البريد الإلكتروني موجود'
    
        //     )
        //     console.log(responseJson)
        //      this.setState({progress:false})
    
        //   }
        })
        .catch((error) => {
          console.log(error)
          console.log('error')
         // this.setState({progress:false})
    
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
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.topTextStyle}>Register Now</Text>
                        </TouchableOpacity>
                        <View style={styles.logoViewStyle}>
                            <Image source={logoImage} style={styles.imageLogoStyle} />
                        </View>
                        <View style={styles.inputTextViewStyle}>
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Name:"
                                placeholderTextColor='#fff'
                                underlineColorAndroid="transparent"
                                onChangeText={val => {
                                    setName(val)
                                     console.log(val);
                                   }}
                            />
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Email:"
                                placeholderTextColor='#fff'
                                underlineColorAndroid="transparent"
                                keyboardType="email-address"
                                onChangeText={val => {
                                    setEmail(val)
                                     console.log(val);
                                   }}
                            />
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Contact:"
                                placeholderTextColor='#fff'
                                keyboardType="phone-pad"
                                underlineColorAndroid="transparent"
                                onChangeText={val => {
                                    setPhone(val)
                                     console.log(val);
                                   }}
                            />
                            <View style={styles.textinputiconStyle}>
                                <TextInput
                                    style={[styles.inputBoxStyle, { paddingRight: 45 }]}
                                    placeholder="Password:"
                                    placeholderTextColor='#fff'
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={isVisiblePassword}
                                    onChangeText={val => {
                                        setPassword(val)
                                         console.log("Password is: "+val);
                                       }}
                                />
                                <Icon
                                    name={!isVisiblePassword ? 'eye-outline' : 'eye-off-outline'}
                                    style={styles.eyeIcon}
                                    size={30}
                                    onPress={viewPassword}
                                />
                            </View>
                            {radio == 1 && (
                                <>
                                    <TextInput
                                        style={styles.inputBoxStyle}
                                        placeholder="Nom de l'entreprise"
                                        placeholderTextColor='#fff'
                                        underlineColorAndroid="transparent"
                                        onChangeText={val => {
                                            setCompany_name(val)
                                             console.log(val);
                                           }}
                                    />
                                    <TextInput
                                        style={styles.inputBoxStyle}
                                        placeholder="Téléphone de l'entreprise"
                                        placeholderTextColor='#fff'
                                        underlineColorAndroid="transparent"
                                        keyboardType="phone-pad"
                                        onChangeText={val => {
                                            setCompany_number(val)
                                             console.log(val);
                                           }}
                                    />
                                </>
                            )}
                            <View>
                                {/* <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    onPress={(value) => { setRadio(value) }}
                                    formHorizontal={true}
                                    buttonColor={'#fff'}
                                    selectedButtonColor={'#fff'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelStyle={{
                                        color: '#fff',
                                        fontWeight: '500',
                                        fontSize: 18,
                                        marginRight: 10
                                    }}
                                /> */}
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={() =>signup()}>
                                <Text style={styles.buttonTextStyle}>Register</Text>
                            </TouchableOpacity>
                            <Text style={styles.bottomTextStyle}></Text>
                            <TouchableOpacity style={styles.allLoginLogos} onPress={() => navigation.navigate('SignInBusinessScreen')}>
                            <TouchableOpacity onPress={()=>signIn()}>
                                <Image source={googleLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleFbLogin()} >
                                <Image source={fbLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>navigation.navigate("OtpSocial")}>
                                <Image source={phoneLogoImage} style={styles.logosImageStyle} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                        <KeyboardSpacer/>
                    </SafeAreaView>
                </ImageBackground>
            </View>
           
        </ScrollView>
    )
}

export default SignUpScreen