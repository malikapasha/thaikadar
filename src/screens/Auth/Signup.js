import React, { Component } from 'react';
import {Alert, View, Dimensions,ScrollView, Text, StyleSheet, TextInput, Image, AppRegistry, ImageBackground, TouchableOpacity,ToastAndroid,ActivityIndicator,
  KeyboardAvoidingView,Linking } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const window = Dimensions.get('window');
import {  images, SIZES, COLORS, FONTS, AppConfig } from '../../constant'
GLOBAL = require('../../constant/Global');
const color=COLORS.buttonColor
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import { CommonActions } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import CountryPicker from "react-native-region-country-picker";
import appConfig from '../../constant/AppConfig';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        //padding: 5,
        margin: 2,
       
        borderRadius: 1,
      
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


    },
    parent : {
        height :window.height/3.5,
        width : window.width/1,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
     
        top:-50

    },
    child : {
        flex : 1,
        transform : [ { scaleX : 0.5 } ],

        backgroundColor : COLORS.buttonColor,
        alignItems : 'center',
       
       
        
    }


});

export default class ListRow extends Component {
    static navigationOptions = { header: null }



    constructor(props) {
        super(props);

        this.state = {
            isloading: false,
            dataSource: [],
            language: "",
            day: "",
            modalVisible: false,
            value: "shahzeb",
            secure: true,
            confirmSecure:true,
            name:'',
            email:'',
            password:'',
            contact:'',
            lang:'En',
            phoneNo:'',
            confirmPass:'',   
            phoneNo: '',
            callingCode:+92,
            fcmTkn:"",
            countryName:"PK",

        }
    }
    componentDidMount = async()=> {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           
          
           this.getFcmToken()
            this.setState({
                phoneNo:"",
                password:"",
                email:"",
                name:"",
                confirmPass:"",
                phoneNo:"",
                
            })

       


          
          //console.log("AllDATA::::::",this.state.ProbyStorProId)
        });
      }
      componentWillUnmount() {
        this._unsubscribe();
      }

      getFcmToken = async()=>{
        let fcmToken = await messaging().getToken();
        console.log("It Call",fcmToken)
        this.setState({
          fcmTkn:fcmToken
        })
      }
    onClick = (item) => {
        console.log(item)
        this.props.navigation.navigate('Details', { post: 'shahzeb' })

    }
    clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            //.then(() => alert('success'));
            
    }
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
        try {
            await AsyncStorage.removeItem("ProductData");
            console.log('Data removed')
        }
        catch(exception) {
            console.log(exception)
        }
    }
   
    handleAsncClear = ()=>{
        this.clearAllData()
        this.clearAsyncStorage()
        
        
        // this.props.navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [
        //         { name: 'MainStack' },
        //         // {
        //         //   name: 'Profile',
        //         //   params: { user: 'jane' },
        //         // },
        //       ],
        //     })
        //   );

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
              { name: 'TabRoutes' },
              // {
              //   name: 'Profile',
              //   params: { user: 'jane' },
              // },
            ],
          })
        );

        
     }
        SignUp= () => {

          console.log("Your Fcm is here::::",this.state.fcmTkn)
            let plus = '+'
         let number = plus+this.state.callingCode+this.state.phoneNo
    
         console.log('Value: ',number);

        if(this.state.name.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert(
               appConfig.AppName,'Enter name'
            )
          return;
          
    
    
        }
        

        if(this.state.email.replace(/^\s+|\s+$/g, "")==='')
        { 
          Alert.alert(
            
          AppConfig.AppName,'Enter Email' 
           
           )
          return
    
    
        }
        else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if (reg.test(this.state.email) === false) {
              Alert.alert(
            AppConfig.AppName,'Email is not correct' 
                    );
              return;
              
        
            }
            else {
              console.log("Email is Correct");
            }
        }
      
        if(number.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
       AppConfig.AppName,'Enter Phone No'
          )
          return;
          
    
    
        }else{
            let regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            if (regexp.test(number) === false){
                Alert.alert(
                  AppConfig.AppName,'Phone is not correct'
      
                        );
                  return;

            }else{
                console.log("Phone No is Correct");

            }
        

        }

 // var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        // return regexp.test(this.state.phone)
        // }else {
        //               alert('Invalid Phone Number')
        //             }

        if (this.state.password === this.state.confirmPass){
            console.log("Pasword is Same:::")
        }else{
            Alert.alert( 
        AppConfig.AppName,'Password not match.'
             
            )
            return
        }
    
        if(this.state.password.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
          AppConfig.AppName,'Enter password'
          )
          return;
    
        }

       

      

        
    
        else{
    this.setState({
        isloading:true
    })
    
            fetch(  appConfig.baseUrl+'create-user',
             {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  business_name:this.state.name.replace(/^\s+|\s+$/g, ""),
                  business_number:number,
                  business_email:this.state.email.toLowerCase().replace(/^\s+|\s+$/g, ""),
                  password:this.state.password.replace(/^\s+|\s+$/g, ""),
                  user_type:"0",
                  fcm:this.state.fcmTkn,
                  login_method:"0",
                  identifier:"",
               
                }),
              
              })
              .then((response) => response.json())
              .then((responseJson) => {  
               
               
                console.log(responseJson)

                  if(responseJson.message === "User Add")
              {
                this.setState({
                    isloading:false
                })
                let user =responseJson.data
                this.handleAsncClear()
                this.saveUser(user)
                Alert.alert(AppConfig.AppName,"Signed Up Successfully")

                    }
                    else if(responseJson.message === "Email Address Already Exist")
                    {
                      this.setState({
                        isloading:false
                    })
                      Alert.alert(AppConfig.AppName,"Email Address Already Exist")
                    }
                    
              else{
                this.setState({
                  isloading:false
              })
              if(responseJson.status === 1)
              {
                Alert.alert(AppConfig.AppName,"Unknown error occurred")
              }
               
                 
              }
    
    
                 
                  
        
        
                
        
                
              
              })
              .catch((error) => {
                console.log(error)
                console.log('error')
        
                this.setState({
                  isloading:false
              })
              
              Alert.alert(AppConfig.AppName,"Error Occurred! Try again...");

                  ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);

              });
    
          }
    
      }
    

    check = () => {
        this.setState({
            secure: !this.state.secure
        }), console.log(this.state.secure)
    }
    check1 = () => {
        this.setState({
            confirmSecure: !this.state.confirmSecure
        }), console.log(this.state.confirmSecure)
    }


   
    
      

    render() {

        console.log('signup')
        return (

<View style={{flex:1,backgroundColor:'white',}}>

<KeyboardAvoidingView enabled >

<View style={styles.parent}>

  

</View>


<View style={{width:"100%",alignSelf:"center",backgroundColor:"tranparent"}}>
    
            <ScrollView style={{backgroundColor:"tranparent",height:window.height*0.73,}}  >
                <View style={{height:window.height*0.7, backgroundColor:"transparent"}}>

                   
             


                    <View style={{ height:"100%" ,backgroundColor:'tranparent'}}>
                   
  <Text style={{ fontSize: 12,fontWeight:'500',fontFamily:COLORS.myfont, 
  color:COLORS.fontcolor,marginLeft:35,marginBottom:1 }}> Name<Text style={{color:COLORS.fontcolor, justifyContent:'center'}}>*</Text></Text>

                     

                        <View style={{marginBottom:'2%',alignSelf:'center',width:'80%',height:40,flexDirection:'row' }}>

                            {/* <View style={{flex: 0.5,alignSelf:'center' }}>
                            <Image style={{ height: 18, width: 18, alignSelf: 'center' }} source={icon.userBottom} />



                            </View> */}

                            <View style={{flex: 3,height:'100%',alignSelf:'center' }}>
                            <TextInput style={{ height: '100%',fontSize:14, width: '100%',
                             borderWidth:1,borderColor:"#E0E0E0",borderRadius:8,
                            paddingLeft:15,
                            }}
                            
                                     placeholderTextColor="gray"
                                    color="black"
                                keyboardType="name-phone-pad"
                                underlineColorAndroid='transparent'
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })} />

                            </View>



                        </View>

                        
                      
                          <Text style={{ fontSize: 12,fontWeight:'500',fontFamily:COLORS.myfont, color:COLORS.fontcolor,marginLeft:35,marginBottom:1 }}> Email<Text style={{color:COLORS.fontcolor, justifyContent:'center'}}>*</Text></Text>

                        <View style={{marginBottom:'2%',alignSelf:'center',width:'80%',height:40,flexDirection:'row' }}>

                            {/* <View style={{flex: 0.5,alignSelf:'center' }}>
                            <Image style={{ height: 18, width: 18, alignSelf: 'center' }}
                             source={icon.inboxBottom}
                              />



                            </View> */}

                            <View style={{flex: 3,height:'100%',alignSelf:'center',
                            borderWidth:1,borderColor:"#E0E0E0",borderRadius:8 }}>
                            <TextInput style={{ height: '100%',fontSize:14, width: '100%',paddingLeft:15 }}
                              
                                  placeholderTextColor="gray"
                                    color="black"
                                value={this.state.email}
                                keyboardType="name-phone-pad"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({ email })} />

                            </View>



                        </View>
                                <Text style={{ fontSize: 12,fontWeight:'500',fontFamily:COLORS.myfont, color:COLORS.fontcolor,marginLeft:35,marginBottom:1 }}> Contact<Text style={{color:COLORS.fontcolor, justifyContent:'center'}}>*</Text> </Text>

                        <View style={{marginBottom:'2%',alignSelf:'center', borderBottomWidth: 0.3,width:'80%',
                        height:40,flexDirection:'row',borderWidth:1,borderColor:COLORS.borderColor,borderRadius:8 }}>

<View style={{height:"100%",width:"14%",alignSelf:'center',justifyContent:"center",alignItems:"center" }}>

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
    showCallingCode: false,
    showCountryName: true,
 showCountryCode: true,
  }}
  onSelectCountry={(data: any) => {
     
    console.log("DATA", data.callingCode);
    let code = data.callingCode
    this.setState({
      countryName:data.code
    })
    console.log("CallingCode:::",code)
    this.state.callingCode = code
     console.log("SetCalingCode", this.state.callingCode);
     

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

<View style={{flex: 3,height:'100%',alignSelf:'center' }}>
<TextInput maxLength={10} style={{ height: '100%',fontSize:14, width: '100%' }}
   
      placeholderTextColor="gray"
                                    color="black"
    value={this.state.phoneNo}
    keyboardType="phone-pad"
    underlineColorAndroid='transparent'
    onChangeText={(phoneNo) => this.setState({ phoneNo })} />

</View>



</View>



        <Text style={{ fontSize: 12,fontWeight:'500',fontFamily:COLORS.myfont, color:COLORS.fontcolor,marginLeft:35,marginBottom:1 }}> 
        Password<Text style={{color:COLORS.fontcolor, justifyContent:'center'}}>*</Text> </Text>


<View style={{marginBottom:'2%',alignSelf:'center', borderWidth:1,borderColor:COLORS.borderColor,borderRadius:8
,width:'80%',height:40,flexDirection:'row' }}>

                            {/* <View style={{flex: 0.5,alignSelf:'center' }}>

                            <Image style={{ height: 18, width: 16,opacity:0.7, alignSelf: 'center' }} source={icon.lockicon} />




                            </View> */}

                            <View style={{flex: 3,alignSelf:'center',height: '100%', width: '90%', flexDirection: 'row' }}>
                            <TextInput style={{ height: '100%', width: '90%' }}
                                   
                                      placeholderTextColor="gray"
                                    color="black"
                                    value={this.state.password}
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={this.state.secure}
                                    onChangeText={(password) => this.setState({ password })} />

                                <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => this.check()}>

                                    {/* <Image  source={this.state.secure ?  icon.eyes    : icon.eyes} style={ this.state.secure ? {
                                      height: 18, width: 22, alignSelf: 'center',tintColor:COLORS.darkgray,
                                  
                                  }:  { height: 18, width: 22, alignSelf: 'center',tintColor:COLORS.buttonColor} }/> */}


                                    <Icon
                                    name={!this.state.secure ? 'eye-outline' : 'eye-off-outline'}
                                    style={ 
                                      this.state.secure ? {height: 18, width: 18, 
                                      alignSelf: 'center',tintColor:COLORS.darkgray }: 
                                       { height: 18, width: 18, alignSelf: 'center',tintColor:COLORS.buttonColor} }
                                    size={20}
                                 
                                    />

                                </TouchableOpacity>


                            </View>
                            



                        </View>


        <Text style={{ fontSize: 12,fontWeight:'500',fontFamily:COLORS.myfont, color:COLORS.fontcolor,marginLeft:35,marginBottom:1 }}> 
        Confirm Password<Text style={{color:COLORS.fontcolor, justifyContent:'center'}}>*</Text> </Text>

<View style={{marginBottom:'2%',alignSelf:'center', borderWidth:1,borderColor:COLORS.borderColor,borderRadius:8,width:'80%',height:40,flexDirection:'row', }}>

{/* <View style={{flex: 0.5,alignSelf:'center' }}>

<Image style={{ height: 18, width: 16,opacity:0.7, alignSelf: 'center' }} source={icon.lockicon} />




</View> */}

<View style={{flex: 3,alignSelf:'center',height: '100%', width: '90%', flexDirection: 'row' }}>
<TextInput style={{ height: '100%', width: '90%' }}
  placeholderTextColor="gray"
                                    color="black"
       
                      
            
          
        
        value={this.state.confirmPass}
        underlineColorAndroid='transparent'
        secureTextEntry={this.state.confirmSecure}
        onChangeText={(confirmPass) => this.setState({ confirmPass })} />

    <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => this.check1()}>

                    <Icon
                                    name={!this.state.secure ? 'eye-outline' : 'eye-off-outline'}
                                    style={ 
                                      this.state.secure ? {height: 18, width: 18, 
                                      alignSelf: 'center',tintColor:COLORS.darkgray }: 
                                       { height: 18, width: 18, alignSelf: 'center',tintColor:COLORS.buttonColor} }
                                    size={20}
                                 
                                    />


    </TouchableOpacity>


</View>




</View>





<View style={{ flex: 1, justifyContent: "center", alignItems: 'center',backgroundColor:"tranparent" }}>

<View style={{ height: 49, width: '80%', marginBottom: '1%' }}>
{/* this.props.navigation.navigate("Home") */}
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: COLORS.buttonColor, width: '100%', 
    height: '100%', alignContent: 'center',
     justifyContent: 'center' }} onPress={() => {this.SignUp() }}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center' }}>
    
   Sign Up
            
    
  
</Text>
    </TouchableOpacity>


</View>


<View style={{ height: '40%', width: '80%' ,backgroundColor:"transparent"}}>
    <View style={{height:"50%",width:"100%",backgroundColor:"transparent"}}>
    
          <Text style={{fontSize:11,alignSelf:'center'}}>
    
 By Continuing, you agree to accept our 
   <TouchableOpacity  onPress={() => 
                 
                 Linking.openURL("https://thaikadar.com/terms-of-service")
                  }>
 <Text style={{fontSize:11,alignSelf:'center',fontWeight:'bold',color:COLORS.buttonColor}}>
 {"  "}Terms of Service & Privacy Policy.</Text>
</TouchableOpacity>
   
    
  
</Text>
          
         </View>
      

              <View style={{height:30,width:"100%",backgroundColor:"tranparent",justifyContent:"center"}}>
              <TouchableOpacity  onPress={() => 
                 
                 this.props.navigation.goBack()
                  }>
              <Text style={{color:COLORS.black, 
                fontFamily:COLORS.myfont,fontSize: 13, 
                fontWeight: '400', alignSelf: 'center' }}>
    
   Already have an account?  <Text style={{color:COLORS.buttonColor, 
                fontFamily:COLORS.myfont,fontSize: 13, fontWeight:'bold',
                fontWeight: '400', alignSelf: 'center' }}>Log in</Text>
</Text>
</TouchableOpacity>
          </View>
          



</View>



</View>







                    </View>



                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>

                       

                    </View>



                </View>
                <KeyboardSpacer/>
            </ ScrollView>
            
            
           
            </View>
            <View style={Platform.OS === "android" ?
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
                    }}
                    >
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
             
                   resizeMode: 'contain',
                     alignSelf: 'center',
      }} source={images.backiconfood} />

                    </TouchableOpacity>
                    </View>
            {/* <Text style={{fontSize:20,alignSelf:'center',color:COLORS.white,position:"absolute",top:"10%",fontWeight:"500"}}>
                Sign Up
   
           
  
</Text> */}

   <Image style={{ height: 84, width: 133,top:50, alignSelf: 'center',position:'absolute',justifyContent:'center',alignContent:'center'
      }} source={images.foodwalalogo} />

     

      <Text style={{ fontSize: 22,fontFamily:COLORS.myfont,
      fontWeight:'700',
      alignSelf:'center',color:'black',marginLeft:35,marginBottom:1,position:"absolute",
      top:150 }}> Sign Up with Email </Text>



{
               this.state.isloading === true ?
           <ActivityIndicator size="small" color={COLORS.buttonColor}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"55%"}} />
           :
           <View>
               </View>
           }
          
          </KeyboardAvoidingView>

            </View>







        )
    }
}
AppRegistry.registerComponent('ListRow', () => ListRow);







