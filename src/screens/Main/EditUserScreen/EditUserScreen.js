import React, { useState,useEffect } from "react";
import { View, SafeAreaView, Image, ScrollView, Text, Dimensions, Alert,TextInput, TouchableOpacity,ActivityIndicator } from "react-native";
import { styles } from "./EditUserScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getVersion } from "jest";
import AsyncStorage from '@react-native-community/async-storage'

import ImagePicker from 'react-native-image-crop-picker';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
import KeyboardSpacer from 'react-native-keyboard-spacer';
const EditUserScreen = ({ navigation }) => {
    const logoImage = require('../../../assets/images/logo/logo.png');

  const [userName,setUserName] = useState("")
  const [userPhone,setUserPhone] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userProfile,setUserProfile] = useState("")
  const [fcmToken,setFcmToken] = useState("")
  const [userStatus,setUserStatus] = useState()
  const [business_Name,setBusinessName] = useState("")
  const [business_Numbder,setBusinessNumber] = useState("")
  const [login_method,setlogin_method] = useState("")
  const [user_Id,setUserId] = useState("")
  const [progress,setProgress] = useState(false)
  
const [user_Info,setuserInfo] = useState("")


   const takePics = () => {

   console.log("data here: clicked");
//    return;
    
    // ImagePicker.openPicker({
    //   width: 200,
    //   height: 200, compressImageMaxHeight: 400,
    //   includeBase64:true,
    //   compressImageMaxWidth: 400, cropping: true, multiple: false,
    // })
    //   .then(response => {
       
       
    //     console.log("responseimage-------" + response)
    //  setUserProfile(response.data)
    //    // console.log("responseimagearray" + this.state.ImageSource)
     
      
    //   })
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
        console.log("FilePathe",image.data)
        console.log("responseimage-------" + image)
        setUserProfile(image.data)
       

      });

     
  }

     const userInformation = async()=>{
        let user =  await AsyncStorage.getItem('user')
          let user_Info = JSON.parse(user)
          console.log('user_Info:::',user_Info)
          setuserInfo(user_Info)
          console.log("UserType is here::::::",user_Info.user_type)
          setUserStatus(user_Info.user_type)
          setlogin_method(user_Info.login_method)
          setUserId(user_Info.id)
          console.log("UserType is here::::::",userStatus)
          
          if(userStatus=== 1 || 2 || 0 ){
              setUserName(user_Info.name)
              setUserEmail(user_Info.email)
              setUserPhone(user_Info.phone_number)
          }

          if(userStatus=== 3 ){
            setUserPhone(user_Info.phone_number)
          }



        //   setUserProfile()

        //  setUserEmail(user_Info.email)
        //  setUserName(user_Info.name)
        //  setUserPhone(user_Info.phone_number)
        //  setUserProfile(user_Info.profile_photo_path)

     }
    const isFocused = useIsFocused();
    useEffect( async() => {
       userInformation()
       checkPermission()
       let fcmToken = await messaging().getToken();
  console.log("It Call",fcmToken)
  setFcmToken(fcmToken)
  console.log("fcmToken Call",fcmToken)
      }, [isFocused]);
      const checkPermission = async()=> {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
    
          console.log("Its getting Fcm here::::")
          getToken();
        } else {
          console.log("Its getting Permission here::::")
          requestPermission();
        }
      }
      
        //3
      const getToken = async()=> {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
      }
      
        //2
      const requestPermission = async()=> {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
      }
      
      const  saveUser =  async (user)=>{
        console.log("userInformation:::::",user)
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
      const UpdateUser=async()=>{
     

    //  console.log("userProfile:::::",userProfile)
     console.log("userName:::::",userName)
     console.log("userPhone:::::",userPhone)
     console.log("userEmail:::::",userEmail)
     console.log("business_Numbder:::::",business_Numbder)
     console.log("business_Name:::::",business_Name)
     console.log("user_Id:::::",user_Id)
     console.log("userStatus:::::",userStatus)
     console.log("fcmToken:::::",fcmToken)

     setProgress(true)

        fetch('https://thaikadar.com/api/update-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        
          body:JSON.stringify({
            user_images:userProfile.replace(/^\s+|\s+$/g, ""),
            business_email:userEmail.replace(/^\s+|\s+$/g, ""),
            business_name:userName.replace(/^\s+|\s+$/g, ""),
            login_method:login_method,
            user_type:login_method,
            id:user_Id,
            fcm:fcmToken,
            profile_photo_path:"",
            business_number:userPhone,
         
         
          }),

        })
        .then((response) => response.json())
        .then((responseJson) => {
          setProgress(false)
          console.log("your user signUp info is here:::::",responseJson)

          if(responseJson.status ===1){
            alert("Profile has been updated")

            let user = responseJson.user
           
            saveUser(responseJson.user)

          }else{
            alert(responseJson.message)
          }

     
         
   
           
    // let user = responseJson.user
    //         
           
        })
        .catch((error) => {
          setProgress(false)
          console.log(error)
          console.log('error')
         // this.setState({progress:false})
    
        });

    
        }
    

    return (
        <SafeAreaView style={styles.safeAreaViewStyle} forceInset={'never'}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View>
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                 <TouchableOpacity onPress={()=>takePics()}>
                    <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEFEF', height: 120, width: 120, borderRadius: 120 / 2 }}>
                           
                           {userProfile === "" ? 
                              <Image
                              source={{uri:'https://thaikadar.com/public/profileimage/'+user_Info.profile_photo_path}}
                                style={styles.profileIcon}
                            /> 
                            :

                        
                             <Image source={{uri:'data:image/png;base64,'+userProfile}}
                   style={{ marginHorizontal:5,
                        marginVertical:5,height: 120, width: 120, borderRadius: 120 / 2 }} />

                      }
                          
                        </View>
                        {/* <View style={{ position: 'absolute', right: 5, top: 0 }}>
                            <Text style={{ color: '#002B64', fontSize: 14 }}>Professionel</Text>
                            <Text style={{ color: '#002B64', fontSize: 14 }}>00.00.00.00</Text>
                        </View> */}
                    </View>
                      </TouchableOpacity>
                    <View style={{ margin: 15 }}>

                        {
                             user_Info.login_method== 3?

                            <View style={{ marginTop: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Prenom:</Text>
                        <Text style={{ color: '#002B64', fontSize: 18 }}>{user_Info.name}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={styles.inputBoxStyle}
                                    // value={user_Info.name}
                                    placeholder="Name"
                                    underlineColorAndroid="transparent"
                                    onChangeText={val => {
                                        setUserName(val)
                                         console.log(val);
                                       }}
                                />
                            </View>
                        </View>
                           
                                :
                                <View style={{ marginTop: 10, }}>
                                <View style={{ marginLeft: 10,justifyContent:"center" }}>
                                    <Text style={{ color: '#002B64', fontSize: 18 }}>Name</Text>
                                </View>
                                <View  style={styles.textBoxStyle}>
                            <Text style={styles.textStyle}> {userName}</Text>
                                </View>
                            </View>

                       
                        
}
                        

{
                            user_Info.login_method==3?
<View style={{ marginTop: 10, }}>
                                <View style={{ marginLeft: 10,justifyContent:"center" }}>
                                    <Text style={{ color: '#002B64', fontSize: 18 }}>Contact</Text>
                                </View>
                                <View  style={styles.textBoxStyle}>
                            <Text style={styles.textStyle}> {user_Info.phone_number}</Text>
                                </View>
                            </View>
                            :
                        <View style={{ marginTop: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18, }}>Contact</Text>
                                <Text style={styles.textStyle}> {user_Info.phone_number}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                            <TextInput
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                    // value={userPhone}
                                    onChangeText={val => {
                                        setUserPhone(val)
                                         console.log(val);
                                       }}
                                />
                               
                            </View>
                        </View>
}
                      
                         {
                           user_Info.login_method==3?
                           <View style={{ marginTop: 10 }}>
                           <View style={{ marginLeft: 10 }}>
                               <Text style={{ color: '#002B64', fontSize: 18 }}>Email</Text>
                               <Text style={{ color: '#002B64', fontSize: 18 }}>{user_Info.email}</Text>
                           </View>
                           <View style={{ marginTop: 10 }}>
                               <TextInput
                                   style={styles.inputBoxStyle}
                                   underlineColorAndroid="transparent"
                                   placeholder="Email"
                                   onChangeText={val => {
                                       setUserEmail(val)
                                        console.log(val);
                                      }}
                               />
                           </View>
                       </View>
                       :

                           <View style={{ marginTop: 10, }}>
                           <View style={{ marginLeft: 10,justifyContent:"center" }}>
                               <Text style={{ color: '#002B64', fontSize: 18 }}>Email</Text>
                           </View>
                           <View  style={styles.textBoxStyle}>
                       <Text style={styles.textStyle}> {userEmail}</Text>
                           </View>
                       </View>
                       

                       
}

                        
                        {/* <View style={{ marginTop: 20,backgroundColor:"transparent" }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Telephone de l'enterprise:</Text>
                                {
                                  business_Numbder===""?
                                  <View>
                                    </View>
                                    :
                                <Text style={{ color: '#002B64', fontSize: 18 }}>{business_Numbder}</Text>
}
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                    onChangeText={val => {
                                        setBusinessNumber(val)
                                         console.log(val);
                                       }}
                                />
                            </View>
                        </View> */}

                        {/* <View style={{ marginTop: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Nom de l'enterprise:</Text>
                                {
                                  business_Name===""?
                                  <View>
                                    </View>
                                    :
                                <Text style={{ color: '#002B64', fontSize: 18 }}>{business_Name}</Text>
}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                    onChangeText={val => {
                                        setBusinessName(val)
                                         console.log(val);
                                       }}
                                />
                            </View>
                        </View> */}
                        <TouchableOpacity onPress={()=>UpdateUser()} style={{ borderColor: '002B64', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardSpacer/>
                </ScrollView>
                {
  progress==true?

    <ActivityIndicator size="small" color={"green"}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"50%"}} />
    :
    <View>
      </View>
}
            </View>
        </SafeAreaView>
    )
}

export default EditUserScreen;
