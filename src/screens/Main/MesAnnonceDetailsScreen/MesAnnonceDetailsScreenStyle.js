import { Dimensions, StyleSheet } from "react-native";

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
    cameraIcon: {
        fontSize: 80,
        color: '#28A646',
    },
    plusIcon: {
        fontSize: 30,
        position: 'absolute',
        color: 'red',
        right: 130,
        bottom: 60
    },
    inputBoxStyle: {
        height: 50,
        borderWidth: 0.5,
        borderRadius: 20,
        color: '#002B64',
        fontWeight: '400',
        fontSize: 18,
        borderColor: '#002B64',
        paddingHorizontal: 10
    },
    descriptionBoxStyle: {
        height: 100,
        borderWidth: 0.5,
        borderRadius: 20,
        color: '#002B64',
        fontWeight: '400',
        fontSize: 18,
        borderColor: '#002B64',
        paddingHorizontal: 10,
        textAlignVertical: "top"
    },
    forwardIcon: {
        paddingHorizontal: 10,
        color: '#C9C9C9',
        fontSize: 30,
        alignSelf: 'center'
    }

})