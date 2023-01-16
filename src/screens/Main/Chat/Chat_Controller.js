import React ,{ useState,useEffect,useCallback,} from 'react';
import {View,Text,Dimensions,Linking,TouchableOpacity,Image,FlatList,TextInput,StyleSheet,Alert,ActivityIndicator,ToastAndroid} from 'react-native';
// import {globalStyle} from '../stylesheet/globalStyle';
// import Login from '../Model/Login'
const window = Dimensions.get('window');
import { NavigationContainer ,useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import TakePicture from '../Model/TakePicture'
import Chat from '../Chat/Chat'
import db from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app'
import AsyncStorage from '@react-native-community/async-storage';

  const Chat_Controller =(props)=> {
    const isFocused = useIsFocused();

    const [TextValue,SettextValue] = useState("")
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
     const [check,setCheck] = useState(true)
     const [RyederId,setRyderId] = useState("")
     const [refreshing, setRefreshing] = useState(false)
     const [progress,setProgress] = useState(false)
     const [arrayTemp,setArrayTemp] = useState([])
     const [postid,setpostid] = useState("")
     const [userid,setuserid] = useState("")
     const [createdAt,setcreatedAt] = useState("")
    // const [listnew,setlistnew] = useState([])

 
    useEffect(() => {
      
      console.log("Your Firebase is calling here................")
      handleIDs()
       firebaseGet()
    }, [isFocused]);
    
    const firebaseGet = async()=>{

       let value1 = await AsyncStorage.getItem('user');
        
            let parsed = JSON.parse(value1);

        let postvalue =  await AsyncStorage.getItem('selectpost')
  let postvalueparsed1 = JSON.parse(postvalue);
  console.log('Your chat Item is here................',postvalueparsed1)

      console.log("Your Firebase is calling here..................")
     setMessages([])
     setProgress(true)
      // const orderObj = JSON.parse(await AsyncStorage.getItem('orderObj'))
      //  console.log("orderObj._id:::::",orderObj._id)
      //  const user = JSON.parse(await AsyncStorage.getItem('user')) 
      //  console.log("RyederId:::::",user)
      //  setRyderId(user._id)
      // let id = orderObj._id
      db().ref(`/messages/${postvalueparsed1.id+"-"+postvalueparsed1.user_id+"-"+parsed.id}`)
      .on('value', snapshot => {
       
         var listnew = [];

        setArrayTemp([]);
        
        setMessages([]);
        console.log('mesages..... ', snapshot.val());
        let value = snapshot.val()
        if (value==null){

          setArrayTemp([]);
          setMessages([]);

          console.log("no msgs")

            console.log("chat temp Array.........",listnew) 
          setMessages(listnew)

          alert('No messages Yet')
        }else{
          setArrayTemp([]); 
          setMessages([]);

          snapshot.forEach(c => {
            
            // let i = c.val(); 
            // console.log("data is "+ c) 
           arrayTemp.push(c.val())
           listnew.push(c.val())
            // console.log("here chat objects..........",c.val())
          })
          // let val = Object.values(value)
          // console.log("Messages is Here:::::",val)hi
          // setMessages(val)
          
            console.log("chat temp Array.........",listnew) 
          setMessages(listnew.reverse())

        }

      
          
       //  setMessages(listnew);

        setProgress(false)
        setRefreshing(false)
        // storeValueToFirebase()
       
   })
  }
  
const storeValueToFirebase= async(msg)=> {
  const orderObj = JSON.parse(await AsyncStorage.getItem('orderObj'))
  console.log("Order_id.........",orderObj._id)
  const user = JSON.parse(await AsyncStorage.getItem('user'))
  console.log("RyederId............",user)
  let newr;
  // if (!myKey) {
    newr = db().ref('/messages').child(orderObj._id).push(
     msg
    );
    console.log("msg sucessfully push...........")
    //firebaseGet()

}
const handleIDs =async (item) => {
  // console.log("Your MainItem is here........................",item)
  // await AsyncStorage.setItem('Selectedaddress', JSON.stringify(item));
  let userValue =  await AsyncStorage.getItem('selectpost')
  let parsed1 = JSON.parse(userValue);
  console.log('Your chat Item is here................',parsed1)
  setpostid(parsed1.id)
  setcreatedAt(parsed1.created_at)

  console.log('createdAt post................',createdAt)
  let value1 = await AsyncStorage.getItem('user');
        
            let parsed = JSON.parse(value1);
            console.log("real user id ..............",parsed)
            setuserid(parsed.id)
          

}
// const navigateToDetail =async (item) => {
//   // console.log("Your MainItem is here........................",item)
//   await AsyncStorage.setItem('Selectedaddress', JSON.stringify(item));
//   let userValue =  await AsyncStorage.getItem('Selectedaddress')
//   console.log('Your MainItem is here................',userValue)

//     navigation.navigate('HomeDetailsScreen',{item:item})
// }



const onRefresh = () => {
  setMessages([])
console.log('_onRefresh')
setRefreshing(true);
firebaseGet()
};
const sendMessages = async()=>{


  let postvalue =  await AsyncStorage.getItem('selectpost')
  let postvalueparsed1 = JSON.parse(postvalue);
  console.log('Your chat Item is here................',postvalueparsed1)

    var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      var newdate = year + '-' + month + '-' + date;

  console.log("receiver_id::::::",postvalueparsed1.user_id) 
  console.log("sender_id::::::",userid) 
  console.log("post_id:::::",postvalueparsed1.id) 
  console.log("last_message:::::",text) 
  // console.log("createdAt:::::",fromDate) 
  console.log("inbox_id:::::",2) 
  console.log("createdAt:::::",Date()) 
  setProgress(true)
  console.log("send msg....................",messages,"Data::::",Date())
  console.log("Data......................",Date())
//   const orderObj = JSON.parse(await AsyncStorage.getItem('orderObj'))
//   console.log("order_Id:::::",orderObj._id)
  const user = JSON.parse(await AsyncStorage.getItem('user'))
 console.log("user_ID:::::",user.id) 

//  const user = JSON.parse(await AsyncStorage.getItem('postid'))
//  console.log("user_ID:::::",user.id) 

 const fromDate = new Date().toISOString();
let msg = {

  createdAt:Date(),
  sender_id:userid,
  post_id:postvalueparsed1.id,
  last_message:text,
  }
 let newr;
 //post id + receiver + sender
 newr = db().ref('/messages').child(postvalueparsed1.id+"-"+postvalueparsed1.user_id+"-"+userid).push(
  msg
 );
 setProgress(false)
 console.log("msg sucessfully push::::")

 //call fetch
 //text

 //Api calling for chat 

  fetch('https://thaikadar.com/api/save-inbox',
  {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
     
      sender_id:userid,
      receiver_id:postvalueparsed1.user_id,
      inbox_id:0,
      post_id: postvalueparsed1.id, 
      last_message:text,
      
     }),
   })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log(responseJson)
    
   
   })










 setText("")





 }

// const sendMessages = async()=>{

//   setArrayTemp([]);
        
//   setMessages([]);

//   setProgress(true)
//   console.log("send msg:::::::::",messages,"Data::::",Date())

//   const orderObj = JSON.parse(await AsyncStorage.getItem('orderObj'))
//   console.log("order_Id:::::",orderObj._id)
//   const user = JSON.parse(await AsyncStorage.getItem('user'))
//  console.log("user_ID:::::",user._id) 
//  const fromDate = new Date().toISOString();
// let msg = {reciverId:orderObj._id,createdAt:fromDate,senderId:user._id,senderName:user.name,senderMsg:text,senderImg:user.image_path,}
//  let newr;
//  newr = db().ref('/messages').child("615ef920d32ef1001601659e").push(
//   msg
//  );
//  setProgress(false)
//  console.log("msg sucessfully push::::")
//  setText("")

//  }
 const dialCall = () => {


  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${1234567890}';
  }
  else {
    phoneNumber = 'telprompt:${1234567890}';
  }

  Linking.openURL(phoneNumber);
  
};

return(
    <Chat  
    dialCall={dialCall} 
    onRefresh={onRefresh} 
     RyederId={RyederId} 
     messages={messages} 
     refreshing={refreshing} 
     navigation={props.navigation} 
     sendMessages={sendMessages} 
     text={text} 
  
   userid={userid} 
     setText={setText} 
    
     progress={progress} />
)







  }

  export default Chat_Controller