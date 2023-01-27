import React, { Component } from 'react';
import {Alert, Dimensions,View, ScrollView, Text, StyleSheet, TextInput, Image, AppRegistry, ImageBackground, TouchableOpacity,ToastAndroid,ActivityIndicator, Platform,
  KeyboardAvoidingView } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const window = Dimensions.get('window');
import { images, SIZES, COLORS, FONTS,AppConfig } from '../../constant'

import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
GLOBAL = require('../../constant/Global');
const color=COLORS.buttonColor
import { CommonActions } from '@react-navigation/native';

import Iconic from 'react-native-vector-icons/dist/Ionicons';
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        //padding: 5,
        margin: 2,
        //marginLeft:5,
        //  marginRight:5,
        //marginTop: 5,
        //marginBottom: 5,
        borderRadius: 1,
        //        backgroundColor: '#FFF',
        elevation: 1,
        width: 61,
        backgroundColor: '#DCDCDC'

    },
    title0: {
        fontSize: 9,
        color: '#000',
        alignSelf: 'center'
    },
    title: {
        fontSize: 12,
        color: '#000',
    },
    room: {
        fontSize: 19,
        color: '#000',
        alignSelf: 'center'

    },
    parent : {
        height :window.height/3,
        width : window.width/1,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
        backgroundColor:COLORS.buttonColor,
        top:-90
    },
    child : {
        flex : 1,
        transform : [ { scaleX : 0.5 } ],

        backgroundColor : COLORS.buttonColor,
        alignItems : 'center',
        backgroundColor:"transparent",
       
        
    },
    parent : {
        height :window.height/3,
        width : window.width/1,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
    
        top:-90

    },
    child : {
        flex : 1,
        transform : [ { scaleX : 0.5 } ],

        backgroundColor : COLORS.buttonColor,
        alignItems : 'center',
        backgroundColor:"transparent",
       
        
    },
    title2: {
        fontSize: 7,
        color: '#000',
        fontStyle: 'italic',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        //marginLeft: 12,
        justifyContent: 'center',
        alignContent: 'flex-start',
        alignSelf: 'center'


    },
    container_text1: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 50
    },

    container_text2: {

        flexDirection: 'column',
        //marginLeft: 12,
        //alignContent:'flex-end',
        //alignItems:'flex-start',
        width: '100%'

    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 40,
        width: 40,
        alignSelf: 'center',


    },
    in: {
        backgroundColor: 'red',
        //borderBottomWidth:1,
        borderColor: 'red',
        borderWidth: 1

    },
    out: {
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1



    },
    notin: {

        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 1


    }


});

export default class ListRow extends Component {
    static navigationOptions = { header: null }



    constructor(props) {
        super(props);

        this.state = {
          phoneNo:0,
            isloading: false,
            dataSource: [],
            language: "",
            day: "",
            modalVisible: false,
            value: "shahzeb",
            secure: true,
            name:'',
            email:'',
            password:'',
            contact:'',
            lang:'En',
            userInfo:'',
            permissions:{},
            fcmTkn:""

        }
       
         
    }
    componentDidMount  () {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           
              this.setState({
               email:"",
               password:""
           })

          
            this.fcm_TokenConfig()

            // this.setNotification()

          
           

          //console.log("AllDATA::::::",this.state.ProbyStorProId)
        });
      }
      
    
      
  
      componentWillUnmount() {
        this._unsubscribe();
      }



   
  

    onClick = (item) => {
        console.log(item)
        this.props.navigation.navigate('Details', { post: 'shahzeb' })


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

           this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'MainStack' },
                // {
                //   name: 'Profile',
                //   params: { user: 'jane' },
                // },
              ],
            })
          );

        
     }
   



         checkPermission = async()=> {
            const enabled = await firebase.messaging().hasPermission();
            if (enabled) {
      
              console.log("Its getting Fcm here::::")
              this.getToken();
            } else {
              console.log("Its getting Permission here::::")
              this.requestPermission();
            }
          }
          
            //3
           getToken = async()=> {
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
           requestPermission = async()=> {
            try {
                await firebase.messaging().requestPermission();
                // User has authorised
                this.getToken();
            } catch (error) {
                // User has rejected permissions
                console.log('permission rejected');
            }
          }
          
        Login =  async ()=> {


console.log("Your emailis here:::::::",this.state.email)

        if(this.state.email.replace(/^\s+|\s+$/g, "")==='')
        { 
          Alert.alert(
            
           AppConfig.AppName,"Enter Email"
           
           )
          return;
    
    
        }
       
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if (reg.test(this.state.email) === false) {
              Alert.alert(
               AppConfig.AppName,'Email is not correct'
               

                      
                    );
              return;
              
        
            }
          
    
       
      
            this.setState({
                isloading:true
            })
         
            fetch(  AppConfig.baseUrl+'finduser',
             {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  
                    email:this.state.email.toLowerCase().replace(/^\s+|\s+$/g, ""),
                 
                }),
              })
              .then((response) => response.json())
              .then(async (responseJson) => {  
               
                this.setState({
                  isloading:false
              })
                console.log(responseJson)

               
                if (responseJson.status === true){
                  
                  await AsyncStorage.setItem('forgetemail', responseJson.user._id)
                  this.setState({phoneNo:responseJson.user.contact})
                  this.handleSendCode();
                  console.log("value",responseJson.user.contact);
                 
                         

                }else{
                    this.setState({
                        isloading:false
                    })
                    Alert.alert(AppConfig.AppName,responseJson.message)

                }


              })
              .catch((error) => {
                this.setState({
                  isloading:false
              })
                console.log(error)
                console.log('error')
        
                  ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);

              });
    
         
    
      }
    

    check = () => {
        this.setState({
            secure: !this.state.secure
        }), console.log(this.state.secure)
    }


  
    
      fcm_TokenConfig = async()=>{
        let fcmToken = await messaging().getToken();
        console.log("It Call",fcmToken)
        this.setState({
          fcmTkn:fcmToken
        })
      
            this.checkPermission()
           
          
      }

    
   
      handleSendCode = () => {
        // let number = data.contact;
    //+923139704187

    this.setState({isloading:true})

    var pattern = new RegExp(/^[0-9\b]+$/);
    
  
      
    
    
    
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
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:1})

                          
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
                          this.props.navigation.navigate("OtpVerification",{confirmResult:confirmResult,isforget:1})

                      })
                      .catch(error => {
                          alert(error.message)
    
                          this.setState({isloading:false})
                          console.log(error)
                      })
   
                           console.log('android');
             
                    
                    }
    
      

                
      };


    render() {

        console.log('signup')
        return (

<View style={{flex:1,backgroundColor:'white'}}>

<KeyboardAvoidingView enabled >
<View style={styles.parent}>

  

</View>




<View style={{width:"100%",height:window.height*0.7,backgroundColor:"transparent",}}>

            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={{ height:window.height*0.9,backgroundColor:"transparent"}}>

                   



                    <View style={{ padding: 8, flex: 1 ,backgroundColor:'transparent'}}>


                        <View style={{ flex: 1, justifyContent: 'flex-start', justifyContent: 'center', alignItems: 'flex-start' }}>
                          

                        </View>

                       <Text style={{ fontSize: 13,fontFamily:COLORS.myfont, 
                       
                       color:COLORS.fontcolor,marginLeft:15,marginBottom:1 }}> Enter Email here
                     
                       </Text>


                        
                        <View style={{marginBottom:'2%',
                        borderWidth:1,borderColor:COLORS.borderColor,borderRadius:8,
                        alignSelf:'center', borderWidth:1,width:'90%',height:45,flexDirection:'row' }}>

                            {/* <View style={{flex: 0.5,alignSelf:'center' }}>
                            <Image style={{ height: 18, width: 18, alignSelf: 'center' }}
                             source={icon.inboxBottom}
                              />



                            </View> */}

                            <View style={{flex: 3,height:'100%',alignSelf:'center' }}>
                            <TextInput style={{ height: '100%',fontSize:14, width: '90%',fontFamily:COLORS.myfont,paddingLeft:15 }}
                               
                                  placeholderTextColor="gray"
                                    color="black"
                                keyboardType="name-phone-pad"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({ email })} />

                            </View>



                        </View>

   




<View style={{ backgroundColor:"transparent",justifyContent: 'flex-end', alignItems: 'center' }}>

{
               this.state.isloading === true ?
           <ActivityIndicator size="small" color={COLORS.buttonColor}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"55%"}} />
           :
         

<View style={{ height: 50, width: '70%',marginTop:10}}>
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: COLORS.buttonColor, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }} onPress={() => {this.Login() }}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont, }}>
    
Recover Now
            
    
  
</Text>
    </TouchableOpacity>



</View>


}


</View>







                    </View>



                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>

                       

                    </View>



                </View>
            {/* </ ScrollView> */}
            </View>

             <Image style={{ height: 96, width: 140,top:50,
            marginTop:40, alignSelf: 'center',position:'absolute',justifyContent:'center',alignContent:'center'
      }} source={images.foodwalalogo} />

     

      <Text style={{ fontSize: 22,alignSelf:'center',
      color:'#2E3333',
      marginBottom:1,position:"absolute",top:210 ,fontFamily:COLORS.myfont,fontWeight:'700'}}> Recover Password </Text>







<View style={
  Platform.OS === "android" ?
  {height:50,width:50,backgroundColor:"white",justifyContent:"center",position:"absolute",
     shadowOffset:{   width: 11,
      height: 8},shadowOpacity:0.1,elevation:5, shadowColor: 'gray',
      borderRadius:10,
   opacity:10,  
top:5,marginTop:20  ,left:30,}
:
{height:50,width:50,backgroundColor:"white",justifyContent:"center",position:"absolute",
shadowOffset:{   width: 11,
  borderRadius:10,
 height: 8},shadowOpacity:0.1,elevation:0.01, shadowColor: 'gray',
opacity:10,  
top:5,marginTop:40  ,left:30,}

}>    
                    <TouchableOpacity
                     onPress={() => {
                       
                        this.props.navigation.goBack()
                    }}>
                {/* <Iconic
                    name="arrow-back"
                    size = {20}
                    style={{alignSelf:"center",left:5}}
                    color={COLORS.white}
                    onPress={() => {
                       
                        this.props.navigation.goBack()
                    }}
                    /> */}

                      <Image style={{
                        height: 30, width: 30,
       
          
                     alignSelf: 'center',
      }} source={images.backiconfood} />

                    </TouchableOpacity>
                    </View>

                    </KeyboardAvoidingView>

            </View>







        )
    }
}
AppRegistry.registerComponent('ListRow', () => ListRow);






