import React, { useState,useEffect } from "react";
import { View, Share, SafeAreaView,Dimensions ,Image, ScrollView, Text, TouchableOpacity, Linking } from "react-native";
import { styles } from "./UserScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {FBLoginManager} from 'react-native-facebook-login';
import { fbLoginPermissions } from '../../../components/configindex';
import Auth from '../../../components/configauth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
const logoImage = require('../../../assets/images/logo/logo.png');
const fbImage = require('../../../assets/images/social-icons/facebook.png');
const instagramImage = require('../../../assets/images/social-icons/instagram.png');
const whatsappImage = require('../../../assets/images/social-icons/whatsapp.png');
const snapchatImage = require('../../../assets/images/social-icons/snapchat.png');
const supportedURL = "https://google.com";
const window = Dimensions.get('window');
const UserScreen = ({ navigation }) => {

// const [user,setUser] = useState("")
const [user,setUser] = useState("")
const [login,setlogin] = useState(false);

    const isFocused = useIsFocused();
    useEffect( async() => {
        getUsre()
      
      }, [isFocused]);



   

      const getUsre = async()=>{
          try
          {


          try
          {
  let islogin =  await AsyncStorage.getItem('islogin')
          let parseislogin = JSON.parse(islogin)
          console.log('value of parseislogin:::',parseislogin)

            if(parseislogin)
          {
              setlogin(true)
          }
          else
          {
              setlogin(false)
          }

          }
          catch(ex)
          {
 setlogin(false)
          }
        
          let user =  await AsyncStorage.getItem('user')
          let user_Info = JSON.parse(user)
          console.log('user_Info:::',user_Info)
          setUser(user_Info)
          console.log("userInformation::::",user_Info)
          }
          catch(ex)
          {

          }
      
    
      }


   const clearAllData = ()=> {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            //.then(() => alert('success'));
            
      }
    const  clearAsyncStorage = async() => {
        AsyncStorage.clear();
        try {
            await AsyncStorage.removeItem("user");
            console.log('Data removed')
        }
        catch(exception) {
            console.log(exception)
        }
        }
        const  signOut= async()=> {
            try {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
            //   setIsLoggedIn(false);
            } catch (error) {
            //   alert('Something else went wrong... ', error.toString());
            }
          }
    
       
  const  handleAsncClear = ()=>{
        clearAllData()
        clearAsyncStorage()
     signOut()
     
        

          Auth.Facebook.logout()    
         
        //   navigation.navigate("SignInScreen")
          navigation.dispatch(
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
        
      }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'https://thaikadar.com/ | Secure your Investment with Thaikadar, https://play.google.com/store/apps/details?id=circularbyte.thaikadar',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'person-outline'}
                        style={styles.icons}
                    />
                </View>
                <View>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.imageLogoView}>
                    
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View>
            <ScrollView style={styles.container}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <Text style={{ textAlign: 'right' }}></Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10,backgroundColor:"transparent" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEFEF', height: window.height*0.11, 
                        width: window.height*0.11, borderRadius: window.height*0.11 / 2 }}>
                           {login?
                            <Image 
                            style={styles.imageLogoStyle,{height:'100%',width:'100%',borderRadius: window.height*0.11 / 2 }}
                            source={{uri:'https://thaikadar.com/public/profileimage/'+user.profile_photo_path}} 
                              />
                              :

                          
                           <Icon
                                name={'person-outline'}
                                style={styles.profileIcon}
                            />

                        }


                        </View>
                        {login ? 
                        <View>
    <Text style={{ color: '#050A30' }}>{user.name}</Text>
    <Text style={{ color: '#050A30' }}>{user.email}</Text>
    <Text style={{ color: '#050A30' }}>{user.phone_number}</Text>
                        </View>
                        : 
                         <Text style={{ color: '#050A30' }}>Login</Text>
                        }
                          {login ? 
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                                onPress={() => navigation.navigate('EditUserScreen')}
                            />
                        </View>
                        : 
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                                onPress={() => alert('Login')}
                            />
                        </View>
                        }
                    </View>
                </View>
                
              
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                <View style={{ paddingHorizontal: 15 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                   onPress={() => 
                   {
                       if(login)
                       {navigation.navigate('MesAnnonceScreen')
                   }
                   else
                   {
                    alert('Login') 
                   }
                   }
                   }>
                        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#050A30' }}>My Posts</Text>
                        </View>
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                <View style={{ paddingHorizontal: 15 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => Linking.openURL("https://thaikadar.com/terms-of-service")}>
                        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#050A30' }}>Terms and Conditions</Text>
                        </View>
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                <View style={{ paddingHorizontal: 15, justifyContent: 'center', }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => Linking.openURL("https://thaikadar.com/privacy-policy")}>
                        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#050A30' }}>Privacy Policy</Text>
                        </View>
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                <View style={{ paddingHorizontal: 15, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => Linking.openURL("https://thaikadar.com/secureinvestment")}>
                        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#050A30' }}>Invest with Us</Text>
                        </View>
                        <View>
                            <Icon
                                name={'ios-chevron-forward'}
                                style={styles.profileIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <Text style={{ textAlign: 'right' }}>Share with your Friends</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={onShare}>
                            <Image source={fbImage} style={styles.socialLogoStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShare}>
                            <Image source={instagramImage} style={styles.socialLogoStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShare}>
                            <Image source={whatsappImage} style={styles.socialLogoStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShare}>
                            <Image source={snapchatImage} style={styles.socialLogoStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                {!login
                ?
                <TouchableOpacity
                onPress={()=>
                  {
                      navigation.dispatch(
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
  
                      // props.navigation.navigate('SignIn')
                }
              }
                style={{ borderColor: 'red', borderWidth: 1, flexDirection:'column',
                marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', 
                marginHorizontal: 45, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                    <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>
                    Login</Text>
  
                 
  
                </TouchableOpacity>
                :

             
                <TouchableOpacity onPress={() => handleAsncClear()} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: 'red', borderRadius: 30, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 22, color: '#fff', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Log Out</Text>
                </TouchableOpacity>

}
                <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserScreen;





