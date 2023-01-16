import React, { useState,useEffect,useRef } from "react";
import { TextInput, View, Dimensions,FlatList, SafeAreaView,ToastAndroid, Image, ScrollView,ActivityIndicator, Text, Platform, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
const logoImage = require('../../../assets/images/logo/logo.png');
const windowWidth = Dimensions.get('window').width;
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getVersion } from "jest";
import AsyncStorage from '@react-native-community/async-storage'

import RBSheet from "react-native-raw-bottom-sheet";
import Tags from "react-native-tags";

import Icon1 from 'react-native-vector-icons/Entypo';


const window = Dimensions.get('window');
const HomeScreen = ({ navigation }) => {

    const [mytags,setmytags] = useState([
     
      ])
    const [isHeartSelected, setIsHeartSelected] = useState(false);
           const [listdata, setlistdata] = useState([]);
           const [temArr, setTemArr] = useState([]);
           const [searchQuery, setSearchQuery] = React.useState('');
      const [images,setImages] = useState( ["https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree",
     ])
      const height = window.height
      const width = window.width
     const [arrImg,setArrImg] = useState([])
     const [arrCategory,setArrCategory] = useState([])
     const [arrDashboard,setArrDashboard] = useState([])
    const [arrUrl,setArrUrl] = useState([])
    const [progress,setProgress] = useState(false)

    const refRBSheet = useRef();

    const [dataQuestions, setdataQuestions] = useState([]);

    const [prixModal, setPrixModal] = useState(false);

    const [categoryModal, setCategoryModal] = useState(false);

    const [categoryValue,setCategoryValue] = useState("")

    const [locationModal, setlocationModal] = useState(false);

    const [subcategoryid,setsubcategoryid] = useState(0)
    const [subcategoryValue,setsubCategoryValue] = useState("")


    const [subcategoriesModal, setsubcategoriesModal] = useState(false);

    const [fullAddress, setfullAddress] = useState("");

    const [latitudevalue, setlatitudevalue] = useState();
    const [langitudevalue, setlangitudevalue] = useState();

    const [contentx, setcontentx] = useState([]);

    const [filtercateogry, setfiltercateogry] = useState(0);
    const [filterprice, setfilterprice] = useState(0);
    const [filterlocation, setfilterlocation] = useState(0);

    const [filterpricedesc, setfilterpricedesc] = useState('ASC');


    const navigateToDetail =async (item) => {
   console.log("Your MainItem is here........................",item.id)

      await AsyncStorage.setItem('selectpostid',item.id+'');
        await AsyncStorage.setItem('selectposttitle',item.post_title);

      // let userValue =  await AsyncStorage.getItem('selectpost')
      // console.log('Your MainItem is here................',userValue)

        navigation.navigate('HomeDetailsScreen')
    }

    const [arrsubCategory,setArrsubCategory] = useState([]);
    
    const [arrparentCategory,setarrparentCategory] = useState([]);

    const [user_type,setUserType] = useState("0")
    const [arrData,setArrData] = useState([])
        const [searchkey,setsearchkey] = useState("")

    const isFocused = useIsFocused();

     useEffect(() => {
        if (locationModal) {
            refRBSheet.current.open();
        }
    }, [locationModal]);

    useEffect(() => {
      if (prixModal) {
          refRBSheet.current.open();
      }
  }, [prixModal,isFocused]);

  useEffect(() => {
    if (categoryModal) {
        refRBSheet.current.open();
    }
}, [categoryModal,isFocused]);

useEffect(() => {
  if (subcategoriesModal) {
      refRBSheet.current.open();
  }
}, [subcategoriesModal,isFocused]);


const removetag = async(myitem)=>{
    console.log('myitem',myitem,mytags.length)
    let filteredArray = mytags.filter(item => item !== myitem)
  
    setmytags(filteredArray);

    if(myitem.key === 1)
    {
        setfiltercateogry(0)
        get_filter_data(0,filterprice,filterlocation,fullAddress,filterpricedesc);
    }
    if(myitem.key === 2)
    {
        setfilterprice(0)
        get_filter_data(filtercateogry,0,filterlocation,fullAddress,filterpricedesc);
    }
    if(myitem.key === 3)
    {
        setfilterlocation(0)
        get_filter_data(filtercateogry,filterprice,0,fullAddress,filterpricedesc);
    }
    if(mytags.length === 1)
    {
        console.log('myitem',myitem,mytags.length)

       get_DataByCategory_Id(0)
    }
    // else
    // {
   
    // get_filter_data(filtercateogry,filterprice,filterlocation,fullAddress,filterpricedesc);

    // }

}
const categorysubSelection = async(item)=>{

//   console.log("Your sub categoryItem is here::::::",item)

 

//     setcategoryStatus(item.category_name)
//    setproductcategory(item.product_category)
//  console.log("Your categorystatus is here::::::",item.category_status)
//  console.log("Your productcategory is here::::::",item.product_category)
 

  setsubcategoriesModal(false)

  let filteredArray = mytags.filter(item => item.key !== 1)
  
    setmytags(filteredArray);

  setmytags(mytags => [{key:1,value:item.category_name},...mytags] );

//   setfiltercateogry(filtercateogry => item.id,...filtercateogry );

  setfiltercateogry(item.id)

//   get_filter_data();

  get_filter_data(item.id,filterprice,filterlocation,fullAddress,filterpricedesc);

  console.log("Your Tag is ::::::",mytags)

//    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
 }

    useEffect(() => {
     
     
        GetCategories()
     
        //   get_SearchData()
  
          get_DataByCategory_Id(0)
       GetDashboard()
       GetMyVenues()
   
      
      
      }, [isFocused]);



      const GetSubCategories =  async(categoryid)=> {

        fetch( 'https://thaikadar.com/api/get-child-categories/'+categoryid,
        {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
         
         })
         .then((response) => response.json())
         .then((responseJson) => {  
          
           console.log("MyCategories................",responseJson)
           console.log("MyCategories................",responseJson.data)
        //    setcategoryStatus(responseJson.data.category_status)
        //    console.log("category statussssss...........",categoryStatus)
        setArrsubCategory(responseJson.data)
    
   
          
           if (responseJson.status === true){
             
          
 
           }else{
              
             
             }     
         
         })
         .catch((error) => {
           console.log(error)
           console.log('error')
 
         });
 

    }


    const GetQuestions =  async(categoryid)=> {

      console.log("called here questions ",categoryid)
      fetch( 'https://thaikadar.com/api/get-question-categories/'+categoryid,
      {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
       
       })
       .then((response) => response.json())
       .then((responseJson) => {  
        
         console.log("the questions are ",responseJson);
         console.log("MyCategories................",responseJson.data)
      //    setcategoryStatus(responseJson.data.category_status)
      //    console.log("category statussssss...........",categoryStatus)
    
  
      for(var i = 0; i < responseJson.data.length; i++)
      {
          console.log("the questions are ",responseJson.data[i]);
          responseJson.data[i].answer = "";

      }
      setdataQuestions(responseJson.data)
        
         if (responseJson.status === true){
           
        

         }else{
            
           
           }     
       
       })
       .catch((error) => {
         console.log(error)
         console.log('error')

       });


  }

  const PriceSelection = async(item)=>{
    console.log("Your priceItem is here::::::",item)
   
    if(item == 0)
    {
        let filteredArray = mytags.filter(item => item.key !== 2)
  
        setmytags(filteredArray);

        setfilterprice(1)
        setfilterpricedesc('ASC')
        setmytags(mytags => [{key:2,value:'Descending'},...mytags] );
        // setmytags(mytags => ['De bas en haut',...mytags] );
      
        setPrixModal(false)
        //    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
       
        get_filter_data(filtercateogry,1,filterlocation,fullAddress,'ASC');
      


    }
    else
    {
        let filteredArray = mytags.filter(item => item.key !== 2)
  
        setmytags(filteredArray);

        setfilterprice(1)
        setfilterpricedesc('DESC')

        setmytags(mytags => [{key:2,value:'Ascending'},...mytags] );
    // setmytags(mytags => ['Haut en bas',...mytags] );

    setPrixModal(false)
    get_filter_data(filtercateogry,1,filterlocation,fullAddress,'DESC');
    //    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
   
    

    }
   
   


   }

   const categorySelection = async(item)=>{
    console.log("Your priceItem is here::::::",item)
   
    
    get_filter_data(item.id,filterprice,filterlocation,fullAddress,filterpricedesc);
    
    setCategoryModal(false)
 //    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
   }



      const get_DataByCategory_Id = async (cate_id) => {
        setProgress(true)


         
        //http://circularbyte.com/cwp/api/get-posts/7/0/20

      console.log("URL is: ",'https://thaikadar.com/api/get-category-posts/'+cate_id)
    
        fetch(
            'https://thaikadar.com/api/get-posts/'+cate_id+'/0/20'
            )
            
            
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("CategoryListData::::::",responseJson.data)
    
               setlistdata([])
                setTemArr([])
                
              // setprogress(false)
              setlistdata(responseJson.data)
                setTemArr(responseJson.data)
                setProgress(false)
                  setArrDashboard(responseJson.data)
             
            })
            .catch((error) => {
                
                setProgress(false)
              console.log(error)
              console.log('errorgetAllrest.....................................')
      
            });
      
    
        }

        const get_filter_data = async (category,price,location,address,desc) => {
            setProgress(true)
    
            
             
            //http://circularbyte.com/cwp/api/get-posts/7/0/20
    
            let url = 'https://thaikadar.com/api/get-posts-filter/'+category+'/'+price+'/'+location+'/0/20/'+address+'/'+desc;

            if(address === "")
            {
             url = 'https://thaikadar.com/api/get-posts-filter/'+category+'/'+price+'/'+location+'/0/20/nolocation'+'/'+desc;

            }
          
          console.log(url)
        
            fetch(
                url
                )
                
                
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("CategoryListData::::::",responseJson.data)
        
                   setlistdata([])
                    setTemArr([])
                    
                  // setprogress(false)
                  setlistdata(responseJson.data)
                    setTemArr(responseJson.data)
                    setProgress(false)
                      setArrDashboard(responseJson.data)
                 
                })
                .catch((error) => {
                    
                    setProgress(false)
                  console.log(error)
                  console.log('errorgetAllrest.....................................')
          
                });
          
        
            }



      const get_SearchData = async (searchvalue) => {
        setProgress(true)
      
    
          setlistdata([])
                setTemArr([])

                // 'https://thaikadar.com/api/get-posts/'+cate_id+'/0/20'

                // 'https://thaikadar.com/api/search-posts/new'
        fetch(

            'https://thaikadar.com/api/search-posts/'+searchvalue
            )
            
            
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("SearchList::",responseJson.data)
    
            //   setprogress(false)
              setlistdata(responseJson.data)
                setTemArr(responseJson.data)
                setProgress(false)
             
            })
            .catch((error) => {
                setprogress(false)
              console.log(error)
              console.log('errorgetAllrest.....................................')
      
            });
      
    
        }
        const searchFilterFunction = (text) => {
           
          console.log("clicked here "+text)
            // Check if searched text is not blank
            if (text) {
              // Inserted text is not blankMobile
              // Filter the masterDataSource
              // Update FilteredDataSource
              const newData = listdata.filter(
                function (item) {
                  const itemData = item.post_title
                    ? item.post_title.toUpperCase()
                    : ''.toUpperCase();
                  const textData = text.toUpperCase();
                  return itemData.indexOf(textData) > -1;
              });
              setTemArr(newData);
              setSearchQuery(text);
            } else {
              // Inserted text is blank
              // Update FilteredDataSource with masterDataSource
              setTemArr(listdata);
              setSearchQuery(text);
            }
          };


      const GetCategories =  async()=> {
       
  //       try
  //       {
  // let userValue =  await AsyncStorage.getItem('user')
  // let parse = JSON.parse(userValue)
  //  console.log('userValue:::',parse.id)
  //       }
  //       catch(ex)
  //       {

  //       }
      
  
        //    this.setState({
        //        isloading:true
        //    })
           fetch( 'https://thaikadar.com/api/get-categories',
            {
               method: 'GET',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
             
             })
             .then((response) => response.json())
             .then((responseJson) => {  
              
               console.log("MyCategories::::::",responseJson)
               console.log("MyCategories::::::",responseJson.data)

              
        setArrCategory(responseJson.data)
        
         
              
               if (responseJson.status === true){
                 
                   // AsyncStorage.setItem('user', JSON.stringify(responseJson));
                   // const userValue =  await AsyncStorage.getItem('user')
                   // //var stringWithoutCommas = userValue.replace(/['"]+/g, '')
                   // console.log('userValue:::',userValue
     
               }else{
                  
                //    this.setState({
                //        isloading:false,
                //        arrStatus:"1"
                //    })
                 
                 }     
             
             })
             .catch((error) => {
               console.log(error)
               console.log('error')
       
                 ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
     
             });
     
         }

         const GetDashboard =  async()=> {
       
        //   let addressValue =  await AsyncStorage.getItem('Selectedaddress')
        //   console.log('Addresss is here................',addressValue)
        //   setfullAddress(addressValue)
//           let longLatValue =  await AsyncStorage.getItem('SelectedLatLong')
  
//           let parsed = JSON.parse(longLatValue);
//           console.log('Latitude is here................',parsed.latitude)
//           console.log('Longitude is here................',parsed.longitude)
//   setlatitudevalue(parsed.latitude)
//   setlangitudevalue(parsed.longitude)

      //       let userValue =  await AsyncStorage.getItem('user')
      // let parse = JSON.parse(userValue)
      //  console.log('userValue:::',parse._id)
      
            //    this.setState({
            //        isloading:true
            //    })
               fetch( 'https://thaikadar.com/api/get-categories',
                {
                   method: 'GET',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                   },
                 
                 })
                 .then((response) => response.json())
                 .then((responseJson) => {  
                  
                   console.log("::::::Dashboard",responseJson)
                   console.log("Dashboard::::::",responseJson.data)
    
                  
           setarrparentCategory(responseJson.data)
            // setTemArr(responseJson.data)
             
                  
                   if (responseJson.status === true){
                     
                 
         
                   }else{
                      
                     }     
                 
                 })
                 .catch((error) => {
                   console.log(error)
                   console.log('error')
           
                     ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
         
                 });
         
             }
    

   const GetMyVenues =  async()=> {
       
        try
        {
  let userValue =  await AsyncStorage.getItem('user')
  let parse = JSON.parse(userValue)
   console.log('userValue:::',parse._id)
        }
        catch(ex)
        {

        }
  
        //    this.setState({
        //        isloading:true
        //    })
           fetch( 'https://thaikadar.com/api/get-ad',
            {
               method: 'GET',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
             
             })
             .then((response) => response.json())
             .then((responseJson) => {  
              
               console.log("ImagesOfSlider::::::",responseJson)
               console.log("ImagesOfSlider::::::",responseJson.data)
              setArrImg(responseJson.data)
               let arr =[]
               let arrTemp =[]
                let arrUrlTemp = []
               arr = responseJson.data


            for(let i=0; i<arr.length; i++){
                console.log("images::::::",arr[i].ad_mobile_image)
                arrTemp.push( "https://thaikadar.com/public/postimage/"+arr[i].ad_mobile_image)
                 arrUrlTemp.push(arr[i].redirect_url)
            }
         
           console.log("ArrTemp:::::::",arrTemp)
             arrImg.push(arrTemp)
            setArrImg(arrTemp)

              setArrUrl(arrUrlTemp)


           console.log("This is arr of img:::::::",arrImg)
        //    var data =responseJson.data    
              
              
             
             })
             .catch((error) => {
               console.log(error)
               console.log('error')
       
                 ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
     
             });
     
         }
     
const handleNav =(index)=>{
    console.log(`image ${index} pressed`)
    props.navigation.navigate("WebView")

    
}



const handleSliderRedirect = (index)=>{
     console.log("Index::::",arrUrl[index])
     let url = arrUrl[index]

   navigation.navigate("WebView",{urlItems:url})
   
}

const handleCategory =(item)=>{
   console.log("ItemData::::::::::::",item.category_id)
  let cate_id = item.id
    get_DataByCategory_Id(cate_id)

    
}

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
                {/* <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View> */}
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.inputBoxStyle}
                        underlineColorAndroid="transparent"
                      placeholder="Search here"
                      placeholderTextColor="gray"
                      
                        onChangeText={(text)=>get_SearchData(text)}
                    />
                    <TouchableOpacity
                    onPress={()=> 
                    {
                      console.log("pressed here")
                      get_SearchData(searchkey)
                    }}
                     style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name={'search-outline'}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
               
            {categoryModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setCategoryModal(false)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>All Categories</Text>
                            </View>


                            <FlatList
                  
                  data={arrparentCategory}
                  
                  keyExtractor={item => `${item.category_id}`}
                //  keyExtractor={item => `${item.categoryid}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 

                 <TouchableOpacity style={{ marginVertical: 10 }} onPress={()=>
                 {
                 
                    //  setdataQuestions([])
                    //  GetQuestions(item.id)
                    // setArrsubCategory([]);
                    // setsubcategoryid(0);
                    // setsubCategoryValue("");
                    // GetSubCategories(item.id)
                    //  categorySelection(item)

                    //  setsubcategoriesModal(true)

                  
                
                    categorySelection(item)

                

                     
                     }}>
                 <Text style={{ color: '#050A30', fontSize: 18 }}>{item.category_name}</Text>
             </TouchableOpacity>
                 }
                 ></FlatList>

                           
                            {/* <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity 
                                  onPress={() => PriceSelection('0')}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>De bas en haut</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  onPress={() => PriceSelection('1')}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Haut en bas</Text>
                                </TouchableOpacity>
                            
                               
                               
                            </ScrollView> */}
                        </View>
                    </RBSheet>
                </View>
            )}

{subcategoriesModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setsubcategoriesModal(false)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                            

                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Sous-catégorie</Text>
                            </View>

{arrsubCategory.length > 0 ?
                            <FlatList
                  
                  data={arrsubCategory}
                  
                  keyExtractor={item => `${item.category_id}`}
                //  keyExtractor={item => `${item.categoryid}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 

                 <TouchableOpacity style={{ marginVertical: 10 }} onPress={()=>
                 { 
                   
                
                     setdataQuestions([])
                    GetQuestions(item.id)
                     categorysubSelection(item)}}>
                 <Text style={{ color: '#050A30', fontSize: 18 }}>{item.category_name}</Text>
             </TouchableOpacity>
                 }
                 ></FlatList>
                     :
                     <Text style={{ color: '#002B64', fontSize: 14, fontWeight: 'bold',textAlign:'center',
                     marginTop:30,
                     }}>No subcategories found</Text>
                }
                        </View>
                    </RBSheet>
                </View>
            )}

{locationModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setlocationModal(false)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 5 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Location</Text>
                            </View>
                    
                            <TouchableOpacity style={{ marginTop: 5 }} 
                            
                            onPress={() =>   {
                            //   setlocationModal(false)
                            //   navigation.navigate("Map")
                            }}>
                      
                        <View style={{ marginTop: 10, justifyContent: "center" }}>
                            <TextInput
                                editable={true}
                                value={fullAddress}
                                style={styles.inputBoxStyle}    
                                underlineColorAndroid="transparent"
                                placeholderTextColor={"darkgray"}
                                placeholder={"Enter location here"}
                                onChangeText={text => setfullAddress(text)}
                                // defaultValue={locationValue}
                            />
                            <View style={{ position: 'absolute', right: 0 }}>
                                {/* <Icon
                                    name={'ios-chevron-forward'}
                                    style={{   paddingHorizontal: 10,
                                      color: '#C9C9C9',
                                      fontSize: 30,
                                      alignSelf: 'center'}}
                                /> */}
                            </View>
                        </View>

                        <TouchableOpacity onPress={()=>
                        {
                            if(fullAddress !== "")
                            {
                                let filteredArray = mytags.filter(item => item.key !== 3)
  
                                setmytags(filteredArray);

                                setfilterlocation(1)
                                setmytags(mytags => [{key:3,value:fullAddress},...mytags] );

                                
                                get_filter_data(filtercateogry,filterprice,1,fullAddress,filterpricedesc);

                                // setmytags(mytags => [fullAddress,...mytags] );
                            }
                        setlocationModal(false)
                        }
                    }
                    style={{ borderColor: '002B64', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                        <Text style={{ fontSize: 18, color: '#002B64', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>OK</Text>
                    </TouchableOpacity>

                    </TouchableOpacity>

                            {/* <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                            </ScrollView> */}
                        </View>
                    </RBSheet>
                   
                </View>
            )}


            {prixModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setPrixModal(false)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Filter on price</Text>
                            </View>


                           
                            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity 
                                  onPress={() => PriceSelection('0')}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Descending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  onPress={() => PriceSelection('1')}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Ascending</Text>
                                </TouchableOpacity>
                            
                               
                               
                            </ScrollView>
                        </View>
                    </RBSheet>
                </View>
            )}

            <View style={{height:height*0.25,backgroundColor:"transparent"}}>

         
                 
                 <SliderBox
          images={arrImg}
          onCurrentImagePressed={index =>
        {
            handleSliderRedirect(index)
           console.log("Index::::",index)
          }
          }
        /> 
    
                 
                 

               
                  </View>
    <View>
                
    <View style={{alignItems:"center",height:window.height*0.14,flexDirection:'row'}}>

 <TouchableOpacity onPress={()=> get_DataByCategory_Id(0)}>
                    <View  style={{ marginVertical: 10,backgroundColor:"transparent",width:75,alignContent:"center",alignItems:"center",height:65,left:5 }}>
                        <View style={{ alignSelf:"center"}}>
                            <View>
        <Text style={styles.iconTextStyle}>All</Text>
                            </View>
                            <View style={styles.circleIcon}>
                                <Image
                               source={logoImage}
                                style={{height:40,width:40,backgroundColor:"transparent"}}
                                
                                />
                            </View>
                        
                        
                        </View>

                    </View>
                    </TouchableOpacity>

                <FlatList
                  
                  data={arrCategory}
                  horizontal
                 keyExtractor={item => `${item.category_id}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 
                 <TouchableOpacity onPress={()=> handleCategory(item)}>
                    <View  style={{ marginVertical: 10,
                      backgroundColor:"transparent",width:60,
                      alignContent:"center",alignItems:"center",
                      height:65,left:5 }}>
                        <View style={{ alignSelf:"center"}}>
                            <View>
                          

        <Text numberOfLines={1} style={styles.iconTextStyle}>{item.category_name}</Text>
                            </View>
                            <View style={styles.circleIcon}>
                                <Image
                                source={{uri:"https://thaikadar.com/public/postimage/"+item.category_image}}
                                style={{height:40,width:40,backgroundColor:"transparent",resizeMode:'contain'}}
                                
                                />
                            </View>
                        
                        
                        </View>

                    </View>
                    </TouchableOpacity>
                    }
                    />
                    </View>




                    <View style={{ flexDirection: 'row', marginLeft: 10, marginVertical: 10,display:'none' }}>
                        <View style={{ justifyContent: "center", marginRight: 15 }}>
                            <Text>Filters:</Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                               onPress={() => setCategoryModal(true)}
                            style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0.5, borderColor: '#050A30', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Category</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                            onPress={() => setPrixModal(true)}
                            style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0.5, borderColor: '#050A30', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Price</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                               onPress={() => setlocationModal(true)}
                            style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0.5, borderColor: '#050A30', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                  
                  data={mytags}
                  horizontal
                 keyExtractor={item => `${item}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 

                 <TouchableOpacity onPress={()=>
                    
                    removetag(item)}
                            style={{ flexDirection:'row',margin: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0.5, backgroundColor:'gray',borderColor: '#050A30', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center',color:'white' }}>{item.value}</Text>

                                <Icon1
                  name="trash"
                  backgroundColor="transparent"
                 style={{left:2,bottom:1}}
                  color ="white"
                  underlayColor={'transparent'}
                  size={17}  
                  
                
                  >
                </Icon1> 

                            </TouchableOpacity>


                  }
                    />

                    {/* <Tags
    initialTags={mytags}
    tags = {mytags}
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log( "deleted","not deleted")
    }
    containerStyle={{ justifyContent: "center" }}
    inputStyle={{ backgroundColor: "white" }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
        <TouchableOpacity 
        key={`${tag}-${index}`} onPress={onPress}
                            style={{ margin: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0.5, backgroundColor:'gray',borderColor: '#050A30', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>{tag}</Text>
                            </TouchableOpacity>

     
    )}
  /> */}


                    <View style={{backgroundColor:"#fff",alignItems:"center"}}>
                    <FlatList
                  
                  data={temArr}
                  
                 
                 keyExtractor={item => `${item.id}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 numColumns={2}
                 renderItem={({item}) => 
                 
                        
                     
                      
                            <View style={{
                               
                            
                              
                                 height:195,
                                 width:width*0.45,
                                elevation: 3,
                           
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                                marginHorizontal:5,
                                marginVertical:10,
                               
                                
                               
                            }}>
                                <TouchableOpacity onPress={()=>navigateToDetail(item)}>
                                    {/* <Icon
                                        name={isHeartSelected ? 'heart' : 'heart-outline'}
                                        style={isHeartSelected ? styles.heartIconSelected : styles.heartIcon}
                                        onPress={() => setIsHeartSelected(!isHeartSelected)}
                                    /> */}
                                    <Image source={{ uri: "https://thaikadar.com/public/postimage/"+item.post_image }}
                                     resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: height*0.15 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <View>
                        <Text style={{ color: '#050A30'  }} numberOfLines={1}> {item.post_title}</Text>
                        </View>
                        <View style={{backgroundColor:"transparent"}}>
                        <Text style={{ color: '#c3c3c3' }} numberOfLines={1}>{item.post_description}</Text>
                        </View>
                        <View >
                        <Text style={{ color: '#050A30',alignSelf:"flex-end" }}>Rs. {item.price}</Text>
                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                           
                          
                      
                   
                      }
                      />
                      </View>
                </View>
{
  progress==true?

    <ActivityIndicator size="small" color={"green"}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"50%"}} />
    :
    <View>
      </View>
}
           </View>
        </SafeAreaView >

    )
}

export default HomeScreen;