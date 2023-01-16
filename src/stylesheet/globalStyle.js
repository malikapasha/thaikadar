
import {Text,StyleSheet} from 'react-native';



export const globalStyle = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#FFFFFF",
      
     
    },
    RoundedImage:{
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "transparent",
        backgroundColor:"#28A646",
        alignSelf:"center"
     
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: "#E8E8E8",
        height: "25%",
        borderRadius: 5,
        margin:8
      },
      sectionStyle1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: "#E8E8E8",
        height: 40,
        borderRadius: 5,
        
        
       
      },
      imageStyle: {
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        backgroundColor:"transparent",
        justifyContent:"center"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
}
);
