
import React, { useState,useEffect } from "react";
import { View, Share, SafeAreaView, Image, ScrollView, Text, Dimensions, TouchableOpacity,ToastAndroid,Modal,Linking,Platform ,FlatList} from "react-native";
import { styles } from "./HomeDetailsScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
const logoImage = require('../../../assets/images/logo/logo.png');
const fbImage = require('../../../assets/images/social-icons/facebook.png');
const instagramImage = require('../../../assets/images/social-icons/instagram.png');
const whatsappImage = require('../../../assets/images/social-icons/whatsapp.png');
const snapchatImage = require('../../../assets/images/social-icons/snapchat.png');
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getVersion } from "jest";
import AsyncStorage from '@react-native-community/async-storage'


import { CommonActions } from '@react-navigation/native';


import { SliderBox } from "react-native-image-slider-box";
import { ActivityIndicator } from "react-native-paper";
const HomeDetailsScreen = (props) => {

    const {width, height} = Dimensions.get('window');

    const [isHeartSelected, setIsHeartSelected] = useState(false);

 const [boundingBox, setboundingBox] = useState({
    "southWest": {
        "latitude": "24.234631",
        "longitude": "89.907127"
    },
    "northEast": {
        "latitude": "24.259769",
        "longitude": "89.934692"
    }});
      const ASPECT_RATIO = width / height;

        const northeastLat = parseFloat(boundingBox.northEast.latitude);
    const southwestLat = parseFloat(boundingBox.southWest.latitude);
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;

    const [arrImg,setArrImg] = useState([])
    // const [postdescription.posts, setpostdescription.posts] = useState(props.route.params.item);

      const [modalVisible4, setmodalVisible4] = useState(false);
      
      
      const [arrAnswerData, setarrAnswerData] = useState([]);

      const [userdata, setuserdata] = useState({});

        const [userid, setuserid] = useState(0);

           const [postid, setpostid] = useState(0);

           const [postdescription, setpostdescription] = useState({});

             const [isloading, setisloading] = useState(true);

    const COORDINATES = [
        { latitude: 37.8025259, longitude: -122.4351431 },
        { latitude: 37.7896386, longitude: -122.421646 },
        { latitude: 37.7665248, longitude: -122.4161628 },
        { latitude: 37.7734153, longitude: -122.4577787 },
        { latitude: 37.7948605, longitude: -122.4596065 },
        { latitude: 37.8025259, longitude: -122.4351431 },
    ];
    const [images,setImages] = useState( ["https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
   ])
   const [region,setregion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta ,
        
    });

    // const region = 

    const isFocused = useIsFocused();
    useEffect(() => {
        console.log("Navigation Data:::::::")
       GetMyVenues()
      }, [isFocused]);


      onRegionChangeComplete=(region) =>{
   console.log('Calling', region)
    // console.log('Calling', this.state.marker)
//  this.setState({ 
//         region
//      });
  }

   const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {
        console.log('called ios')
        phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };

   const GetMyVenues =  async()=> {
       
    try
    {
  let userValue =  await AsyncStorage.getItem('user')
let parse = JSON.parse(userValue)
setuserdata(parse)
console.log('userValue:::',parse.id)

console.log('userValue:::',parse.id)

setuserid(parse.id)
    }
    catch(ex)
    {
setuserid(0)
    }
  

  
    
  let selectpostid =  await AsyncStorage.getItem('selectpostid')

  let selectpostidint = parseInt(selectpostid)
  setpostid(selectpostid)
  

   

    

console.log('post id is here :::',selectpostid)
console.log('https://thaikadar.com/api/get-one-post/'+selectpostidint);


   setArrImg([]);

    //    this.setState({
    //        isloading:true
    //    })

    fetch( 'https://thaikadar.com/api/get-post-question/'+selectpostid,
        {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
         
         })
         .then((response) => response.json())
         .then((responseJson) => {  
             if(responseJson.status)
             {
                 setarrAnswerData(responseJson.data);
             }
        })
        .catch((error) => {
          console.log(error)
          console.log('error')
  
            ToastAndroid.show('Error Occurred, fetching information...', ToastAndroid.SHORT);
        //    props.navigation.goBack();

        });

        checkfavorite();

       fetch( 'https://thaikadar.com/api/get-one-post/'+selectpostid,
        {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
         
         })
         .then((response) => response.json())
         .then((responseJson) => {  
          
            // setArrImg([]);

        

    
    setregion({
latitude:parseFloat(responseJson.data.posts.latitude),
longitude:parseFloat(responseJson.data.posts.longitude),
  latitudeDelta: latDelta  ,
        longitudeDelta: lngDelta ,

    })

        console.log("ImagesOfSlider::::::",responseJson)
           console.log("ImagesOfSlider data::::::",responseJson.data.images)
        //   setArrImg(responseJson.data.images)
           let arr =[]
           let arrTemp =[]
           arr = responseJson.data.images;

           setpostdescription(responseJson.data)

        for(let i=0; i<arr.length; i++){
            console.log("images::::::",arr[i].post_image)
            arrTemp.push( "https://thaikadar.com/public/postimage/"+arr[i].post_image)
        }
     
       console.log("ArrTemp:::::::",arrTemp)
         arrImg.push(arrTemp)
        setArrImg(arrTemp)

       console.log("This is arr of img:::::::",arrImg)
    //    var data =responseJson.data    
          
          
         
    setisloading(false);
         })
         .catch((error) => {
           console.log(error)
           console.log('error')
   
             ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
            props.navigation.goBack();
 
         });
 
     }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                'Hi saw this on Thaikadar.com, check this out here https://thaikadar.com/post-page/'+postid,
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

    const checkfavorite = async () => {

        let userValue =  await AsyncStorage.getItem('user')
        let parse = JSON.parse(userValue)

        let selectpostid =  await AsyncStorage.getItem('selectpostid')

        let selectpostidint = parseInt(selectpostid)

        let theurl = "https://thaikadar.com/api/is-favorite";
       

        fetch(theurl,
        {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
           
            post_id:selectpostidint,
            user_id:parse.id,
          
          
           }),
         })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson)
          setIsHeartSelected(responseJson.status)
               })

    }

    const deletepost = async () => {

        let theurl = "https://thaikadar.com/api/delete-posts/"+postid;
      

        fetch(theurl,
        {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
          
         })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status=== true)
            {
                props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'MesAnnonceScreen'},
                        // {
                        //   name: 'Profile',
                        //   params: { user: 'jane' },
                        // },
                      ],
                    })
                  );
            }
            else
            {

            }
            // setIsHeartSelected(responseJson.status)
               })

    }

    const markfavorite = async () => {

        let theurl = "https://thaikadar.com/api/remove-favorite";
        if(!isHeartSelected)
        {
            theurl = "https://thaikadar.com/api/save-favorite";
        }

        fetch(theurl,
        {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
           
            post_id:postid,
            user_id:userdata.id,
          
          
           }),
         })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson)
            // setIsHeartSelected(responseJson.status)
               })

    }

    return (
        <SafeAreaView style={styles.safeAreaViewStyle} forceInset={'never'}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.backIcon}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
                <View>
                    <Icon
                        name={'share-social-outline'}
                        style={styles.shareIcon}
                        onPress={onShare}
                    />
                </View>
            </View>
            {isloading ? <ActivityIndicator>

            </ActivityIndicator>

           :
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    
                <View style={{height:180,backgroundColor:"transparent"}}>
                 
                 <SliderBox
           images={arrImg}
           onCurrentImagePressed={index =>
 
            setmodalVisible4(true)
            // console.log("indexs:::::::",index)
           }
         /> 
 


                   </View>
                   
                    
                    <View style={{ marginHorizontal: 5, marginTop: -30 }}>
                    <View style={{ marginHorizontal: 10,height:40,width:140,backgroundColor:"transparent",justifyContent:"space-evenly",flexDirection:"row",alignItems:"center",}}>
                       
                       {userid == postdescription.posts.user_id || userid == 0 ? 
                         <TouchableOpacity  style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:20,   elevation: 5,
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.5,
                         shadowRadius: 2,
                         shadowColor: '#000',}}
                         onPress={async()=>
                            {
                              deletepost()
                            }
                         }>
                        <View   style={{backgroundColor:"white",height:"100%",width:"100%",justifyContent:"center",alignItems:"center",borderRadius:20,}}>
                       
                       <Icon
                           name={'trash-outline'}
                           size={25}
                          
                       />
                      
                     
                     
                       </View>
                       </TouchableOpacity>
                       : 
                       <TouchableOpacity  style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:20,   elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',}}
        onPress={async()=>
        {
              await AsyncStorage.setItem('selectpost', JSON.stringify(postdescription.posts));
            props.navigation.navigate("Chat_Controller")}
        }>
                       <View   style={{backgroundColor:"white",height:"100%",width:"100%",justifyContent:"center",alignItems:"center",borderRadius:20,}}>
                       
                       <Icon
                           name={'chatbubbles-outline'}
                           size={25}
                          
                       />
                      
                     
                     
                       </View>
                       </TouchableOpacity>
                       }

                       <TouchableOpacity 
                         onPress={()=>
                         {
                             try
                             {
  let phone = postdescription.posts.phone_number;
                            
                            dialCall(phone)

                             console.log("phone number is now: "+postdescription.posts.phone_number)
                             }
                             catch(ex)
                             {

                             }
                    
                           
                          
                            
                            
                         }}
                       style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:20,   elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',}} >
                       <View   style={{backgroundColor:"white",height:"100%",width:"100%",justifyContent:"center",alignItems:"center",borderRadius:20}}>
                       <Icon
                           name={'call-outline'}
                           size={25}
                           style={{alignSelf:"center",alignItems:"center",}}
                          
                       />
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity  
                         onPress={()=>
                         {
                             let whatsappMsg = "Hi, Saw your Ad "+postdescription.posts.post_title+" On Thaikadar.com";

                            // postdescription.posts.phone_number = '+923035949290'

                             Linking.openURL(`whatsapp://send?phone=${postdescription.posts.phone_number}&text=${whatsappMsg}`);

                             console.log("phone number is: "+postdescription.posts.phone_number)
                         }}
                       style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:20,   elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',}}>
                       <View   style={{backgroundColor:"white",height:"100%",width:"100%",justifyContent:"center",alignItems:"center",borderRadius:20}}>
                       <Icon
                           name={'logo-whatsapp'}
                           size={25}
                           style={{alignSelf:"center",alignItems:"center",}}
                          
                       />
                       </View>
                       </TouchableOpacity>
                   </View>
                        
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
  
  

                         <Icon
                         size={34}
                                        name={isHeartSelected ? 'heart' : 'heart-outline'}
                                        style={isHeartSelected ? 
                                            {
                                               
                                                color: 'red',
                                             
                                             
                                                backgroundColor: 'rgba(255,255,255, 0.8)',
                                                margin:10,
                                                borderRadius: 50,
                                                paddingVertical: 5
                                            }
                                            :
                                            {
                                                paddingHorizontal: 5,
                                                color: '#050A30',
                                              
                                                margin:10,
                                             
                                                backgroundColor: 'rgba(255,255,255, 0.8)',
                                             
                                                borderRadius: 50,
                                                paddingVertical: 5
                                            }
                                        }
                                        onPress={() => 
                                            {
                                                setIsHeartSelected(!isHeartSelected)
                                                markfavorite();
                                            }}
                                    />

{/* <Icon name="ios-book" size={50} color="#4F8EF7" /> */}
</View>

    <Text style={{ textAlign: 'right', color: '#7B8999', 
    fontWeight: "bold", fontSize: 21,marginRight:15,marginTop:-55,marginLeft:40 }}>Rs. {postdescription.posts.price}</Text>
                        {/* <Text style={{ textAlign: 'right', color: '#7B8999', fontWeight: "400", fontSize: 18 }}>
                        {postdescription.posts.price_type === "0" ? " Fix Price" : 
                        postdescription.posts.price_type === "1" ? " Negotiable" : " Free"
                         }
                       
                        </Text> */}
                    </View>
                    <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
    <Text style={{ color: '#050A30', fontWeight: "bold", fontSize: 20 }}>{postdescription.posts.post_title}</Text>
   
                        <Text style={{ color: '#050A30', fontWeight: "400", fontSize: 20 }}>Location</Text>
                        <View style={{ margin: 10,height:200,borderRadius:10,borderWidth:1 }}>

                        <MapView
                             showsUserLocation={false}
                             zoomEnabled={true}
                             //showsMyLocationButton={true}
                            initialRegion={region}
                            region={region}
                            //    provider ={PROVIDER_GOOGLE}
                              style={{height:"100%",width:"100%",borderRadius:10}}
                              initialRegion={{
                              latitude: 37.78825,
                              longitude: -122.4324,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                              
                               }}

                               minZoomLevel={15}
  maxZoomLevel={17}
//  onRegionChangeComplete={(region)=>{this.onRegionChangeComplete(region)}}
                                 >
                               
     
      <MapView.Marker coordinate={region} />

                                  </MapView>


                        </View>

                        <Text style={{ color: '#050A30', fontWeight: "400", fontSize: 20 }}>More information</Text>
                            <Text style={{ color: '#7B8999', fontWeight: "400", fontSize: 18 }} >{postdescription.posts.post_description}</Text>
   

                    </View>
                                  <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                          
                            {postdescription.posts.parent_category === postdescription.posts.category_name ?
                               <Text style={{ color: '#7B8999', fontWeight: "400", fontSize: 16 }}>Categorie: {postdescription.posts.category_name}</Text>
       :
       <View style={{flexDirection:'column'}}>
             <Text style={{ color: '#7B8999', fontWeight: "400", fontSize: 16 }}>Categorie: {postdescription.posts.category_name}</Text>
             <Text style={{ color: '#7B8999', fontWeight: "400", fontSize: 11,marginLeft:5}}>({postdescription.posts.parent_category})</Text>
     
            </View>
       
                        }
                            {/* <Text style={{ color: '#7B8999', fontWeight: "400", fontSize: 16 }}>Categorie: {postdescription.posts.category_name}</Text>
        */}
                            </View>
                    </View>
                    <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                        {/* <Text style={{ color: '#050A30', fontWeight: "bold", fontSize: 16 }}>Other Information</Text> */}
                        <View style={{ marginVertical: 10, flexDirection: 'row' }}>

                        <FlatList
                  
                  data={arrAnswerData}
                 
                 
              
                 keyExtractor={item => `${item}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 
                //  renderItem = {item => (<Text>{item.item.text}</Text>)} />
                <View>
                    <View style={{backgroundColor:"transparent",marginVertical:12,flexDirection:"row",width:'100%'}}>  
                 {/* <TouchableOpacity
                    
                 >       
                  <Image source={{uri:'data:image/png;base64,'+item}}
                   style={{ height: 95, width: 100,margin:"4%"
                        }} /> */}
                        <View style={{width:'48%',flexDirection:'row'}}>

                        <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2,marginTop:4 }} />
  <Text style={{ color: '#7B8999', fontSize: 14,fontWeight:'bold',marginLeft: 10, marginBottom: 2 }}>{item.question} </Text>

  <Text style={{ color: '#7B8999', fontSize: 14,fontWeight:'bold',position:'absolute',right:1, marginBottom: 2 }}>: </Text>

                        </View>
                        <View style={{width:'48%',flexDirection:'row'}}>
                        <Text style={{ color: '#050A30', fontSize: 17,marginRight:1}}>{item.answer}</Text>
                      
                        <Text style={{ color: '#050A30', fontSize: 11,marginRight:10,flex: 1, flexWrap: 'wrap'}}>({item.question})</Text>
                        
                        </View>


                          </View>   
                          </View>
                 }
                 ></FlatList>
             
                            {/* <View style={{ flex: 3 }}>
                                <Text style={{ color: '#7B8999', fontSize: 14 }}>Transmission</Text>
                                <Text style={{ color: '#7B8999', fontSize: 14 }}>Vitesses</Text>
                                <Text style={{ color: '#7B8999', fontSize: 14 }}>Cylindree</Text>
                                <Text style={{ color: '#7B8999', fontSize: 14 }}>Cylindres</Text>
                                <Text style={{ color: '#7B8999', fontSize: 14 }}>Carburant</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={{ color: '#050A30', fontSize: 14 }}>Occasion</Text>
                                <Text style={{ color: '#050A30', fontSize: 14 }}>9</Text>
                                <Text style={{ color: '#050A30', fontSize: 14 }}>5</Text>
                                <Text style={{ color: '#050A30', fontSize: 14 }}>4</Text>
                                <Text style={{ color: '#050A30', fontSize: 14 }}>Diesel</Text>
                            </View> */}

                        </View>
                    </View>
                    <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                        {/* <Text style={{ color: '#050A30', fontWeight: "bold", fontSize: 16 }}>Equipment</Text>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#050A30', borderRadius: 8 / 2 }} />
                                <View style={{ marginLeft: 10, marginBottom: 2 }}>
                                    <Text style={{ color: '#050A30', fontSize: 14, textAlign: 'center' }}>Climatisation automatique</Text>
                                </View>
                            </View>
                        </View> */}
                    </View>

                    
                    <View style={{ borderWidth: 0.5, borderColor: '#000', width: '100%', marginVertical: 15 }} />
                    <View style={{ paddingHorizontal: 15, marginBottom:25 }}>
                        <View>
                            <Text style={{ textAlign: 'left' }}>Share Post</Text>
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
                </ScrollView>
             

              <Modal
        visible={modalVisible4}
        animationType={'fade'}
        onRequestClose={() =>   setmodalVisible4(false)}
        transparent>
        <TouchableOpacity
          onPress={() => {
            setmodalVisible4(false);
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height,
              width: width,
                 
              backgroundColor: 'rgba(52, 52, 52, 0.6)',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '90%',
            
                alignItems: 'center',
                  marginTop: '5%',
                   marginBottom: '5%',
             
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: 'rgba(52, 52, 52, 0.6)',
              }}>
            
 <SliderBox
                 images={arrImg}
                autoplay={false}
                circleLoop={false}
                 
              resizeMethod={'resize'}
 resizeMode={'contain'}
             
               style={{
                height: '100%',
            
                alignItems: 'center',
           
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: 'rgba(52, 52, 52, 0.6)',
              }}


            
                onCurrentImagePressed={(index) =>
                //    setmodalVisible4(true)
                console.log(`image ${index} pressed`)
                }
              />
             
{/* <TouchableOpacity
            style={{
                alignSelf:'flex-start',
                margin:25,
                width: 35,
                height: 35,
                position:'absolute',
                top:3,
                right:3,
              
               
            }}
            onPress={() =>  setmodalVisible4(false)}>
            <Image
              style={{
                width: 35,
                height: 35,
                tintColor: color.mycolor_green,
                marginRight: '2%',
              }}
              source={require('../../assets/close.png')}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
                

                
            
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

            </View>
            }

        </SafeAreaView >
    )
}

export default HomeDetailsScreen;
