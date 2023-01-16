

import React, { useEffect,useState } from 'react';
import {
  SafeAreaView,Dimensions,Image,StatusBar,StyleSheet,Text,ScrollView,useColorScheme,View,TouchableOpacity,Linking,TouchableWithoutFeedback,Alert
,Platform} from 'react-native';

import {globalStyle} from '../../stylesheet/globalStyle';
const window = Dimensions.get('window');

//import firebase from './configfirebase';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

// import firebase from './configfirebase';



class WelcomeLoginWith extends React.Component{
  
    constructor(props){  
        super(props);  
        this.state = {  
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            userInfo:'',
            isLoggedIn:false,
            email: '',
            password: '',
            dataSource: '',
            data: '',
            lang:'',
            name:'',
            email:'',
            address:{
              title:"",
              category:"",
          },
            // userinfo:{},
          }  
       
      } 
      componentDidMount() {
      
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

          this.configureGoogleSign()

         });
      }




      componentWillUnmount() {
        this._unsubscribe();
      }
      
     
      
       configureGoogleSign =async()=> {
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

        await AsyncStorage.setItem('address', JSON.stringify('Islamabad'));
        await AsyncStorage.setItem('address_latitude', JSON.stringify(33.6844));
        await AsyncStorage.setItem('address_longitude', JSON.stringify(73.0479));
        
        // this.props.navigation.navigate('SignUpGmail',{userData:parse,status:'2'})
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'TabRoutes' },
                // {
                //   name: 'Profile',
                //   params: { user: 'jane' },
                // },
              ],
            })
          );
        
          
     
      
   }


   signIn =  async   ()=>  {

    
   this.signOut();

        try {
          
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('user EMAIL',userInfo.user)
          let user = userInfo.user

          
        //  setName(user.name)
        //  setEmail(user.email)

        //  setUserType("2")

        let name = user.name
        let email = user.email;

          this.signup("2",name,email)
        
      
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

      async signOut() {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();

          // setIsLoggedIn(false);
        } catch (error) {
         // Alert.alert('Something else went wrong... ', error.toString());
        }
      }


      
       signup=async (login_method,name,email)=>{

        console.log("Status:::::::::",login_method)
        console.log("Email is: :::::::::",email)
        console.log("Name is :::::::::",name)
   
        let fcmtoken="";
        fcmtoken = await messaging().getToken()

        console.log("Token: ",fcmtoken);

       
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
            user_type:login_method,
            fcm:fcmtoken,
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
      this.saveUser(user)
    }
    else if (responseJson.status ===2){
      console.log(responseJson.user)
        let user = responseJson.user
        this.saveUser(user)
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
    


  render()
  
  {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      signInButton: {
        width: 200,
        height: 50
      }
    });

   
    return(
       
         <View style={globalStyle.container}>
             
           

        <View style={styleCont.parent}>

      

     <View style={styleCont.child}>
        <View style={
          Platform.OS === "android"?
          {height:50,width:50,backgroundColor:"#FFFFFF",flexDirection:"row",
        borderRadius:15,
        
        shadowOffset:{   width: 11,
          height: 8},shadowOpacity:1,elevation:5, shadowColor: 'gray',
    
        position:'absolute',top:30, 
        left:30,
    
      }:
      {height:50,width:50,backgroundColor:"#FFFFFF",flexDirection:"row",
        borderRadius:15,
        
        shadowOffset:{   width: 11,
          height: 8},shadowOpacity:0.1,elevation:0.01, shadowColor: 'gray',
       opacity:10,
        position:'absolute',top:50, 
        left:30,
    
      }
    
    }
      >

      

      
           
            </View>
            <View style={{height:210,width:this.state.width,backgroundColor:"transparent",justifyContent:"center"}}>
                <View style={{height:200,width:"80%",backgroundColor:"transparent",alignSelf:"center"}}>
                
                       <Image style={{resizeMode:'cover', height: 200, width: "100%",top:90, alignSelf: 'center',position:'absolute',justifyContent:'center',alignContent:'center'
      }} source={require('../../assets/images/logo/logo.png')} />


                    
                    </View>

            </View>

            

          
             

     </View>
    
</View>

<View style={{height:60,
            width:this.state.width,backgroundColor:"transparent",justifyContent:"center"}}>
                <Text style={{alignSelf:"center",fontWeight:"bold",color:"black",fontSize:20,fontFamily:'Poppins-Regular'}}>Thaikadar Estates (Pvt) .Ltd</Text>
                </View>
   
<ScrollView showsVerticalScrollIndicator ={false}>
<View style={{height:"100%",width:"95%",backgroundColor:"transparent",alignSelf:"center",}}>
          
              <TouchableOpacity   onPress={() => this.signIn()}>
              <View style={{height:50,width:"90%",backgroundColor:"transparent",flexDirection:"row-reverse",justifyContent:'center',alignSelf:'center',
           borderWidth:0.3,borderColor:"#7C7C7C",borderRadius:8,marginBottom:10}}>
                <View style={{justifyContent:"center",height:"100%",width:"85%",backgroundColor:"transparent",}}>
              <Text style={{marginLeft:15,color:"#7C7C7C",fontWeight:"normal",fontSize:13,fontFamily:'Poppins-Regular'}}>
                Continue with Google
                </Text>
                </View>
                <View style={{height:25,width:25,backgroundColor:"white",alignSelf:"center",flexDirection:"row",justifyContent:"center"}}>
                {/* <Icon name="google" size={22}
                color ={"red"}
                style={{alignSelf:"center",marginTop:4}} /> */}

                   <Image
   style={{backgroundColor:"transparent",height:"100%",width:"100%"}}
   source={require('../../assets/images/google-logo/google-logo.png')} />


                              </View>

              </View>
              </TouchableOpacity>

              
              <TouchableOpacity   onPress={() => this.props.navigation.navigate("OtpSocial")}>
              <View style={{height:50,width:"90%",backgroundColor:"transparent",flexDirection:"row-reverse",justifyContent:'center',alignSelf:'center',
             borderWidth:0.3,borderColor:"#7C7C7C",borderRadius:8,marginBottom:10}}>
                <View style={{justifyContent:"center",height:"100%",width:"85%",backgroundColor:"transparent",}}>
              <Text style={{marginLeft:15,color:"#7C7C7C",fontWeight:"normal",fontSize:13,fontFamily:'Poppins-Regular'}}>
               Continue with Phone Number
                </Text>
                </View>
                <View style={{height:25,width:25,backgroundColor:"white",alignSelf:"center",flexDirection:"row",justifyContent:"center"}}>
             

                  <Image
   style={{backgroundColor:"transparent",height:"100%",width:"100%"}}
   source={require('../../assets/images/phone-logo/phone-logo.png')} />


                              </View>

              </View>
              </TouchableOpacity>

              <TouchableOpacity   onPress={() => this.props.navigation.navigate("Login")}>
              <View style={{height:50,width:"90%",backgroundColor:"transparent",flexDirection:"row-reverse",justifyContent:'center',alignSelf:'center',
             borderWidth:0.3,borderColor:"#7C7C7C",borderRadius:8,marginBottom:10}}>
                <View style={{justifyContent:"center",height:"100%",width:"85%",backgroundColor:"transparent",}}>
              <Text style={{marginLeft:15,color:"#7C7C7C",fontWeight:"normal",fontSize:13,fontFamily:'Poppins-Regular'}}>
               Continue with Email
                </Text>
                </View>
                <View style={{height:25,width:25,backgroundColor:"white",alignSelf:"center",flexDirection:"row",justifyContent:"center"}}>
             

                  <Image
   style={{backgroundColor:"transparent",height:"100%",width:"100%"}}
   source={require('../../assets/images/user-logo/user-logo.png')}  />


                              </View>

              </View>
              </TouchableOpacity>
             

              <View style={{height:40,width:"100%",backgroundColor:"transparent",flexDirection:"row",justifyContent:"center"}}>
               <View style={{height:1,width:"30%",backgroundColor:'gray',alignSelf:"center"}}>
                   </View>
                   <Text style={{alignSelf:"center",padding:10,color:'gray'}}>
                       Or
                       </Text>
                       <View style={{height:1,width:"30%",backgroundColor:'gray',alignSelf:"center"}}>
                   </View>
              </View>
              
            
            
              
              {/* Please also check out Our */}
              <View style={
                Platform.OS === "android" ? 
                {width: '100%', height: 55,backgroundColor:"transparent",marginTop:20} :
                {width: '100%', height: 55,backgroundColor:"transparent",marginTop:40}
                }>
                  <View style={{width: '100%', height: 55,backgroundColor:"transparent",
                  justifyContent:"center",alignContent:'center',alignSelf:'center',
                  }}>

                    <TouchableOpacity
                    
                  onPress = {()=> 
            {
               this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'TabRoutes' },
              
              ],
            })
          );
            }
            } >
              <View style={{width: 280, height: 50, backgroundColor:"transparent",
              flexDirection:"row",alignContent: 'center',
              justifyContent: 'center',alignSelf:'center', }}>
                <View style={{justifyContent:"center",
                height:"100%",width:"100%",alignContent: 'center', alignSelf:'center',backgroundColor:"#28A646",borderRadius: 10,
               }}>
              <Text style={{fontSize: 15, color: "black", alignSelf: 'center',fontWeight:"600",fontFamily:'Poppins-Regular'}}>
               Skip for now
                </Text>
                </View>
                
              </View>
              </TouchableOpacity>

                                          </View>



                  </View>
                 
                 


          </View>
</ScrollView>
            </View>
           
       
    )
  }
}


const styleCont = StyleSheet.create({
    parent : {
        height :window.height/2.7 ,
        width : window.width/1,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
        backgroundColor:"#FFFFFF",
        

    },
    child : {
        flex : 1,
        transform : [ { scaleX : 0.5 } ],

        backgroundColor : "#FFFFFF",
        alignItems : 'center',
        backgroundColor:"transparent",
       
        
    }
})
export default WelcomeLoginWith;