import React, { Component } from 'react';
import {Alert, View, ScrollView, Text, StyleSheet, TextInput, Image, AppRegistry, ImageBackground, TouchableOpacity,ToastAndroid } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import Iconico from 'react-native-vector-icons/dist/Ionicons'
// const color=COLORS.buttonColor
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';

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
            isloading: true,
            dataSource: [],
            language: "",
            day: "",
            modalVisible: false,
            value: "shahzeb",
            secure: true,
            secure1:true,
            name:'',
            email:'',
            password:'',
            contact:'',
            lang:'En',
           


        }
    }
 
    onClick = (item) => {
        console.log(item)
        this.props.navigation.navigate('Details', { post: 'shahzeb' })






    }
    check1() {



        if(this.state.name.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert(
            
                
                this.state.lang==='En'?'Enter name': this.state.lang==='Fr'?   'Entrez le nom' :  'أدخل الاسم'
               
                
              
            )
          return;
          
    
    
        }
        

        if(this.state.email.replace(/^\s+|\s+$/g, "")==='')
        { 
          Alert.alert(
            
            this.state.lang==='En'?'Enter Email': this.state.lang==='Fr'?   'entrez votre email' :  'أدخل البريد الإلكتروني'
           
           )
          return
    
    
        }
        else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if (reg.test(this.state.email) === false) {
              Alert.alert(
                this.state.lang==='En'?'Email is not correct': this.state.lang==='Fr'?   "l'e-mail n'est pas correct" :  'البريد الإلكتروني غير صحيح'
               

                      
                    );
              return;
              
        
            }
            else {
              console.log("Email is Correct");
            }
        }
    
        if(this.state.password.replace(/^\s+|\s+$/g, "")==='')
        {
          Alert.alert( 
              
            this.state.lang==='En'?'Enter password': this.state.lang==='Fr'?   'Entrer le mot de passe' :  'أدخل كلمة المرور')
          return;
          
    
    
        }


      

        
    
        else{
    
    
            
    
        
            fetch('http://89.40.13.6:3080/users',
             {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:this.state.name.replace(/^\s+|\s+$/g, ""),
                    email:this.state.email.toLowerCase().replace(/^\s+|\s+$/g, ""),
                    password:this.state.password.replace(/^\s+|\s+$/g, ""),
                    contact:this.state.contact.replace(/^\s+|\s+$/g, ""),
                     my_token:'0',
                }),
              })
              .then((response) => response.json())
              .then((responseJson) => {  
               
                console.log(responseJson.status)
                  if(responseJson.status)
              {

                //     AsyncStorage.setItem('islogin', 'true');
                    // AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
                      

                //       AsyncStorage.setItem('usname', this.state.name);
                        AsyncStorage.setItem('usemail', this.state.email);
                //           AsyncStorage.setItem('uspassword', this.state.password);

                    //   AsyncStorage.setItem('user_id', responseJson.user._id);

                //       AsyncStorage.setItem('uscontact', responseJson.user.contact + '');

                //    AsyncStorage.setItem('cart_res_key', '');
  
                      ToastAndroid.show('Signed Up Successful, Please LogIn', ToastAndroid.SHORT);

                    //   this.props.navigation.navigate('Logininsert');

                    //   this.props.navigation.dispatch(StackActions.reset);

                    //    const resetAction = NavigationActions.reset({
                    //     index: 0,
                    //        key: null,
                    //     actions: [
                    //         NavigationActions.navigate({ routeName: 'Logininsert' })
                    //     ]
                    //     });

                    //     this.props.navigation.dispatch(resetAction);

                      this.props.navigation.goBack()
                  
                     this.props.navigation.navigate('continue');
                    //    this.props.navigation.reset();

                    //   this.props
                    //       .navigation
                    //       .dispatch(StackActNavigationActionsions.reset({
                    //           index: 1,
                    //           actions: [
                    //               NavigationActions.navigate({
                    //                   routeName: 'Logininsert'
                    //               }),
                    //           ],
                    //           key: null
                    //       }))

                    }
              else{
                Alert.alert( 
                       this.state.lang==='En'?'Email already exist': this.state.lang==='Fr'?   'E-mail existe déjà' :  'البريد الالكتروني موجود مسبقا'
                
                       )

                 
              }
    
    
                 
                  
        
        
                
        
                
              
              })
              .catch((error) => {
                console.log(error)
                console.log('error')
        
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
            secure1: !this.state.secure1
        }), console.log(this.state.secure1)
    }

    componentDidMount(){
   
        // this.getData()
    
      }
    
      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('language')
          if(value !== null) {
            this.setState({lang:value})
    
            
          }
          else{
            await AsyncStorage.setItem('language', 'En')
    
          }
        } catch(e) {
          console.log(e)
    
        }
      }


    render() {

        console.log('signup')
        return (

<View style={{flex:1,backgroundColor:'white'}}>

<View style={{height:"8%",width:"100%",backgroundColor:"transparent",flexDirection:"row"}}>
<TouchableOpacity style={{height:"100%",width:"10%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}} onPress={()=>this.props.navigation.goBack()}>
<View style={{height:"100%",width:"100%",backgroundColor:"transparent",justifyContent:"flex-end",alignItems:"flex-end"}}>
   
<Iconico name={"arrow-back"}
     size = {25}
     color = {"#388e3c"}
/>

    
    </View>
    </TouchableOpacity>
    <View style={{height:"100%",width:"80%",backgroundColor:"transparent",justifyContent:"flex-end"}}>
        
<Text style={{fontSize:15,alignSelf:'center',color:'white'}}>{
    
    this.state.lang==='En'?'Update Password': this.state.lang==='Fr'?   'S’inscrire' :  '	تسجيل الاشتراك'
   
    	   
  
}</Text>
</View>
<View style={{height:"100%",width:"10%",backgroundColor:"transparent"}}>
    </View>
</View>

            < ScrollView style={{top:'10%'}} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={{ flex: 1 }}>

                   



                    <View style={{ padding: 10, flex: 2 ,backgroundColor:'white'}}>


                        <View style={{ flex: 1, justifyContent: 'flex-start', justifyContent: 'center', alignItems: 'flex-start',backgroundColor:"transparent",alignSelf:"center" }}>
                        <View style={{height:120,width:120,backgroundColor:"#388e3c",justifyContent:"center",alignItems:"center",borderRadius:120/2}}>
                    <IconAwe
                       name={"lock"}
                       size = {65}
                       color="white"
                       
                      />
                        </View>

                        </View>

                       


<View style={{marginBottom:'3%',alignSelf:'center', borderBottomWidth: 1,width:'80%',height:'12%',flexDirection:'row' }}>

<View style={{flex: 0.5,alignSelf:'center',height:20,width:10,backgroundColor:"transparent" ,justifyContent:"center"}}>


<IconAwe
                       name={"lock"}
                       size = {20}
                       color="gray"
                       
                      />


</View>

<View style={{flex: 3,alignSelf:'center',height: '100%', width: '90%', flexDirection: 'row' }}>
<TextInput style={{ height: '100%', width: '90%' }}
        placeholder=
"New Password"
                      
            
          
        
        underlineColorAndroid='transparent'
        secureTextEntry={this.state.secure1}
        onChangeText={(password) => this.setState({ password })} />

    <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => this.check1()}>
    <Icon
                                    name={!this.state.secure1 ? 'eye-outline' : 'eye-off-outline'}
                                    style={styles.eyeIcon}
                                    size={25}
                                  
                                    />

    </TouchableOpacity>


</View>



</View>




                        
                        




<View style={{marginBottom:'3%',alignSelf:'center', borderBottomWidth: 1,width:'80%',height:'12%',flexDirection:'row' }}>

<View style={{flex: 0.5,alignSelf:'center',height:20,width:10,backgroundColor:"transparent" ,justifyContent:"center"}}>

<IconAwe
                       name={"lock"}
                       size = {20}
                       color="gray"
                       
                      />




</View>


                            <View style={{flex: 3,alignSelf:'center',height: '100%', width: '90%', flexDirection: 'row' }}>
                            <TextInput style={{ height: '100%', width: '90%' }}
                                    placeholder={
    
                                        this.state.lang==='En'?'Confirm Password': this.state.lang==='Fr'?   'Mot de passe' :  'كلمة السر'
                                         	 	
                                        
                                      
                                    }
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={this.state.secure}
                                    onChangeText={(password) => this.setState({ password })} />

                                <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} onPress={() => this.check()}>

                                <Icon
                                    name={!this.state.secure ? 'eye-outline' : 'eye-off-outline'}
                                    style={styles.eyeIcon}
                                    size={25}
                                  
                                    />



                                </TouchableOpacity>


                            </View>



                        </View>







                       



                      





<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

<View style={{ height: 40, width: '80%', marginBottom: '7%' }}>
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#388e3c", width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }} onPress={() =>this.props.navigation.navigate("SignInScreen") }>

        <Text style={{ fontSize: 17, color: 'white', alignSelf: 'center' }}>
    
    Update
    	   	
    
  
</Text>
    </TouchableOpacity>


</View>





</View>







                    </View>



                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>

                       

                    </View>



                </View>
            </ ScrollView>

            </View>







        )
    }
}
AppRegistry.registerComponent('ListRow', () => ListRow);





