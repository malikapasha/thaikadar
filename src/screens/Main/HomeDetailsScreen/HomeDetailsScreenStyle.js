import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        backgroundColor: "#28A646"
    },
    safeViewStyle:
    {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    imageLogoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backIcon: {
        fontSize: 30,
        color: '#002B64',
    },
    imageLogoStyle: {
        height: 50,
        width: 50
    },
    iconView: {
        marginLeft: 10,
    },
    container: {
        backgroundColor: "#fff",
        marginBottom: 30
    },
    iconStyle: {
        fontSize: 30,
        color: '#7B8999',
        position:"absolute",
     
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingVertical: 5,
      
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',
        height:40,
        width:40,
        alignItems:"center"
    },
    iconStyle1: {
       
        fontSize: 30,
        color: '#7B8999',
        position:"absolute",
       
        paddingHorizontal: 5,
        backgroundColor: 'red',
        borderRadius: 50,
        paddingVertical: 5,
         left:20,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',
        height:40,
        width:40,
        alignItems:"center"
    },
    iconStyle2: {
        fontSize: 30,
        color: '#7B8999',
        position:"absolute",
      
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 50,
      
        left:10,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: '#000',
        height:40,
        width:40,
       justifyContent:"center"
       
    },
    shareIcon: {
        fontSize: 30,
        color: '#002B64',
    },
    socialLogoStyle: {
        height: 30,
        width: 30
    },

})