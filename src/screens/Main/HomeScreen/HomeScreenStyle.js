import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        // backgroundColor: "#28A646",
        // paddingTop: 10,
    },
    safeViewStyle:
    {
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    imageLogoView: {
        flex: 1,
        alignItems: 'center'
    },
    imageLogoStyle: {
        height: 60,
        width: 60
    },
    searchView: {
        flex: 5,
        flexDirection: 'row',
       
    },
    inputBoxStyle: {
        height: 40,
        margin: 12,
        paddingRight: 40,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderRadius: 10 / 2,
        borderColor: 'gray',
        color: 'gray',
        backgroundColor: '#fff',
        fontWeight: '400',
        fontSize: 18,
        width: '95%',
        alignSelf:'center',
        
    },
    searchIcon: {
        paddingHorizontal: 10,
        color: 'gray',
        fontSize: 24,
        position: 'absolute',
        right: 12,
        alignSelf: 'center'
    },
    bannerContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
      

    },
    bodyContainer: {
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
        color: '#000',
        fontSize: 30,
        alignSelf: 'center'
    },
    heartIcon: {
        paddingHorizontal: 5,
        color: '#050A30',
        fontSize: 20,
        position: 'absolute',
        zIndex: 1,
        right: 8,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        marginTop: 5,
        borderRadius: 50,
        paddingVertical: 5
    },
    heartIconSelected: {
        paddingHorizontal: 5,
        color: 'red',
        fontSize: 20,
        position: 'absolute',
        zIndex: 1,
        right: 8,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        marginTop: 5,
        borderRadius: 50,
        paddingVertical: 5
    },
    iconTextStyle: {
        textAlign: 'center',
        
        fontSize: 10,
        
    }
})