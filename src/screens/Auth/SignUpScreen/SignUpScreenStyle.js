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
        marginTop: 10
    },
    bottomTextStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 50
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
        alignSelf:'center'
    },
    accèsdirectStyle: {
        paddingVertical: 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 30,
        width: '30%',
        marginVertical: 15,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accèsdirectTextStyle: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14
    },
    allLoginLogos: {
        marginVertical: 20,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logosImageStyle: {
        height: 24,
        width: 24
    },
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "#00AA35"
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
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