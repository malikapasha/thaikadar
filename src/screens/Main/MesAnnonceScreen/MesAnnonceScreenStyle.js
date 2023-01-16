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
    headerText: {
        color: '#fff',
        fontSize: 28,
        letterSpacing: 1
    },
    searchView: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    inputBoxStyle: {
        height: 40,
        margin: 12,
        paddingRight: 40,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderRadius: 40 / 2,
        borderColor: 'gray',
        color: 'gray',
        backgroundColor: '#fff',
        fontWeight: '400',
        fontSize: 18,
        width: '80%',
    },
    searchIcon: {
        paddingHorizontal: 10,
        color: 'red',
        fontSize: 24,
        position: 'absolute',
        right: 12,
        alignSelf: 'center'
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
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom:120
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
        paddingVertical: 5,
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
})