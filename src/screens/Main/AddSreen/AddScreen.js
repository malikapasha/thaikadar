
import React, { useState, useEffect, useRef, } from "react";
import { TextInput, TouchableOpacity, View,FlatList,LogBox, SafeAreaView, Image, ScrollView, Text,Alert,ActivityIndicator } from "react-native";
import { styles } from "./AddScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Icon1 from 'react-native-vector-icons/Entypo';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const logoImage = require('../../../assets/images/logo/logo.png');

const not_connected = require('../../../assets/images/draw-not-connected/draw-not-connected.png');

const moreinfo = require('../../../assets/images/draw-not-connected/moreinfo.png');


import AsyncStorage from '@react-native-community/async-storage';
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
const AddScreen = (props) => {

    const [login,setlogin] = useState(false);
    const [progress,setProgress] = useState(false)
    const [isGratuitSelected, setIsGratuitSelected] = useState(true);
    const [isStandardSelected, setIsStandardSelected] = useState(false);
    const [isPremiumSelected, setIsPremiumSelected] = useState(false);
    const [locationModal, setlocationModal] = useState(false);
    const [categoriesModal, setcategoriesModal] = useState(false);
    const [prixModal, setPrixModal] = useState(false);
    const refRBSheet = useRef();
    const [categoryValue,setCategoryValue] = useState("")


    const [subcategoryid,setsubcategoryid] = useState(0)
    const [subcategoryValue,setsubCategoryValue] = useState("")

    const [subcategoriesModal, setsubcategoriesModal] = useState(false);

    const [locationValue,setLocationValue] = useState("")
    const [priceValue,setPriceValue] = useState("")

       const [categoryid,setcategoryid] = useState(0)
          const [pricetypeid,setpricetypeid] = useState(0)

    const [imgUrl, setimgUrl] = useState();
    const [txtTitle, setTxtTitle] = useState('');
    const [txtDescription, setTxtDescription] = useState('');
    const [txtPrice, setTxtPrice] = useState('');
    // const [ImagePicker, setImagePicker] = useState('');
    const [arrImage, setArrImage] = useState([]);
    const [postImage, setpostImage] = useState([]);
    const [data, setData] = useState([]);
    const [isloading, setisloading] = useState('');
    const [ImageSource, setImageSource] = useState('');
    const [refreshing, setrefreshing] = useState('');
    const [arrFinalImage, setArrFinalImage] = useState([]);
    const [userid, setuserid] = useState();
    const [fullAddress, setfullAddress] = useState();
    const [categoryStatus, setcategoryStatus] = useState();
    const [productcategory, setproductcategory] = useState();
    const [latitudevalue, setlatitudevalue] = useState();
    const [langitudevalue, setlangitudevalue] = useState();
    const gratuitButton = () => {
        setIsGratuitSelected(true);
        setIsStandardSelected(false);
        setIsPremiumSelected(false);
    }

    const standardButton = () => {
        setIsStandardSelected(true);
        setIsGratuitSelected(false);
        setIsPremiumSelected(false);
    }

    const premiumButton = () => {
        setIsPremiumSelected(true);
        setIsGratuitSelected(false);
        setIsStandardSelected(false);
    }

    const [dataQuestions, setdataQuestions] = useState([]);

    const [user,setUser] = useState("")

    const [arrsubCategory,setArrsubCategory] = useState([]);
        
    const [arrCategory,setArrCategory] = useState([

        // {
        //     id :1,
        //     categoryName:"Electronics"
    
        // },
        // {
        //     id :2,
        //     categoryName:"Mobile"
    
        // },
        // {
        //     id :3,
        //     categoryName:"Vehicles"
    
        // },
        // {
        //     id :4,
        //     categoryName:"Bikes"
    
        // },
        // {
        //     id :5,
        //     categoryName:"Jobs"
    
        // },
        // {
        //     id :6,
        //     categoryName:"Fashion"
    
        // },
        // {
        //     id :7,
        //     categoryName:"Property"
    
        // },
        // {
        //     id :8,
        //     categoryName:"Animals"
    
        // },
        // {
        //     id :9,
        //     categoryName:"Software"
    
        // },
    ])
    const [arrPrice,setArrPrice] = useState([

        {
            id :1,
            priceName:"Négociable"
    
        },
        {
            id :0,
            priceName:"Fixé"
    
        },
        {
            id :2,
            priceName:"Libérer"
    
        },
        
    ])

    // useEffect(() => {
    //     if (locationModal) {
    //         refRBSheet.current.open();
    //     }
    // }, [locationModal]);
    const isFocused = useIsFocused();
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
         handleSaveAddress()
        GetCategories()
        if (categoriesModal) {
            refRBSheet.current.open();
        }
    }, [categoriesModal,isFocused]);

    useEffect(() => {
        if (prixModal) {
            refRBSheet.current.open();
        }
    }, [prixModal,isFocused]);

    useEffect(() => {
        if (subcategoriesModal) {
            refRBSheet.current.open();
        }
    }, [subcategoriesModal,isFocused]);



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

    const GetCategories =  async()=> {
       
        try
        {
              let islogin =  await AsyncStorage.getItem('islogin')
          let parseislogin = JSON.parse(islogin)
          console.log('value of parseislogin:::',parseislogin)

         

          if(parseislogin)
          {
              setlogin(true)

              let user =  await AsyncStorage.getItem('user')
              let user_Info = JSON.parse(user)
              console.log('user_Info:::',user_Info)
              setUser(user_Info)

          }
          else
          {
              setlogin(false)
          }
        }
        catch(ex)
        {

        }
    
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
              
               console.log("MyCategories................",responseJson)
               console.log("MyCategories................",responseJson.data)
            //    setcategoryStatus(responseJson.data.category_status)
            //    console.log("category statussssss...........",categoryStatus)
        setArrCategory(responseJson.data)
        
       
              
               if (responseJson.status === true){
                 
              
     
               }else{
                  
                 
                 }     
             
             })
             .catch((error) => {
               console.log(error)
               console.log('error')
     
             });
     
         }
         const fromDate = new Date().toISOString();
         const postapiHandler =async (messages)=>{
            if(arrFinalImage.length==0){
                Alert.alert("Thaikadar.com","Select Images.")
                return
            }else{
                console.log("images",arrFinalImage.length)
            }
            if(txtTitle==""){
                Alert.alert("Thaikadar.com","Enter Title")
                return
            }
            if(txtDescription==""){
                Alert.alert("Thaikadar.com","Enter Description")
                return
            }
            // if(priceValue==""){
            //     Alert.alert("Thaikadar.com","Entrez le type de prix")
            //     return
            // }
            if(txtPrice==""){
                Alert.alert("Thaikadar.com","Enter price")
                return
            }
            
            if(categoryValue==""){
                Alert.alert("Thaikadar.com","Select Categorie")
                return
            }
            
            if(fullAddress==""){
                Alert.alert("Thaikadar.com","Select address.")
                return
            }
            console.log("Title txt::::::",txtTitle) 
            console.log("Description txt::::::",txtDescription) 
            console.log("Price txt::::::",txtPrice) 
            console.log("Prix type::::::",priceValue) 
            console.log("category type::::::",categoryValue) 
            console.log("Selected Images::::::",postImage) 
            console.log("expiry_date::::::",fromDate) 
            console.log("Selected Location::::::",fullAddress) 
            console.log("Selected Latitude::::::",latitudevalue) 
            console.log("Selected longitude::::::",langitudevalue) 
            console.log("Selected category status::::::",categoryStatus) 
            console.log("Selected product category::::::",productcategory) 
            // console.log("Selected Location::::::",data.created_at) 
            let value = await AsyncStorage.getItem('user2');
            let parsed = JSON.parse(value);
  
            let value1 = await AsyncStorage.getItem('user');
        
            let parsed1 = JSON.parse(value1);
            setuserid(parsed1.id)

             console.log("Selected user id...............",parsed1.id) 

            const fromDate = new Date().toISOString();
             var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      var newdate = year + '-' + month + '-' + date;

      var thecategory = categoryid;
      if(subcategoryid > 0)
      {
        thecategory = subcategoryid;
      }

    setProgress(true)
            fetch('https://thaikadar.com/api/create-post',
            {
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
               
                post_title:txtTitle,
                post_description:txtDescription,
                address:fullAddress,
                expiry_date: newdate, //current date deni ha
                authorization_offer:false,
                advertising_type:1,
                post_category :thecategory ,
                latitude :latitudevalue,
                longitude  :langitudevalue ,
                 price:txtPrice,
                post_status  :1,
                parent_category:categoryValue,
               
                // price_type:pricetypeid ,
                price_type:0 ,
                delivery:0,
                user_id :parsed1.id ,
                post_images:arrFinalImage ,
               }),
             })
             .then((response) => response.json())
             .then((responseJson) => {
                console.log(responseJson)
              
                if(responseJson.status)
                {
                      var postid =  responseJson.postid;
                setProgress(false)

                //postid

                for(var i = 0; i < dataQuestions.length; i++)
                {
                    console.log("the answers are ",dataQuestions[i].answer );
                    // dataQuestions[i].answer = "";
        
                    fetch('https://thaikadar.com/api/save-post-question',
                    {
                       method: 'POST',
                       headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                       
                        post_id:postid,
                        questiontype:dataQuestions[i].id,
                        question:dataQuestions[i].question,
                        answer: dataQuestions[i].answer, //current date deni ha
                      
                       }),
                     })
                     .then((response) => response.json())
                     .then((responseJson) => {
                        console.log(responseJson)
                      
                           })

                }

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
                   console.log("Error occurr")
                }
             
             })
  
  
  
    
  
  
          }

    const Removeimage = (itemvalue) => {
      
         let filteredArray = arrFinalImage.filter(item => item !== itemvalue)
  
          setArrFinalImage(filteredArray);

       
     
    }

    const get_values = () => {

        console.log("Title txt::::::",txtTitle) 
        console.log("Description txt::::::",txtDescription) 
        console.log("Price txt::::::",txtPrice) 
        console.log("Prix type::::::",priceValue) 
        console.log("category type::::::",categoryValue) 
        console.log("Selected Images::::::",postImage) 
        console.log("Selected Location::::::",locationValue) 



    }
    const handleSaveAddress= async()=>{
        //  console.log('Addresss is here................',this.state.completeAddress)

        // await AsyncStorage.setItem('Selectedaddress', JSON.stringify(this.state.completeAddress));
        let addressValue =  await AsyncStorage.getItem('Selectedaddress')
        console.log('Addresss is here................',addressValue)
        setfullAddress(addressValue)
        let longLatValue =  await AsyncStorage.getItem('SelectedLatLong')

        let parsed = JSON.parse(longLatValue);
        console.log('Latitude is here................',parsed.latitude)
        console.log('Longitude is here................',parsed.longitude)
setlatitudevalue(parsed.latitude)
setlangitudevalue(parsed.longitude)
        // props.navigation.goBack()
        
      }



    const navigatemap = ()=>{
        props.navigation.navigate("Map")

    }
       

  const categorySelection = async(item)=>{

   console.log("Your categoryItem is here::::::",item)

   setcategoryid(item.id)

     setCategoryValue(item.category_name)

   setcategoryStatus(item.category_name)
  setproductcategory(item.product_category)
  console.log("Your categorystatus is here::::::",item.category_status)
  console.log("Your productcategory is here::::::",item.product_category)
  

   setcategoriesModal(false)
//    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
  }

  const categorysubSelection = async(item)=>{

    console.log("Your sub categoryItem is here::::::",item)
 
    setsubcategoryid(item.id)
 
      setsubCategoryValue(item.category_name)
 
//     setcategoryStatus(item.category_name)
//    setproductcategory(item.product_category)
   console.log("Your categorystatus is here::::::",item.category_status)
   console.log("Your productcategory is here::::::",item.product_category)
   
 
    setsubcategoriesModal(false)
 //    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
   }

   
  const PriceSelection = async(item)=>{
    console.log("Your priceItem is here::::::",item)
    setPriceValue(item.priceName)
      setpricetypeid(item.id)
    setPrixModal(false)
 //    AsyncStorage.setItem('category', JSON.stringify(item.categoryName));
   }
   const takePics = () => {

//    console.log("data here: "+arrFinalImage);
//    return; 


    
    ImagePicker.openPicker({
      width: 200,
      height: 200, compressImageMaxHeight: 400,
      includeBase64:true,
      compressImageMaxWidth: 400, cropping: true, multiple: true
    })
      .then(response => {
        //   setArrFinalImage([]);
        //   setpostImage([]);
        let tempArray = []
        //console.log("responseimage-------" + response)
        setImageSource(response )
       // console.log("responseimagearray" + this.state.ImageSource)
        response.forEach((item) => {
          let image = {
            uri: item.path,
            url:item.filename,
            path:item.data
            // width: item.width,
            // height: item.height,
          }
          // console.log("responseimage-------" + response)
         console.log("Items::::::",item)
        //    console.log("imagpath==========" + image)
          data.push(item.data)
          console.log("data is here:::::::",data)
        //   this.setState({ data: tempArray })
        //   console.log("data:::::==========" + data)

    //     arrFinalImage.push("iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==")
    // setArrFinalImage(arrFinalImage => [...arrFinalImage,"iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="] );

    setArrFinalImage(arrFinalImage => [image.path,...arrFinalImage] );

           console.log("data new is here:::::::",arrFinalImage)

        })
      
//  UploadImages();
      })

     
  }

  const UploadImages =  ()=> {
    
      setisloading(true)
// console.log("ImagesArray..................",data)
         let arr = data
         for (let i=0 ; i<arr.length ; i++){
        //   console.log("ImagespathArray............",arr[i].path)
        //   let path = arr[i].path
        let path = arr[i].path+""
        console.log("url :::::::::",arr[i].path+"")
          
            setimgUrl(path)
         // console.log("Image:::::",path)
        //   var form = new FormData();
        //   form.append('image', path);
        //   arrFinalImage.push(path);
          setArrFinalImage(arrFinalImage => [...arrFinalImage,path] );
           
      
        //  console.log("Form::::",form)
         
    //   fetch( 'https://thaikadar.com/public/postimage/uploadbaseimage.php',
    //   {
    //      method: 'POST',
    //      headers: {
    //        Accept: 'application/json',
    //        'Content-Type': 'multipart/form-data',
    //      },
    //      body:form
    //    })
    //    .then((response) => response.json())
    //    .then((responseJson) => {
    //     setisloading(true)
    //      console.log("image data.............",responseJson.path)
    //      let img = "https://thaikadar.com/public/postimage/"+responseJson.path
    //      postImage.push(img)
        
    //        setrefreshing(true)
    //      console.log("PostedImages:::::",postImage)
    //     setArrFinalImage(postImage)
    //    })

    //    .catch((error) => {
    //      console.log(error)
    //      console.log('error')
         
    //       setisloading(false)
    //        ToastAndroid.show('Error Occurred! Try again...', ToastAndroid.SHORT);
    //    });


         }

           console.log("final image............",arrFinalImage)
           
}


const renderItem = ({item, index}) => (

    
    <View style={{padding: 10}}>
      <RenderComponent item={item} index={index} />
    </View>
   
    
  );

  const RenderComponent = (props) => {
    return (
      
      
      <View  style={{height:42,width:"100%",backgroundColor:"transparent",flexDirection:"row"}}>
      <View style={{height:"100%",width:"100%",backgroundColor:"transparent"}}> 
     <TextInput
    key={props.index}
    style={{ width: '100%',
    height:40,
    color:'black',
    alignSelf: "center",
    borderColor: "black",
    borderBottomWidth: 0.6,}}
      placeholder={dataQuestions[props.index].question}
              placeholderTextColor="blue"
             
      onChangeText={val => {
         let newArray = [...dataQuestions];
        newArray[props.index].answer = val
    
        console.log("this is calling.................",dataQuestions);
        //console.log(dataQuestions[1].category_name)
      }}
    />
    </View>
  
     </View>
    
   
    
    );
  }



    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View>
            {!login ? 
            <View
            style={{flexDirection:'column',backgroundColor:'white',height:700}}
            >

<Image source={not_connected} style={{
                  height:360,
        resizeMode:'contain',
        width:'100%'}} />

              <TouchableOpacity
              onPress={()=>
                {
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
                  user.phone_number === "" || user.email === "" ?
                  <View
                  style={{flexDirection:'column',backgroundColor:'white',height:700}}
                  >
      
      <Image source={moreinfo} style={{
                        height:360,
              resizeMode:'contain',
              width:'100%'}} />
      
      <TouchableOpacity
                  onPress={()=>
                    {
                        props.navigation.navigate('EditUserScreen')
                    }
                }
                  style={{ borderColor: 'red', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                      <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Complétez d'abord votre profil</Text>
                  </TouchableOpacity>
      
                  
      
                    </View>

                 
                  :
            <ScrollView style={styles.container} >
                <View style={{ margin: 15 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#002B64', fontSize: 18 }}>
                        Post Images
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>takePics()}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#002B64', height: 200, borderRadius: 20, marginVertical: 10 }}>
                        
                 
   {/* <Image source={require('../../../assets/images/camera/photo.png')} style={{ height: 60, width: 60 }} />
                      */}
                     

                        {

arrFinalImage.length === 0?
                            <TouchableOpacity onPress={()=>takePics()}>
                                
                        <Image source={require('../../../assets/images/camera/photo.png')} style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        :
                        <ScrollView horizontal> 
                        <View style={{backgroundColor:'transparent',height:"100%",width:"100%",alignItems:"center"}}>
                           
                             <FlatList
                  
                  data={arrFinalImage}
                 
                 
                 numColumns={3}
                 keyExtractor={item => `${item}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 
                //  renderItem = {item => (<Text>{item.item.text}</Text>)} />
                <View>
                    <View style={{backgroundColor:"transparent",height:95,width:110,marginVertical:12}}>  
                 <TouchableOpacity
                    
                 >       
                  <Image source={{uri:'data:image/png;base64,'+item}}
                   style={{ height: 95, width: 100,margin:"4%"
                        }} />
             
                 
             </TouchableOpacity>
             </View>
             
             <View style={{position:"absolute",flexDirection:"row",left:"79%",height:20,backgroundColor:"transparent",top:"4%"}}>
             <TouchableOpacity>
                  <Icon1
                  name="cross"
                  backgroundColor="transparent"
                 style={{bottom:5}}
                  color ="green"
                  underlayColor={'transparent'}
                  size={20}  
                  
                 onPress={() => Removeimage(item)}
                  >
                </Icon1> 
                </TouchableOpacity>
                </View>
                
                </View>

                 }
                 ></FlatList>
               
                            
                            </View>
                            </ScrollView>

}

                    </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Title</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                style={styles.inputBoxStyle}
                                underlineColorAndroid="transparent"
                                onChangeText={text => setTxtTitle(text)}
                                defaultValue={txtTitle}
                                placeholderTextColor={"darkgray"}
                                placeholder={"Title"}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Description</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                style={styles.descriptionBoxStyle}
                                multiline
                                underlineColorAndroid="transparent"
                                onChangeText={text => setTxtDescription(text)}
                                defaultValue={txtDescription}
                                placeholderTextColor={"darkgray"}
                                placeholder={"Description"}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15, flex: 1, flexDirection: 'row', justifyContent: 'space-between',backgroundColor:"transparent" }}>
                    <View style={{flex:1,display:'none'}}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Price Type</Text>
                            </View>
                            <View style={{marginTop:10,backgroundColor:"transparent" }}>
                            <TouchableOpacity  style={{ justifyContent: "center" }} onPress={() => setPrixModal(true)}>
                            <View style={{ justifyContent: "center" }}>
                                <TextInput
                                    style={[styles.inputBoxStyle, { height: 40 ,}]}
                                    editable={false}
                                    underlineColorAndroid="transparent"
                                    value={priceValue}
                                    placeholder={"Select Price"}
                                    placeholderTextColor={"darkgray"}
                                    // defaultValue="Select prix"
                                />
                                <View style={{ position: 'absolute', right: 0,backgroundColor:"transparent" }}>
                                    <Icon
                                        name={'ios-chevron-forward'}
                                        style={styles.forwardIcon}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Price</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={[styles.inputBoxStyle, { height: 40 }]}
                                    underlineColorAndroid="transparent"
                                      onChangeText={text => setTxtPrice(text)}
                                        defaultValue={txtPrice}
                                        placeholderTextColor={"darkgray"}
                                        placeholder={"Prix"}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setcategoriesModal(true)}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Category</Text>
                        </View>
                        <View style={{ marginTop: 10, justifyContent: "center" }}>
                            <TextInput
                                editable={false}
                                style={styles.inputBoxStyle}
                                underlineColorAndroid="transparent"
                                value={categoryValue}
                                placeholderTextColor={"darkgray"}
                                placeholder={"Select the Category"}
                            />
                            <View style={{ position: 'absolute', right: 0 }}>
                                <Icon
                                    name={'ios-chevron-forward'}
                                    style={styles.forwardIcon}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {arrsubCategory.length > 0 ?
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
                        console.log('called',subcategoriesModal)
                        setsubcategoriesModal(true)}}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Sub Categorie</Text>
                        </View>
                        <View style={{ marginTop: 10, justifyContent: "center" }}>
                            <TextInput
                                editable={false}
                                style={styles.inputBoxStyle}
                                underlineColorAndroid="transparent"
                                value={subcategoryValue}
                                placeholderTextColor={"darkgray"}
                                placeholder={"Select Sub Category"}
                            />
                            <View style={{ position: 'absolute', right: 0 }}>
                                <Icon
                                    name={'ios-chevron-forward'}
                                    style={styles.forwardIcon}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    :null}
                    {dataQuestions.length > 0 ?
                    <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Relevant questions</Text>
                        </View>
: null}
                    <FlatList
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator = {false}
          showsVerticalScrollIndicator = {false}
      

			 data={dataQuestions}
			
				renderItem=   {renderItem}
			/>

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigatemap(true)}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Location</Text>
                        </View>
                        <View style={{ marginTop: 10, justifyContent: "center" }}>
                            <TextInput
                                editable={false}
                                value={fullAddress}
                                style={styles.inputBoxStyle}
                                underlineColorAndroid="transparent"
                                placeholderTextColor={"darkgray"}
                                placeholder={"Select the Location"}
                                // onChangeText={text => setLocationValue(text)}
                                // defaultValue={locationValue}
                            />
                            <View style={{ position: 'absolute', right: 0 }}>
                                <Icon
                                    name={'ios-chevron-forward'}
                                    style={styles.forwardIcon}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 15,display:'none' }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#002B64', fontSize: 18 }}>Payment</Text>
                        </View>
                        <View style={{ marginTop: 15, borderRadius: 20, borderWidth: 0.5, borderColor: '#002B64' }}>
                            <TouchableOpacity onPress={gratuitButton} style={{ backgroundColor: '#E3E3E3', margin: 0.5, height: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={{ marginHorizontal: 15, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#002B64', fontSize: 18, fontWeight: 'bold' }}>Gratuit</Text>
                                    {isGratuitSelected ? (
                                        <View style={{ height: 15, width: 15, backgroundColor: 'red', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    ) : (
                                        <View onPress={gratuitButton} style={{ height: 15, width: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-Les premier 5 annonce sont gratuit</Text>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-4 semaine enligne</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 15, borderRadius: 20, borderWidth: 0.5, borderColor: '#002B64' }}>
                            <TouchableOpacity onPress={standardButton} style={{ backgroundColor: '#E3E3E3', margin: 0.5, height: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={{ marginHorizontal: 15, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#002B64', fontSize: 18, fontWeight: 'bold' }}>Standard - 1€</Text>
                                    {isStandardSelected ? (
                                        <View style={{ height: 15, width: 15, backgroundColor: 'red', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    ) : (
                                        <View style={{ height: 15, width: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-Sell fast with Thaikadar.com</Text>
                                {/* <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-4 semaine enligne</Text> */}
                            </View>
                        </View>
                        <View style={{ marginTop: 15, borderRadius: 20, borderWidth: 0.5, borderColor: '#002B64' }}>
                            <TouchableOpacity onPress={premiumButton} style={{ backgroundColor: '#E3E3E3', margin: 0.5, height: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={{ marginHorizontal: 15, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#002B64', fontSize: 18, fontWeight: 'bold' }}>Premium - 7€</Text>
                                    {isPremiumSelected ? (
                                        <View style={{ height: 15, width: 15, backgroundColor: 'red', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    ) : (
                                        <View style={{ height: 15, width: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#8D8D8D', borderRadius: 15 / 2 }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-Sell fast with Thaikadar.com</Text>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-6 semaine enligne</Text>
                                <Text style={{ color: 'gray', marginBottom: 5, fontSize: 18 }}>-1 semain Hightlite</Text>
                            </View>
                        </View>
                    </View>
                    {login ? 
                  user.phone_number === "" || user.email === "" ?
                  <TouchableOpacity
                  style={{ borderColor: 'red', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                      <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Complétez d'abord votre profil</Text>
                  </TouchableOpacity>
                  :
                    <TouchableOpacity onPress={()=> postapiHandler()}
                    style={{ borderColor: '002B64', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                        <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Submit Post</Text>
                   
                      
                   
                    </TouchableOpacity>
                    :
                    null}
                </View>
            </ScrollView>
}
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
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Price Type</Text>
                            </View>


                            <FlatList
                  
                  data={arrPrice}
                  
                 
                 keyExtractor={item => `${item.id}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 

                 <TouchableOpacity style={{ marginVertical: 10 }} onPress={()=>PriceSelection(item)}>
                 <Text style={{ color: '#050A30', fontSize: 18 }}>{item.priceName}</Text>
             </TouchableOpacity>
                 }
                 ></FlatList>
                            {/* <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                            </ScrollView> */}
                        </View>
                    </RBSheet>
                </View>
            )}
            {categoriesModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setcategoriesModal(false)}
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
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Catégorie</Text>
                            </View>

                            <FlatList
                  
                  data={arrCategory}
                  
                  keyExtractor={item => `${item.category_id}`}
                //  keyExtractor={item => `${item.categoryid}`}
                 showsHorizontalScrollIndicator = {false}
                 showsVerticalScrollIndicator = {false}
                 renderItem={({item}) => 

                 <TouchableOpacity style={{ marginVertical: 10 }} onPress={()=>
                 {
                     setdataQuestions([])
                     GetQuestions(item.id)
                    setArrsubCategory([]);
                    setsubcategoryid(0);
                    setsubCategoryValue("");
                    GetSubCategories(item.id)
                     categorySelection(item)
                     
                     }}>
                 <Text style={{ color: '#050A30', fontSize: 18 }}>{item.category_name}</Text>
             </TouchableOpacity>
                 }
                 ></FlatList>
                     
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
                    {/* <RBSheet
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
                    > */}
                        <View style={{ marginHorizontal: 40 }}>
                            {/* <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>localisation</Text>
                            </View> */}
                    
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
                    {/* </RBSheet> */}
                   
                </View>
            )}
             {
  progress==true?

    <ActivityIndicator size="small" color={"green"}  style={{position:"absolute",alignItems:"center",alignSelf:"center",marginTop:"50%"}} />
    :
    <View>
      </View>
}
        </SafeAreaView>
    )
}

export default AddScreen;
