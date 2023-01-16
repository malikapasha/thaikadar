import React, { useState,useEffect } from "react";
import { TextInput, View, SafeAreaView,FlatList, Image, ScrollView, Text, TouchableOpacity,Dimensions,ActivityIndicator } from "react-native";
import { styles } from "./FavouriteScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
const {height,width} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

import { CommonActions } from '@react-navigation/native';

const FavouriteScreen = ({navigation}) => {
    // const [isHeartSelected, setisHeartSelected] = useState(false)
    const logoImage = require('../../../assets/images/logo/logo.png');
    const messageImage = require('../../../assets/images/draw-empty-box/draw-empty-box.png');
   
    const not_connected = require('../../../assets/images/draw-not-connected/draw-not-connected.png');

    const [isHeartSelected, setIsHeartSelected] = useState(false);
           const [listdata, setlistdata] = useState([]);
           const [temArr, setTemArr] = useState([]);
           const [isLogin,setIsLogin] = useState("")
           const [progress,setProgress] = useState(false)

    const navigateToDetail = async (item) => {
        
         await AsyncStorage.setItem('selectpostid',item.id+'');
         await AsyncStorage.setItem('selectposttitle',item.post_title);
    

        navigation.navigate('HomeDetailsScreen')
    }

    
  
    const isFocused = useIsFocused();
    useEffect(() => {

        get_SearchData()
        handleGetUser()
       
      }, [isFocused]);



     const handleGetUser = async()=>{
        let userValue =  await AsyncStorage.getItem('user')
        let parse = JSON.parse(userValue)
         console.log('userValue Here:::',parse)
         let islogin =  await AsyncStorage.getItem('islogin')
         let parseislogin = JSON.parse(islogin)
         console.log('parseislogin:::',parseislogin)
         setIsLogin(parseislogin)
         console.log('parseislogin:::',islogin)


        
      }
      const get_SearchData = async () => {
      
        let user =  await AsyncStorage.getItem('user')
        let user_Info = JSON.parse(user)
        console.log('user info is :::',user_Info)

          setProgress(true)
          setlistdata([])
          setTemArr([])

        fetch(
            'https://thaikadar.com/api/my-favorites/'+user_Info.id
            )
            
            
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("SearchList::",responseJson.data)
              setProgress(false)
            //   setprogress(false)
              setlistdata(responseJson.data)
                setTemArr(responseJson.data)
             
            })
            .catch((error) => {
                setProgress(false)
              console.log(error)
              console.log('errorgetAllrest.....................................')
      
            });
      
    
        }



     
const handleNav =(index)=>{
    console.log(`image ${index} pressed`)
    props.navigation.navigate("WebView")

    
}
const handleCategory =(item)=>{
   console.log("ItemData::::::::::::",item.category_id)
  let cate_id = item.id
    get_DataByCategory_Id(cate_id)

    
}

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
            {/* <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.icons}
                        onPress={() => navigation.goBack()}
                    />
                </View> */}
                {/* <View>
                    <Icon
                        name={'heart-outline'}
                        style={styles.icons}
                    />
                </View> */}
                <View>
                    <Text style={styles.headerText}>Favorite</Text>
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                    
                </View>
            </View>


            {
                isLogin==null?
                <View style={{height:"100%",backgroundColor:"white"}}>
                      <Image source={not_connected}  style={{ height:"45%",
        resizeMode:'contain',
        width:'100%'}} />
        {/* <Text style={{fontWeight:"600",alignSelf:"center",fontSize:17 }}>
        Veuillez d'abord vous connecter pour continuer la demande.
                        </Text> */}

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

                    </View>
                    :
           
            <View style={{alignItems:"center",backgroundColor:"white",height:height*0.99,paddingBottom:125}}>
                    <FlatList
                  
                  data={temArr}
                 keyExtractor={item => `${item.id}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 numColumns={2}
                 renderItem={({item}) => 
                 
                        
                            <View style={{
                               height:180,
                               width:width*0.45,
                               padding:5,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                                marginHorizontal:5,
                                marginVertical:5
                               
                            }}>
                                <TouchableOpacity
                                 onPress={ ()=>
                                 {
                                      
	
                                    navigateToDetail(item)
                                 }
                                 }
                                 >
                                    {/* <Icon
                                        name={isHeartSelected ? 'heart' : 'heart-outline'}
                                        style={isHeartSelected ? styles.heartIconSelected : styles.heartIcon}
                                        onPress={() => setIsHeartSelected(!isHeartSelected)}
                                    /> */}
                                    <Image source={{ uri: "https://thaikadar.com/public/postimage/"+item.post_image }}
                                     resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: height*0.1 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <View style={{height:"20%",width:"100%",justifyContent:"center",backgroundColor:"transparent"}} >
                        <Text style={{ color: '#050A30' }}> {item.post_title}</Text>
                        </View>
                        <View style={{height:"20%",backgroundColor:"transparent",width:"100%",justifyContent:"center"}}>
                        <Text style={{ color: '#c3c3c3' }} numberOfLines={1}>{item.post_description}</Text>
                        </View>
                        <View style={{height:"20%",backgroundColor:"transparent",width:"100%",justifyContent:"center"}}>
                        <Text style={{ color: '#050A30',alignSelf:"flex-end" }} numberOfLines={1}>Rs. {item.price}</Text>
                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                          
                          
                      
                   
                      }
                      />
                      {
  progress==true?

    <ActivityIndicator size="small" color={"green"}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"50%"}} />
    :
    <View>
      </View>
}
   
                      </View>
}
        </SafeAreaView>
    )
}

export default FavouriteScreen;