import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        backgroundColor: "white"
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
        alignItems: 'center'
    },
    imageLogoStyle: {
        height: 50,
        width: 50
    },
    iconView: {
        marginLeft: 10,
    },
    inputBoxStyle: {
        height: 50,
        margin: 12,
        paddingRight: 40,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 40 / 2,
        borderColor: '#000',
        color: '#000',
        backgroundColor: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
    searchIcon: {
        paddingHorizontal: 10,
        color: 'gray',
        fontSize: 30,
        position: 'absolute',
        right: 8,
        top: 20,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },
    circleIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 1,
        borderColor: '#28A646',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icons: {
        paddingHorizontal: 10,
        color: 'red',
        fontSize: 30,
        alignSelf: 'center'
    },
    iconTextStyle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300'
    },
    headerText:{
        color:'#fff',
        fontSize:28,
        letterSpacing:1
    },
    messageImageStyle:{
        flex:1,
        resizeMode:'contain',
        width:'100%'
    }
})