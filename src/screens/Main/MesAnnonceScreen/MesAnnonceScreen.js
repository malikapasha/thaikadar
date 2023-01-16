import React, { useState,useEffect } from "react";
import { TextInput, View, SafeAreaView,FlatList, Image, ScrollView, Text, TouchableOpacity,ActivityIndicator, Dimensions} from "react-native";
import { styles } from "./MesAnnonceScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const {height,width} = Dimensions.get('window');

const MesAnnonceScreen = ({ navigation }) => {
    const logoImage = require('../../../assets/images/logo/logo.png');
    const [isHeartSelected, setIsHeartSelected] = useState(false);
           const [listdata, setlistdata] = useState([]);
           const [temArr, setTemArr] = useState([]);
           const [userid, setuserid] = useState();
          
              const [searchQuery, setSearchQuery] = React.useState('');

           const [progress,setProgress] = useState(false)
    const navigateToDetail = async (item) => {

        await AsyncStorage.setItem('selectpostid',item.id+'');
        await AsyncStorage.setItem('selectposttitle',item.post_title);

        navigation.navigate('HomeDetailsScreen')
		
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

    const isFocused = useIsFocused();
    useEffect(() => {
        get_SearchData()
        handleIDs()
       
      }, [isFocused]);

      const handleIDs =async (item) => {
        // // console.log("Your MainItem is here........................",item)
        // // await AsyncStorage.setItem('Selectedaddress', JSON.stringify(item));
        // let userValue =  await AsyncStorage.getItem('Selectedaddress')
        // let parsed1 = JSON.parse(userValue);
        // console.log('Your chat Item is here................',parsed1)
        // setuserid(parsed1.id)
      
        let value1 = await AsyncStorage.getItem('user');
              
                  let parsed = JSON.parse(value1);
                  console.log("real user id ..............",parsed)
                  setuserid(parsed.id)
                  console.log("Your chat Item is here ..............",parsed.id)
                
      
      }


      const get_SearchData = async () => {
      
           let value1 = await AsyncStorage.getItem('user');

        let parsed = JSON.parse(value1);
                  console.log("real user id ..............",parsed)
                  setuserid(parsed.id)
                  console.log("Your chat Item is here ..............",parsed.id)

                setlistdata([])
                setTemArr([])
                setProgress(true)

        fetch(
            'https://thaikadar.com/api/user-posts/'+parsed.id
            )
            
            
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("SearchList::",responseJson.data)
    
         
            setProgress(false)
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
                <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.backIcon}
                        onPress={() => navigation.navigate("TabRoutes")}
                    />
                </View>
                <View style={styles.imageLogoView}>
                    <Text style={styles.headerText}>My Posts</Text>
                </View>
                <View></View>
            </View>
            <View style={{ backgroundColor: '#fff', paddingTop: 10}}>
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.inputBoxStyle}
                        underlineColorAndroid="transparent"
                           onChangeText={(text)=>searchFilterFunction(text)}
                    />
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
    
                        <Icon
                            name={'search-outline'}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'heart-outline'}
                        style={styles.icons}
                    />
                </View>
                <View>
                    <Text style={styles.headerText}>Favorite</Text>
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View> */}
           
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
                                <TouchableOpacity onPress={()=>navigateToDetail(item)}>
                                    <Icon
                                        name={isHeartSelected ? 'heart' : 'heart-outline'}
                                        style={isHeartSelected ? styles.heartIconSelected : styles.heartIcon}
                                        onPress={() => setIsHeartSelected(!isHeartSelected)}
                                    />
                                    <Image source={{ uri: "https://thaikadar.com/public/postimage/"+item.post_image }}
                                     resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 100 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <View>
                        <Text style={{ color: '#050A30' }}> {item.post_title}</Text>
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

export default MesAnnonceScreen;