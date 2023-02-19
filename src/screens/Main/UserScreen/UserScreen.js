import React ,{ useState} from 'react';
import {View,Text,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Dimensions,ScrollView,Platform,ToastAndroid,Alert} from 'react-native';
import { images, SIZES, COLORS, FONTS } from '../../../constant'
import { Button } from 'react-native-elements/';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';
import Iconico from 'react-native-vector-icons/dist/Ionicons'
import Icons from 'react-native-vector-icons/dist/AntDesign';
import RBSheet from "react-native-raw-bottom-sheet";
import IconsEnt from 'react-native-vector-icons/dist/Entypo';
import IconFeat from 'react-native-vector-icons/dist/Feather';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

import {Card} from 'react-native-paper';

import { CommonActions } from '@react-navigation/native';

import LoginFirst from '../../LoginFirst';


import TopBar from '../../TopBar';

   export default class  MyDetail extends React.Component {

    _isMounted = false;

    constructor(props){  
        super(props);  
        this.state = {  
          
          pending_orders:0,
          completed_orders:0,
          cancelled_orders:0,
          updateimage:false,
          user:{},
          islogin:false,

          SetBase2:"",
          setImgName3:"",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            categoryData:[],
            Progress:true,
            
              

          }  
       
      }  
    

        componentDidMount() {
          this._isMounted = true;

  

      this.getData();
  }

  handleAsncClear = ()=>{
    this.clearAllData()
    this.clearAsyncStorage()
 

    this.props.navigation.dispatch(
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


   clearAllData() {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        //.then(() => alert('success'));
        
}

   clearAsyncStorage = async() => {
  
    AsyncStorage.clear();
    try {
           await AsyncStorage.setItem('islogin', JSON.stringify('false'));
        await AsyncStorage.removeItem("ProductData");
        console.log('Data removed')
    }
    catch(exception) {
        console.log(exception)
    }
}



  getData = async () => {

    const value = await AsyncStorage.getItem('islogin')
    let parseislogin = JSON.parse(value)
  
        if(parseislogin !== null) {
console.log('parseislogin:::',parseislogin);
     try
     {
    if(parseislogin === true)
    {
this.setState({islogin:parseislogin});
console.log("try "+parseislogin)
    }
    else
    {
      this.setState({islogin:parseislogin});
      console.log("try here"+parseislogin)
    }
   
 
     }
     catch(ex)
     {
console.log("catch here "+parseislogin)
     }
        }

    console.log('calling profile')
      const userdata = await AsyncStorage.getItem('user')
      console.log(userdata)
          if(userdata !== null) {
        
          
          let parseuserdata = JSON.parse(userdata)
          if(parseuserdata !== null)
          {  
            this.setState({user:parseuserdata})

   console.log('and ',parseuserdata)
            this.state.categoryData.push({
            id: 1,
            ProfileStatus: parseuserdata.name,
            circleColor:"#40e0d0",
            iconName:"profile"
           
            
        });
         this.state.categoryData.push({
            id: 2,
            ProfileStatus: parseuserdata.email,
            circleColor:"#ff6347",
            iconName:"mail"
           
            
        });

         this.state.categoryData.push({
             id: 3,
            ProfileStatus: parseuserdata.contact,
            circleColor:"#4169e1",
            iconName:"phone"
           
            
        });

            }
            this.getAllOrder();
           console.log(this.state.categoryData)
           
             this.setState({Progress:false})
          }
          else{
       
      this.setState({Progress:false})
          }
  }



  getAllOrder= async()=>{
        



    let userValue =  await AsyncStorage.getItem('user')
    console.log("UserInformation:::::",userValue)
    let parse = JSON.parse(userValue)
     console.log('userValue:::',parse.email)
    
   
    fetch(
      
        GLOBAL.BASE_URL+'/myorderscount/'+parse._id
        )
        .then((response) => response.json())
        .then((responseJson) => {

          var completed_orders = 0;
          var delivered_orders = 0;

          var pending_orders = 0;

          try
          {
            if(parseInt(responseJson.total_count[0].completed_orders)>0)
            {
             completed_orders = responseJson.total_count[0].completed_orders;

             console.log("orders: ",completed_orders)
            }
          }
          catch(ex)
          {

          }
          try
          {
            if(parseInt(responseJson.total_count[0].delivered_orders)>0)
              {
             delivered_orders = responseJson.total_count[0].delivered_orders;
             console.log("orders: ",delivered_orders)
              }
          }
          catch(ex)
          {

          }
       
       
           try
           {
            var my_oders = parseInt(completed_orders+delivered_orders);

            console.log("sum is: ",my_oders)

          
              this.setState({completed_orders:my_oders})
           }
           catch(ex)
           {
             
           }

           try
           {
             if(parseInt(responseJson.total_count[0].cancelled_orders)>0)
            this.setState({cancelled_orders:responseJson.total_count[0].cancelled_orders})
           }
           catch(ex)
           {
             
           }

           try
           {
            if(parseInt(responseJson.total_count[0].pending_orders)>0)
            {
              var my_oders = parseInt(completed_orders+delivered_orders);
              my_oders = parseInt(responseJson.total_count[0].pending_orders) - my_oders;
              
            this.setState({pending_orders:my_oders})
            }
           }
           catch(ex)
           {
             
           }

         
      
        //   console.log("userOrders:::::::::::",responseJson.order)
    
        })
        .catch((error) => {
          console.log(error)
          console.log('errorgetAllrest.....................................')
        });

  
       
    }

 uploadImg3 = ()=>{
  console.log("uploadImg3")
 
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true
  }).then(image => {
    console.log("FilePathe",image.data)
    // this.state.SetBase2(image.data)

    this.setState({SetBase2:image.data})
   let imgPath2 = image.data
    console.log("your Path::::::",imgPath2)
    this.getallpost3(imgPath2)
   
  });

}

 getallpost3=(imgPath2)=> {
        
  console.log('getallpost3',imgPath2)
  const dbData = new FormData();

  dbData.append('image',imgPath2);

   fetch("https://earnx.biz/foodwala/uploadbaseimage.php", {
    method: 'POST',
    body: dbData,
  })
    .then(response => response.json())
    .then(responseJson => {

     
        console.log("my Image Path IS here::::",responseJson)
        this.setState({setImgName3:"https://earnx.biz/foodwala/"+responseJson.imagepath,
          updateimage:true
        })
      // this.state.setImgName3(responseJson.imagepath)
          console.log("ImagePath3:::::::::",responseJson.imagepath)
          
          
      
      

        // setProgress(false) 
    })
    .catch(error => {
      // setProgress(false)
      console.error(error);
    });

 
}


updateuser =  ()=> {

   let myimage = this.state.user.image_path;

  if(this.state.updateimage)
  {
    myimage = this.state.setImgName3;
  }
 
              this.setState({
                  isloading:true
              })
           
              fetch("https://food-wala.com/food_grocery_api/updateuser",
               {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    _id:this.state.user._id,
                      name:this.state.user.name,
                      email:this.state.user.email,
                      password:this.state.user.password,
                     contact:this.state.user.contact,
                     image_path:myimage,
                  }),
                })
                .then((response) => response.json())
                .then((responseJson) => {  
                 
                  console.log(responseJson)
  
                 
                  if (responseJson.status === true){
                    
                  
                      let user =responseJson.data

                      // await AsyncStorage.setItem('user', JSON.stringify(user));
                      
                      this.saveUser(user)
                      this.setState({
                          isloading:false
                      })
                   
                           
  
                  }else{
                      this.setState({
                          isloading:false
                      })
                      Alert.alert(AppConfig.AppName,responseJson.message)
  
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
      
      
  
             this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'MainStack' },
                 
                ],
              })
            );
  
          
       }

  render(){
      



    
    return(
        <View style={{backgroundColor:"white"}}>
         
         {Platform.OS === "android" 
                
                ?
                <View style={{
              
                  height:15,width:"100%",backgroundColor:"transparent"}}>
                    </View>
                    :
                    <View style={{
              
                      height:40,width:"100%",backgroundColor:"transparent"}}>
                        </View>
                }



                <View style={{height:50,marginTop:10,width:"100%",backgroundColor:"transparent",flexDirection:"row",borderBottomWidth:0.5,borderBottomColor:COLORS.lightGray}}>
               
                  
                <TopBar
navigation={ this.props.navigation }
screentitle = "My Profile"
isbank = {true}
/>
                   
                </View>






{this.state.islogin ? 
  <ScrollView>
<View>


 



                <View style={{height:150,width:'100%',marginTop:5,borderRadius:20,alignContent:'center',justifyContent:'center',
              alignItems:'center',
              }}>
                   
{this.state.updateimage ?

<Image
  source ={{uri:this.state.setImgName3}}
style={{height:"100%",width:150,

borderRadius:20,borderWidth:0.1,alignSelf:'center',}}
/>

:
this.state.user.image_path === "" ?
                    <Image
                    source ={images.img5}
                    style={{height:"100%",width:150,
                  
                    borderRadius:20,borderWidth:0.1,alignSelf:'center',}}
                    />
                    :
                    <Image
  source ={{uri:this.state.user.image_path}}
style={{height:"100%",width:150,

borderRadius:20,borderWidth:0.1,alignSelf:'center',}}
/>
}
                    </View>

                    <TouchableOpacity onPress={()=>this.uploadImg3()}
  style={{height:45,width:'100%',
  right:0,left:0,
  position:'absolute',alignContent:'center',justifyContent:'center',
  alignItems:'center',
  }}
  
 >
<Image
                    source ={images.camera}
                    style={{height:35,width:35,
                      marginLeft:150,
                      marginBottom:10,
                
                  alignSelf:'center',}}
                    />
 </TouchableOpacity>

                    <Text style={{fontFamily:'Poppins-Regular',fontSize:16,marginLeft:5,textAlign:'center',width:'100%',
                  marginTop:5}}>
                                     {this.state.user.name} 
                                                 </Text>

                                                 <Text style={{fontFamily:'Poppins-Regular',fontSize:11,marginLeft:22,
                                                 color:"#ADADAD",
                  marginTop:5}}>
                                   My Stats
                                                 </Text>

                                              
                                                 <View style={{flexDirection:'row',width:'100%',height:80}}>

                                             
                                              

                                                 <Card style={{flexDirection:'column',width:'25%',marginRight:'1%',
                                                 marginLeft:'1%',height:80,borderRadius:15,
                                                 marginLeft:20,
                                                 elevation:10,
                                                 shadowColor:"#D3D1D8",
                                                borderWidth:0.1,alignContent:'center',justifyContent:'center'}}>

                                                 <Text style={{
                                                 fontFamily:'Poppins-Regular',color:"#00CCCB",fontSize:22,textAlign:'center',
                                                 
                                                 marginTop:15}}>
                                                               {this.state.pending_orders}
                                                                                </Text>

                                                 <Text style={{fontFamily:'Poppins-Regular',fontSize:8,textAlign:'center',

                  marginTop:5}}>
                                   Ongoing Orders
                                                 </Text>
                                                 </Card>

                                                 <Card style={{flexDirection:'column',width:'25%',marginRight:'1%',
                                                 marginLeft:'1%',height:80,borderRadius:15,
                                                 elevation:10,
                                                 shadowColor:"#D3D1D8",
                                                 marginLeft:20,
                                                borderWidth:0.1,alignContent:'center',justifyContent:'center'}}>
                                                 <Text style={{fontFamily:'Poppins-Regular',color:"#00CC76",fontSize:22,textAlign:'center',
                                                 
                                                 marginTop:15}}>
                                                                     {this.state.completed_orders}
                                                                                </Text>

                                                 <Text style={{fontFamily:'Poppins-Regular',fontSize:8,textAlign:'center',

                  marginTop:5}}>
                                 Completed Orders
                                                 </Text>
                                              </Card>

                                              <Card style={{flexDirection:'column',width:'25%',marginRight:20,
                                                 marginLeft:'1%',height:80,borderRadius:15,
                                                 marginLeft:20,
                                                 elevation:10,
                                                 shadowColor:"#D3D1D8",
                                                borderWidth:0.1,alignContent:'center',justifyContent:'center'}}>
                                            <Text style={{fontFamily:'Poppins-Regular',color:"#FC4F51",fontSize:22,textAlign:'center',
                                                 
                                                 marginTop:15}}>
                                                                    {this.state.cancelled_orders}
                                                                                </Text>

                                                 <Text style={{fontFamily:'Poppins-Regular',fontSize:8,textAlign:'center',

                  marginTop:5}}>
                                 Cancelled Orders
                                                 </Text>
                                           


                                                 </Card>

                                                 </View>


                                                 <Text style={{
                                                fontFamily:'Poppins-Regular',color:'#ADADAD',fontSize:11,marginLeft:22,
                  marginTop:25}}>
                                   General
                                                 </Text>

<TouchableOpacity 
onPress = {() => this.props.navigation.navigate('Personal')}
style={{borderBottomWidth:0.2,


  borderBottomEndRadius :10,margin:10,paddingBottom:15}}>

<Text style={{fontFamily:'Poppins-Regular',fontSize:14,marginLeft:10,

                  marginTop:5}}>
                                   Personal Data
                                                 </Text>


</TouchableOpacity>

<TouchableOpacity 
onPress = {() => 
{
    
         this.props.navigation.navigate('MesAnnonceScreen')
   
}
}
style={{borderBottomWidth:0.2,borderBottomEndRadius :10,
  margin:10,paddingBottom:15}}>

<Text style={{fontFamily:'Poppins-Regular',fontSize:14,marginLeft:10,
                  marginTop:5}}>
                                   My Posts
                                                 </Text>


</TouchableOpacity>

<TouchableOpacity 
onPress = {() => 
    Linking.openURL("https://thaikadar.com/secureinvestment")
}
style={{borderBottomWidth:0.2,borderBottomEndRadius :10,
  margin:10,paddingBottom:15}}>

<Text style={{fontFamily:'Poppins-Regular',fontSize:14,marginLeft:10,
                  marginTop:5}}>
                                   Invest with Us
                                                 </Text>


</TouchableOpacity>

<TouchableOpacity style={{borderBottomWidth:0.2,borderBottomEndRadius :10,
margin:10,paddingBottom:15}}
onPress={() => this.handleAsncClear()}
>

<Text style={{fontFamily:'Poppins-Regular',fontSize:14,marginLeft:10,
                  marginTop:5}}>
                                   Log Out
                                                 </Text>


</TouchableOpacity>



{this.state.updateimage
?
<View style={{ height: 50, width: '90%',marginTop:10,alignSelf:'center',
flexDirection:'row'
}}>
    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: COLORS.buttonColor, 
    width: '45%', marginLeft:'2%',marginRight:'2%',
    height: '100%', alignContent: 'center', justifyContent: 'center' }} 
    onPress={() => {

      this.setState({updateimage:false})
    }}>

        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont, }}>
    
Cancel
            
    
  
</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{ borderRadius: 10, 
      backgroundColor: COLORS.buttonColor, 
      width: '45%', height: '100%', marginLeft:'2%',marginRight:'2%',
      alignContent: 'center', justifyContent: 'center' }}
       onPress={() => {this.updateuser() }}>

<Text style={{ fontSize: 14, color: 'white', alignSelf: 'center',fontFamily:COLORS.myfont, }}>

Update Image
    


</Text>
</TouchableOpacity>




</View>

: null}

                    <View style={{height:80,width:"100%",backgroundColor:"transparent",}}>

                      
                {/* <FlatList
                   
                    showsHorizontalScrollIndicator = {false}
                    data={this.state.categoryData}
                     showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => 
                    <TouchableOpacity //onPress={() => navigation.navigate('SalesConfirmerDetails')}
                    
                    >

                    <MyDetailRow item ={item}/>
                    </TouchableOpacity >}
                    ></FlatList> */}

</View>

</View>
</ScrollView>
:
<LoginFirst
navigation={this.props.navigation}
message="Login to have Profile here"
/>

}



<View style={{height:"20%",width:"100%",backgroundColor:"transparent",flexDirection:"row"}}>
{/* <TouchableOpacity onPress = {() => this.props.navigation.navigate('Success')}>
                                                  <View style={{height:45,width:"80%",backgroundColor:COLORS.buttonColor,alignSelf:"center",flexDirection:"row",justifyContent:"center",borderRadius:10}}>
                                                      <Text style={{alignSelf:"center",fontSize:15,fontWeight:"bold",color:COLORS.white}}>
                                                        Cancel
                                                          </Text>
                                              
                                                  
                                                  </View>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress = {() => this.props.navigation.navigate('Success')}>
                                                  <View style={{height:45,width:"80%",backgroundColor:COLORS.buttonColor,alignSelf:"center",flexDirection:"row",justifyContent:"center",borderRadius:10}}>
                                                      <Text style={{alignSelf:"center",fontSize:15,fontWeight:"bold",color:COLORS.white}}>
                                                        Update
                                                          </Text>
                                              
                                                  
                                                  </View>
                                                  </TouchableOpacity> */}
    </View>
    

                </View>
               
    )
  }
}