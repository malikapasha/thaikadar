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
        marginBottom: 60,
        height:800,
    },
    inputBoxStyle: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 20,
        color: '#002B64',
        fontWeight: '400',
        fontSize: 18,
        borderColor: '#002B64',
        paddingHorizontal: 10,
       
    },
    textBoxStyle: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: '#002B64',
        paddingHorizontal: 10,
        justifyContent:"center",
        top:10
      
      
       
    },
    textStyle:{
        color: '#002B64',
        fontWeight: '400',
        fontSize: 18,
    },
    profileIcon: {
        paddingHorizontal: 10,
        color: '#C9C9C9',
        fontSize: 70,
        alignSelf: 'center'
    },

})