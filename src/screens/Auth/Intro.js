import React, {useState,useEffect} from 'react';

// import all the components we are going to use
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
Dimensions,ActivityIndicator
} from 'react-native';
const window = Dimensions.get('window');

import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
Geocoder.init("AIzaSyAtU6Oom32D_PzslG8Lh9HJpdBrsv5gMnQ")
import Geocoder from 'react-native-geocoding';
import messaging from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native';

import { SliderBox } from "react-native-image-slider-box";


const Intro = (props) => {

const [position,setPosition] = useState({
  "longitude": 0,
  "latitude": 0,
})

const [isloading,setisloading] = useState(true)

const [longitude,setlongitude] = useState()
const [latitude,setlatitude] = useState()
const [result,setResult] = useState()
  let [address,setAddress] = useState()
   const [showRealApp, setShowRealApp] = useState(false);
   const [loading, setLoading] = useState(false);
   const [initialRoute, setInitialRoute] = useState('');

   const [sliderimages,setsliderimages] =   useState([
    require('../../assets/images/intro/introone.png'),
    require('../../assets/images/intro/introtwo.png'),
    require('../../assets/images/intro/introthree.png'),
   
  ]);

  // const [logo,setlogo] =   useState(
  //   require('../../assets/images/logo/logo.jpeg'));

   useEffect(() => {


   getData()
  }, []);


  const getData = async () => {
setisloading(true)
setLoading(true)
    try {
      const user = await AsyncStorage.getItem('user')
      let userValue =  await AsyncStorage.getItem('user')
      let parse = JSON.parse(userValue)
       console.log('userValue:::',parse)
  
       let islogin =  await AsyncStorage.getItem('islogin')
       let parseislogin = JSON.parse(islogin)
       console.log('parseislogin:::',parseislogin)
     if (parseislogin ==="true"){
      
        //props.navigation.navigate('StackRoutes')
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'TabRoutes'},
            
            ],
          })
        );
        return
  
  
      }else{
        setisloading(false)
        setLoading(false)
      }
     
    
    } catch(e) {
      console.log(e)
    }
  }  


  // const onDone = () => {
  //   setShowRealApp(true);
  // };
  // const onSkip = () => {
  //   setShowRealApp(true);
  // };


  GetCurrentLocation = () =>{
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
    })

        .then(position => {
           
            const currentLongitude = JSON.stringify(position.longitude);


            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.latitude);
            //getting the Latitude from the location json

            // this.setState({
            //     longitude: eval(currentLongitude),
            //     latitude: eval(currentLatitude)


            // })

          setlongitude(eval(currentLongitude))
          setlatitude(eval(currentLatitude))
          console.log("currentLatitude:::::",currentLatitude)
          console.log("currentLatitude:::::",currentLongitude)

            setPosition( { longitude: eval(currentLongitude), latitude: eval(currentLatitude) } );
           // setPosition({ region: { longitude: eval(currentLongitude), latitude: eval(currentLatitude), longitudeDelta: 0.009, latitudeDelta: 0.009 } });


            console.log('....................................',position.latitude,position.longitude)
            console.log('userCurrentLocation')
            //console.log('userCurrentLocation:::',this.state.position)
            this.saveCurrentLocation (position)




        })

        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })


}
saveCurrentLocation = async () =>{
  await AsyncStorage.setItem('position', JSON.stringify(position));
  
  this.getAsynicCurrentLocation()

}


  getAsynicCurrentLocation =  async ()=>{
    try {
        const value = await AsyncStorage.getItem('position')
       
            
            let parsed = JSON.parse(value);  

            console.log(' Calling ProductParseData::',parsed.latitude)
            setPosition({ position: parsed })
            console.log("UserAsyncLocation::::",position.longitude,position.latitude)


            let myApiKey='AIzaSyAtU6Oom32D_PzslG8Lh9HJpdBrsv5gMnQ'
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.latitude + ',' + position.longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
           
           setResult({
                result:responseJson.results[0].address_components[3]
           }
           )
          

            console.log("Address Components::::::",result)
            var longaddress = responseJson.results[0].formatted_address;
            console.log("UserLongAddress::::::",longaddress)
            this.saveAddressName(longaddress)
          
           



})


        
       
    } catch (e) {
        console.log(e)

    }
}


saveAddressName =  async (longaddress)=>{
  await AsyncStorage.setItem('address', JSON.stringify(longaddress));
  let userValue =  await AsyncStorage.getItem('address')
  console.log('userValue:::',userValue)
setAddress(userValue)
console.log("UserLonginVariable::::::",longaddress)
  

}
const RenderText = ({item}) => {
  return (
    <View
      style={styles.container}>
        </View>
  )
}

  const RenderItem = ({item}) => {
    return (
      <View
        style={styles.container}>
          <View style={{height:"100%",width:"100%",backgroundColor:"transparent",alignItems:"center"}}>


          <View style={styles.parent}>
          <View style={styles.child}>
            <View style={{height:"100%",width:"100%",position:"absolute"}}>
            <View style={{height:"80%",width:"100%",backgroundColor:"transparent",alignItems:"center",justifyContent:"center"}}>
<View style={{height:"100%",width:"100%",
backgroundColor:item.backgroundColor,alignSelf:"center",alignContent:"center",
alignItems:"center",}}>
 <Image
   style={{backgroundColor:"transparent",height:"100%",width:"100%",resizeMode:'stretch'}}
   source={item.image} />
   </View>
   </View>

   
    
   
   
 </View>
            
     </View>
     </View>
     <View style={{height:"30%",width:"100%",backgroundColor:"transparent",}}>
       <View style={{height:"100%",width:"100%",backgroundColor:"transparent"}}>
    <View style={{height:"25%",backgroundColor:"transparent",justifyContent:"center"}}>
    <Text style={styles.introTitleStyle}>
   {item.title}
 </Text>
 </View>
 <View style={{height:"50%",backgroundColor:"transparent"}}>
 <Text style={styles.introTextStyle}>
   {item.text}
 </Text>
 </View>
 </View>
 
     </View>
   
     </View>
     {
               loading === true ?
           <ActivityIndicator size="small" color="#28A646"  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"15%"}} />
           :
           <View>
               </View>
           }
      </View>
    );
  };

  return (
    <>
      {isloading?
      
      <View  style={{ height: '100%', width: '100%',alignContent:'center',alignItems:'center',justifyContent:'center',
      backgroundColor:'white',flexDirection:'column',flex:1,
    }}>

      <Image style={{ 
        resizeMode:'contain',
        height: 220, width: '100%',alignSelf: 'center',justifyContent:'center',alignContent:'center',
        alignSelf:'center',
       }} source={require('../../assets/images/logo/logo.png')} />



      </View>
: 
      showRealApp ? (
       props.navigation.dispatch(
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
      )
     
      ) : 
      (

      
        
       <View style={{flex:1,backgroundColor:'white',flexDirection: 'row',alignContent:'center',justifyContent:'center'}}>

     {/* <Image style={{ height: 84, width: 133,top:40, alignSelf: 'center',position:'absolute',justifyContent:'center',alignContent:'center'
      }} source={require('../../assets/images/logo/logo.png')} /> */}

<View
 style={{ height: '70%', width: '100%',alignContent:'center',position:'absolute',top:30,
}}
>

  <SliderBox
  sliderBoxHeight={'100%'}

circleLoop
dotColor="#28A646"
inactiveDotColor="#90A4AE"

paginationBoxStyle={{
 position: "absolute",
 bottom: 0,
 alignItems: "center",
 alignSelf: "center",
 justifyContent: "center",
}}

images={sliderimages}
onCurrentImagePressed={index =>
console.warn(`image ${index} pressed`)
  }
 />
    {/* <Image style={{ height: 450, width: 354,alignContent:'center',position:'absolute',top:140,
      }} source={images.mainintro} /> */}

</View>
    

     

  <Text style={{ fontFamily:'Poppins-Regular',height:38,fontSize:25,
fontWeight:'700',
color: '#28A646', alignSelf: 'center',position:'absolute',bottom:'18%' }}>
    
   Welcome to Thaikadar.com
            
    
  
</Text>

 <Text style={{ fontFamily:'Poppins-Regular',height:30,fontSize:10,width:307,
 alignContent:'center',justifyContent:'center',textAlign:'center',
 marginTop:10,
color: '#2E3333', alignSelf: 'center',position:'absolute',bottom:'13%' }}>
    
 
    Thaikadar.com is a brand that lets you buy and sell properties and lands globally.
            
    
  
</Text>

  <TouchableOpacity style={{ borderRadius: 8, backgroundColor: "#28A646",position:'absolute',bottom:'5%',
   width: 280, height: 50, alignContent: 'center', justifyContent: 'center' 
   }} onPress={() => { props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        { name: 'WelcomeLoginWith'},
      
      ],
    })
  );}}>

        <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center',fontFamily:'Poppins-Regular',fontWeight:'500' }}>
    
   Get Started
            
    
  
</Text>
    </TouchableOpacity>


        </View>

      )}
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    
    
  
  },
  parent : {
    height :window.height/1.3 ,
    width : window.width/2,
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 200,
    borderBottomEndRadius : 200,
    overflow : 'hidden',
    backgroundColor:"#f5f5f5",

    
    

},
child : {
   width:"100%",
   height:"100%",
    transform : [ { scaleX : 0.95 } ],

    backgroundColor : "#050A30",
    alignItems : 'center',
    backgroundColor:"transparent",
   
    
},
parent1 : {
  height :window.height/4 ,
  width : window.width/2,
  transform : [ { scaleX : 2 } ],
  borderBottomStartRadius : 200,
  borderBottomEndRadius : 200,
  overflow : 'hidden',
  backgroundColor:"#fff",

  
  

},
child1 : {
 width:"100%",
 height:"100%",
  transform : [ { scaleX : 0.6 } ],

  backgroundColor : "#050A30",
  alignItems : 'center',
  backgroundColor:"transparent",
 
  
},
parent2 : {
  height :window.height/3 ,
  width : window.width/2,
  transform : [ { scaleX : 2 } ],
  borderBottomStartRadius : 200,
  borderBottomEndRadius : 200,
  overflow : 'hidden',
  backgroundColor:"yellow",

  
  

},
child2 : {
 width:"100%",
 height:"100%",
  transform : [ { scaleX : 0.6 } ],

  backgroundColor : "#050A30",
  alignItems : 'center',
  backgroundColor:"transparent",
 
  
},
  titleStyle: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color:"gray"
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
    backgroundColor:"transparent",
    marginVertical:20,
    borderRadius:175
    
  },
  introTextStyle: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    height:"20%",
  
    width:"100%",
    backgroundColor:"transparent"

  },
  introTitleStyle: {
    
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
    backgroundColor:"transparent",
    fontWeight: 'bold',
    justifyContent:"center",alignItems:"center",
    
  },
});

// const slides = [
//   {
//     key: 's1',
//     text: 'Enjoy the great ontime services by Food Wala',
//     title: 'FoodWala on Time',
//     image: images.intro2,
//     backgroundColor: '#f8f8ff',
//   },
//   {
//     key: 's2',
//     title: 'FoodWala Anywhere',
//     text: 'With our great chain of restaurants, order from us anytime',
//     image: images.intro3,
//     backgroundColor: '#f8f8ff',
//   },
//   {
//     key: 's3',
//     title: 'Great Offers',
//     text: 'Giving huge discounts to customers',
//     image: images.intro1,
//     backgroundColor: '#f8f8ff',
//   },
  
 
// ];