import React, { Component, useState } from 'react';
import { View, StyleSheet,Alert,ActivityIndicator, AppRegistry, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';
// import { icons, images, SIZES, COLORS, FONTS, icon } from '../constant'
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IconAwe from 'react-native-vector-icons/dist/FontAwesome';
// import RadioButton from 'react-native-radio-button'
import Iconico from 'react-native-vector-icons/dist/Ionicons'
// import SwipeableRating from 'react-native-swipeable-rating';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import RBSheet from "react-native-raw-bottom-sheet";
import { SliderBox } from "react-native-image-slider-box";
import IconsEnt from 'react-native-vector-icons/dist/Entypo';
// import LocationCategory from "./LocationCategory"
import IconFeat from 'react-native-vector-icons/dist/Feather';
import Iconic from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
Geocoder.init("AIzaSyAtU6Oom32D_PzslG8Lh9HJpdBrsv5gMnQ")

const color = "orange"



//const font = 'Montserrat-Regular'


const COORDINATES = [
    { latitude: 37.8025259, longitude: -122.4351431 },
    { latitude: 37.7896386, longitude: -122.421646 },
    { latitude: 37.7665248, longitude: -122.4161628 },
    { latitude: 37.7734153, longitude: -122.4577787 },
    { latitude: 37.7948605, longitude: -122.4596065 },
    { latitude: 37.8025259, longitude: -122.4351431 },
];
const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
}

const styles = StyleSheet.create({
    container: {
        
        flex:1
        ,
       backgroundColor:"white"
      

    },
    map: {
        
        height: '52%'

    },

});





import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Global from '../constant/Global';
 
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 
const GooglePlacesInput = (props) => {
    const [locationName,setlocationName] = useState("")
    const [countryName,setCountryName] = useState("")
  return (
   

    <GooglePlacesAutocomplete
      placeholder='Search here'
     
    
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'dark'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='false'    // true/false/undefined
      fetchDetails={true}
     
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
          console.log("Map Description.............",data)
          console.log("Map Description.............",data.description)
          setCountryName(data.description)
          setlocationName(data.description)
          console.log("Country Name:::::::::",countryName)
          
        // 'details' is provided when fetchDetails = true
        console.log("Map location...........",details.geometry.location)
        props.update(details.geometry.location)
       
        
    
      }}
 
      getDefaultValue={() => ''}
 
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyAtU6Oom32D_PzslG8Lh9HJpdBrsv5gMnQ',
        language: 'en', // language of the results
        types: 'geocode' ,// default: 'geocode' (cities)'||'establishment
       // types: 'geocode', // default: 'geocode' 
        components:"country:pk",
      
      

      }}
 
      styles={{
        textInputContainer: {
          width: '100%',
          
        },
         textInput: {
    
      color: 'black',
      fontSize: 16,
    },
     
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
       
       
        
      }}
 
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{ fields: 'geometry', }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      
 
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      
    />
  );
}


export default class Addresses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            longitude: 0,
            latitude: 0,
            hello: '',
            checked: true,
            progress:false,
            position: {
                "longitude": 0,
                "latitude": 0,

            },
            region: {
                
                latitude: 34.663949,
                longitude: 3.248348,
                 
                 
                
                latitudeDelta: 6,
                longitudeDelta: 6,
            },
            lang: 'En',
            select: 1,
            Landmark: '',
            house: '',
            marker: null,
            markertitle : 'Djelfa Province',
            title :'',
            completeAddress:""
            
          

        }
    }


     componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 5000,
            })
    
                .then(position => {
                   
                    const currentLongitude = JSON.stringify(position.longitude);
                    //getting the Longitude from the location json
                    const currentLatitude = JSON.stringify(position.latitude);
                    //getting the Latitude from the location json
    
                    this.setState({
                        longitude: eval(currentLongitude),
                        latitude: eval(currentLatitude)
    
    
                    })
    
                    this.setState({ position: { longitude: eval(currentLongitude), latitude: eval(currentLatitude) } });
                    this.setState({ region: { longitude: eval(currentLongitude), latitude: eval(currentLatitude), longitudeDelta: 0.009, latitudeDelta: 0.009 } });
    
    
                    console.log('....................................')
                    console.log('userCurrentLocation')
                    console.log('userCurrentLocation:::',this.state.position)
    
    
    
                })
    
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                })


           
         
          
        });


      }
    
      
     




      componentWillUnmount() {
        this._unsubscribe();
      }
   
    // savemyaddress = async (address, position) => {
    //     try {
    //         await AsyncStorage.setItem('topaddress', address);
    //         await AsyncStorage.setItem('open', 'store');
    //         await AsyncStorage.setItem('position', JSON.stringify(position));

    //         console.log('addresssved');

    //         if (this.props.route.params == null) {
    //             console.log('Nulla');
    //             // this.props.navigation.navigate('Change')
    //         } else {
    //             console.log('else');

    //             //this.props.navigation.navigate('Home')

    //             if (this.props.route.params.isprofile) {
    //                 console.log('It is signupaddress');
    //                 this.props.navigation.navigate('Logininsert');
    //             } else {
    //                 console.log('It is 1 main screen');
    //                 this.props.navigation.navigate('SplashChange');
    //             }
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    handleSaveAddress= async()=>{
        //  console.log('Addresss is here................',this.state.completeAddress)

          this.saveAddressName()
    // this.handleEdit()
    this.saveAndProceed()

        await AsyncStorage.setItem('Selectedaddress', JSON.stringify(this.state.completeAddress));
        let userValue =  await AsyncStorage.getItem('Selectedaddress')
        console.log('Addresss is here................',userValue)
       
        this.handleSavelatlong();

         

        // this.props.navigation.goBack()
        
        
      }
      handleSavelatlong= async()=>{
        //  console.log('Addresss is here................',this.state.completeAddress)

        await AsyncStorage.setItem('SelectedLatLong', JSON.stringify(this.state.marker));
        let userValue =  await AsyncStorage.getItem('SelectedLatLong')
        console.log('LongLat is here................',userValue)
        // this.props.navigation.goBack()
        
      }
    

    fullAddress =  async (data)=>{
        await AsyncStorage.setItem('Selected address', JSON.stringify(data.description));
        let userValue =  await AsyncStorage.getItem('Selectedaddress')
        console.log('Addressssssssss................',userValue)
        // this.props.navigation.goBack()
        
     
     }

    // saveAddressName =  async ()=>{
    //     await AsyncStorage.setItem('address', JSON.stringify(this.state.address));
    //     let userValue =  await AsyncStorage.getItem('address')
    //     console.log('userValue:::',userValue)
    //     // this.props.navigation.goBack()
        
     
    //  }

     saveAddressName =  async ()=>{

      
         await AsyncStorage.setItem('Selectedaddress', JSON.stringify(this.state.completeAddress));

        await AsyncStorage.setItem('address', JSON.stringify(this.state.address));

        //marker.latitude, this.state.marker.longitude
            await AsyncStorage.setItem('SelectedLatLong', JSON.stringify(this.state.marker));

         await AsyncStorage.setItem('address_latitude', JSON.stringify(this.state.marker.latitude));
          await AsyncStorage.setItem('address_longitude', JSON.stringify(this.state.marker.longitude));

        let userValue =  await AsyncStorage.getItem('address')
        console.log('userValue:::',userValue)
        this.props.navigation.goBack()
        
     
     }

    saveAndProceed = async () => {
       

       


        if(this.state.marker===null)
        {
          Alert.alert(
              
         'Location not selected')

         return;
        }

       

        else {


            let title = 'Location'
           

           
//            {
               
//             let myApiKey='AIzaSyBzxmZptGXekpZSBcHqauKqPNbgIjLIXbc'

//             fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.marker.latitude + ',' +this.state.marker.longitude + '&key=' + myApiKey)
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
//     })

// console.log('Done return')
// return;
 
// }

//             let myApiKey='AIzaSyAtU6Oom32D_PzslG8Lh9HJpdBrsv5gMnQ'

//             fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.marker.latitude + ',' +this.state.marker.longitude + '&key=' + myApiKey)
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
//     })

// console.log('Done return')


Geocoder.from(this.state.marker.latitude, this.state.marker.longitude)
        .then(json => {

           var addressComponent = json.results; // [0].address_components[0];
            console.log('Checking' + addressComponent);

             
        
                 let v=json.results[0].address_components
                 
                  let result =json.results;

            console.log('Result length ' + result.length)
  
             console.log('Result length ' + result.length)
                 
  console.log("full_Addresss..................",result[1].formatted_address)

  this.setState({ markertitle: result[1].formatted_address });

    console.log('Add Location name : ' + result[1].address_components[0].short_name);

                this.setState({
                    completeAddress:result[1].formatted_address
                })
                 this.setState({
                    address:result[1].formatted_address
                })

                
                  this.saveAddressName();
              
            
        })
        .catch(error => console.warn(error));


        }


    }

    

changeLocation=(val)=>{
    console.log(val)

    let  coordinate= {
        latitude: val.lat,
        longitude: val.lng,
      }

    console.log('called this');

    this.setState({   marker:coordinate, region: { 
         longitude:val.lng ,
         latitude:val.lat ,
         longitudeDelta: 0.009,
         latitudeDelta: 0.009 } });


}




onRegionChangeComplete= (region) =>{
  //  console.log('Calling', region)
  //   console.log('Calling', this.state.marker)
  //   console.log("Add is Save here",)
 
//  this.setState({ 
//         region
//      });
  }

 
    render() {
        return (
            <View style={styles.container}>
               
                <View style={{height:"3%",width:"100%",backgroundColor:"transparent"}}>
          </View>
          <View style={{height:"8%",width:"100%",backgroundColor:"transparent",flexDirection:"row",}}>
                <View style={{height:"100%",width:"15%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>    
                    <TouchableOpacity>
                <Iconic
                    name="arrow-back"
                    size = {20}
                    style={{alignSelf:"center"}}
                    color="green"
                    onPress={() => this.props.navigation.goBack()}
                    />
                    </TouchableOpacity>
                    </View>
                     <View style={{height:"100%",width:"65%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>  
                     <Text style={{fontWeight:"bold",color:"black",fontSize:17}}>
                            Add Address
                         </Text>  
                    </View>
                    <View style={{height:"100%",width:"20%",backgroundColor:"transparent",justifyContent:"center",alignSelf:"center"}}>  
                   
                    <View style={{height:25,width:25,backgroundColor:"transparent",alignSelf:"center",borderLeftColor:"darkgray",flexDirection:"row",justifyContent:"center",}}>
                                              

                                                   </View>
                    </View>
                   
                </View>
                <View style={{height:45,width:"100%",backgroundColor:"transparent"}}>
                    </View>
        
          <View style={{height:"70%"}}>
                <MapView style={{height:"100%",width:"100%",backgroundColor:"transparent"}} 
                showsUserLocation={true}
                 zoomEnabled={true}
                 showsMyLocationButton={true}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChangeComplete={(region)=>{this.onRegionChangeComplete(region)}}

onPress={(e) =>{ 
    this.setState({ marker: e.nativeEvent.coordinate, region : {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,

        longitudeDelta: this.state.region.longitudeDelta, 
        latitudeDelta:this.state.region.latitudeDelta,

    } })
    // this.saveAndProceed()
    ,console.log(e.nativeEvent.coordinate)}}>
{
      this.state.marker &&
      <MapView.Marker coordinate={this.state.marker} />
}
</MapView>

</View>
<View style={{flex:1,width:"95%",backgroundColor:"transparent",justifyContent:"center",alignItems:"center",alignSelf:"center",shadowColor:"gray",shadowRadius:1,shadowOpacity:0.05,position:"absolute",top:"9%",}}>
                <GooglePlacesInput
                
            update={this.changeLocation}
            lang={this.state.lang}
                        
/>
          
          </View>





                <View style={{ height: '15%', width: '100%', backgroundColor: 'transparent', alignContent: 'center', justifyContent: 'flex-end' }}>


                    <View style={{ height: '100%', width: '90%', alignSelf: 'center' }}>


                       

                     

                     
                        <View style={{ height: 40,backgroundColor:"transparent" ,width:"100%",top:10}}>

                            <TouchableOpacity style={{ backgroundColor: "#28A646", height: '100%', borderRadius: 5, 
                            alignSelf: 'center', elevation: 1, width: '100%', justifyContent: 'center' }}
                             onPress={() => this.saveAndProceed()}>
                                <View style={{ height: '100%', alignSelf: 'center', justifyContent: 'center', width: '100%' }}>

                                    <Text style={{ fontSize: 17, alignSelf: 'center', color: 'white' }}>
                                    Save and proceed

                                     </Text>


                                </View>


                            </TouchableOpacity>

                        </View>

                        {
          this.state.progress?<ActivityIndicator/>:<Text></Text>
        }



                    </View>

         








                </View>

              

            </View>



        )
    }
}



