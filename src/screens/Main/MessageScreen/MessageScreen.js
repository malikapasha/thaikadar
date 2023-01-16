
import React ,{useState,useEffect } from "react";
import { TextInput, View, SafeAreaView, Image,FlatList, ScrollView, Text,TouchableOpacity} from "react-native";
import { styles } from "./MessageScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationContainer ,useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
const MessageScreen = ({ navigation }) => {

    const logoImage = require('../../../assets/images/logo/logo.png');
    const messageImage = require('../../../assets/images/draw-empty-box/draw-empty-box.png');


    const [messages, setMessages] = useState([]);

     const [userdata, setuserdata] = useState({});

    const [msgdata, setmsgdata] = useState([]);
    // const [inboxmsg, setinboxmsg] = useState([]);
  const isFocused = useIsFocused();

    // useEffect(() => {
    //     // inboxapiHandler()
    //     sendmsgapiHandler()
    //     getmsgapiHandler()
        
    //   }, [isFocused]);

        useEffect(() => {
      
      console.log("Your inbox is calling here................")

        getmsgapiHandler()

    }, [isFocused]);

  const getmsgapiHandler = async ()=>{
         
    
    // let value = await AsyncStorage.getItem('user2');
    // let parsed = JSON.parse(value);

    let value1 = await AsyncStorage.getItem('user');
    console.log("Value:::::",value1)

    let parsed1 = JSON.parse(value1);
    
    setuserdata(parsed1);

    //http://circularbyte.com/cwp/api/get-inbox/34
 // fetch('https://thaikadar.com/api/get-inbox/'+parsed1.id,
 fetch('https://thaikadar.com/api/get-inbox/'+parsed1.id,
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
        console.log("inbox msg Api calling.............",responseJson)
       
      
        let inboxdata = [];
        let m = responseJson.data;

                     for(let i=0;i<m.length;i++)
                {
                 
                   
                    try
                    {
                         let sender_title = m[i].sender_name.split(" ");
                    m[i].sender_initials = sender_title[0].split("")[0].toUpperCase() + ""+sender_title[1].split("")[0].toUpperCase()
                    }
                    catch(ex)
                    {
                        try
                        {
                             let sender_title = m[i].sender_name.split(" ");
 m[i].sender_initials = sender_title[0].split("")[0].toUpperCase() + ""+sender_title[0].split("")[1].toUpperCase()
                        }
                        catch(ex)
                        {
                             m[i].sender_initials = "UN"
                        }
                  
                    }
                  
                       try
                    {
                           let receiver_title = m[i].receiver_name.split(" ");
                    m[i].receiver_initials = receiver_title[0].split("")[0].toUpperCase() + ""+receiver_title[1].split("")[0].toUpperCase()
 
                }
                    catch(ex)
                    {
                        try
                        {
                               let receiver_title = m[i].receiver_name.split(" ");
    m[i].receiver_initials = receiver_title[0].split("")[0].toUpperCase() + ""+receiver_title[0].split("")[1].toUpperCase()
                         }
                        catch(ex)
                        {
                             m[i].receiver_initials = "UN"
                        }
 
                    }

                    console.log( m[i].receiver_initials+" and "+ m[i].sender_initials);

                  inboxdata.push(m[i])
                
      
                 
                }
                 setmsgdata(inboxdata)

     
     })






  }






   
    //   const inboxapiHandler = async()=>{
       
    //     // const lang = await AsyncStorage.getItem('language');
    //     // if (lang !== null) {
    //     //   setlang(lang);
    //     // }
  
  
    //       // let value = await AsyncStorage.getItem('user2id');
    //       // let parsed1 = JSON.parse(value);
  
        
    //       let value1 = await AsyncStorage.getItem('user');
      
    //       let parsed = JSON.parse(value1);
  
    //     //   setmySenderid(parsed._id)
    //     //   setmySenderName1(parsed.name)
  
    //     //   console.log('ID is: ',parsed._id);
      
    //       fetch(
    //           'https://thaikadar.com/api/save-inbox'+parsed._id
    //           )
              
    //           .then((response) => response.json())
    //           .then((responseJson) => {
    //             console.log("res::",responseJson)
      
    //             let m=responseJson.data
    //             let chat = []
    //             for(let i=0;i<m.length;i++)
    //             {
                 
    //               chat.push(m[i])
                
      
    //               if( parsed._id === m[i].sender_id){
                  
    //             console.log("id is matched:::::::::")
    //             chat[i].name = m[i].receiver_name;
                   
    //               }
  
    //               else{
                   
    //                   chat[i].name = m[i].sender_name;
    //                   console.log("id is not matched:::::::::")
                 
    //               }
    //             }
      
               
    //         setMessages(chat);
  
      
               
               
    //           })
    //           .catch((error) => {
                 
    //             console.log(error)
    //             console.log('errorgetAllrest.....................................')
               
               
  
  
  
  
    //           });
        
      
    //       }
  
  
  


    const  RenderList=()=>
{
    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={async () => 
        {
               await AsyncStorage.setItem('selectinbox', JSON.stringify(item));
      let userValue =  await AsyncStorage.getItem('selectinbox')
      console.log('Your MainItem is here................',userValue)

        navigation.navigate('Inbox_Chat_Controller',{item:item})

            console.log(item)}
        }
        >

        <View style={{height:80,
           width:'100%',
           backgroundColor:"white",
           alignSelf:"center",
           flexDirection:"row",
           marginVertical:4,  
           borderBottomWidth:0.5,
           borderBottomColor:"lightgray",
           flexDirection:"row"
           }}>
      

       
            <View style={{height:60,width:60,borderRadius:60/2,backgroundColor:"#F0F9F5",justifyContent:"center"}}>
            
              {item.receiver_id == userdata.id ? 
            <Text style={{fontSize:28,fontWeight:"bold",color:"black",alignSelf:'center'}}>{item.sender_initials}</Text>
                :
    <Text style={{fontSize:28,fontWeight:"bold",color:"black",alignSelf:'center'}}>{item.receiver_initials}</Text>
              }

        {/* <Image
          source={{uri:"https://thaikadar.com/public/postimage/"+item.post_image}}
                        style={{
                            height:"100%",
                            width: "100%",
                           borderRadius:60/2,
                        //    alignSelf:"center",
                           
                           
            
    
                        }}
                    /> */}
                    </View>
                    <View style={{height:"100%",width:"80%",backgroundColor:"transparent"}}>
                    <View style={{backgroundColor:"transparent",height:'40%',width:'100%',flexDirection:"row"}}>
                       <View style={{height:"100%",width:"55%",backgroundColor:'transparent',justifyContent:'center'}}>
                       {item.receiver_id == userdata.id ? 
                        <Text style={{fontSize:13,fontWeight:"bold",left:10}}>{item.post_title} </Text>
                        :
                         <Text style={{fontSize:13,fontWeight:"bold",left:10}}>{item.post_title} </Text>
                        }
                       </View>
                       <View style={{height:"100%",width:"45%",backgroundColor:'transparent',justifyContent:'center'}}>
                        <Text style={{fontSize:11,fontWeight:"bold",}}>{item.updated_at}</Text>
                       </View>
                        </View>
                        <View style={{backgroundColor:"transparent",height:'60%',width:'100%',flexDirection:"row"}}>
                        <Text style={{fontSize:13,fontWeight:"bold",left:10}}>{item.last_message}</Text>
                            </View>
                            </View>
        
        {/* <View style={{backgroundColor:"transparent",height:'100%',width:'100%'}}>
        <View style={{height:"30%",width:"75%",backgroundColor:"transparent",justifyContent:"center"}}>
              
              <Text style={{fontSize:13,fontWeight:"bold",}}>{item.name}</Text>
              
           
             </View>
             <View style={{height:"35%",width:"75%",backgroundColor:"transparent",justifyContent:"center"}}> 
            <Text style={{fontSize:12}} >{item.last_message}</Text>
            </View>
            <View style={{color:"gray",height:'35%',width:'75%',backgroundColor:"transparent",justifyContent:"center",alignItems:"flex-end"}}>  
            <Text style={{fontSize:13,fontWeight:"bold"}} >{item.createdAt}</Text>
            </View>
           
        </View> */}
        
        </View>
        </TouchableOpacity>
    

    );
    return(
        <View style={{ flex:1,
            backgroundColor:"transparent",
          width:"100%"
            }}>
     
   <View style={{height:"2%",backgroundColor:"transparent",}}>
   
    <View style={{height:"100%",width:"100%",backgroundColor:"transparent",flexDirection:"row",justifyContent:"center",}}>
        {/* <View style={{height:"50%",width:"80%",marginLeft:10,backgroundColor:"transparent",}}>
   <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{height:"100%",width:"100%",borderRadius:15,marginTop:20}}
    />
    </View> */}
    
    {/* <View style={{height:40,width:40,backgroundColor:"orange",marginLeft:10,marginTop:20,borderRadius:10}}>
        <IconFantiso.Button
              name="equalizer"
              backgroundColor="transparent"
              color ="white"
              underlayColor={'transparent'}
              size={14}  
             
              iconStyle ={{transform: [{ rotate: '90deg'}],height:20,}}
              >

            </IconFantiso.Button>  
            </View> */}
        </View>
        </View>
                
        <FlatList
         showsVerticalScrollIndicator={false}
        data={msgdata}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        // contentContainerStyle={{ right: 5 ,top: 5, left: 5, bottom: 5}}
    />
    </View>
        );
}
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'mail-outline'}
                        style={styles.icons}
                    />
                </View>
                <View>
                    <Text style={styles.headerText}>Inbox</Text>
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View>
            <View style={styles.container}>
                {
                 msgdata.length===0?
                <Image source={messageImage} style={styles.messageImageStyle} />
                :
                <View>
                    </View>
}
                <RenderList/>
            </View>
        </SafeAreaView>
    )
}

export default MessageScreen;



