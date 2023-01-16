import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    safeAreaViewStyle: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        paddingTop: 50
    },
    topTextStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
      
        
    },
    bottomTextStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 10
    },
    logoViewStyle: {
        alignItems: 'center',
        marginVertical: 10,
    },
    imageLogoStyle: {
        height: 120,
        width: 120
    },
    inputTextViewStyle: {
        flex: 1,
        alignItems: 'center',
    },
    inputBoxStyle: {
        height: 50,
        margin: 12,
        borderBottomWidth: 3,
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        width: '80%',
        borderColor: '#fff'
    },
    submitButton: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 40,
        width: '50%',
        marginVertical: 15,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: '#050A30',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        // alignSelf:'center',
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    accèsdirectStyle: {
        paddingVertical: 2,
        backgroundColor: 'black',
        borderRadius: 20,
        height: 30,
        width: 120,
        marginVertical: 25,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accèsdirectStyleinner: {
        flexDirection:'row',
      
     
      
        height: 45,
        width: '100%',
     
      marginBottom:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accèsdirectTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        alignSelf:'center'
    },
    allLoginLogos: {
        marginTop: 20,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logosImageStyle: {
        height: 34,
        width: 34,
        margin:5
    },
    textinputiconStyle:{
        flexDirection:'row',
        alignItems:'center'
    },
    eyeIcon: {
        paddingHorizontal: 10,
        color: '#fff',
        fontSize:30,
        position: 'absolute',
        right: 2,
        alignSelf: 'center'
    },
})