import React, { useState } from "react";
import { Text, View, StatusBar, ImageBackground, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./SignInBusinessScreenStyle";
import RadioForm from 'react-native-simple-radio-button';

const backgroundImage = require('../../../assets/images/home-screen/home-screen.png');
const logoImage = require('../../../assets/images/logo/logo.png');

var radio_props = [
    { label: 'particulier', value: 0 },
    { label: 'professionnel', value: 1 }
];

const SignInBusinessScreen = ({ navigation }) => {
    const [radio, setRadio] = useState(0);

    const handleSubmit = () => {
        navigation.navigate('SignInScreen');
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <Text style={styles.topTextStyle}></Text>
                        <View style={styles.logoViewStyle}>
                            <Image source={logoImage} style={styles.imageLogoStyle} />
                        </View>
                        <View style={styles.inputTextViewStyle}>
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Prenom:"
                                placeholderTextColor='#fff'
                                underlineColorAndroid="transparent"
                            />
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Adresse mail:"
                                placeholderTextColor='#fff'
                                keyboardType="email-address"
                                underlineColorAndroid="transparent"
                            />
                            <TextInput
                                style={styles.inputBoxStyle}
                                placeholder="Telephone:"
                                placeholderTextColor='#fff'
                                keyboardType="phone-pad"
                                underlineColorAndroid="transparent"
                            />
                            {radio == 1 && (
                                <>
                                    <TextInput
                                        style={styles.inputBoxStyle}
                                        placeholder="Nom de l'entreprise"
                                        placeholderTextColor='#fff'
                                        underlineColorAndroid="transparent"
                                    />
                                    <TextInput
                                        style={styles.inputBoxStyle}
                                        placeholder="Téléphone de l'entreprise"
                                        placeholderTextColor='#fff'
                                        underlineColorAndroid="transparent"
                                        keyboardType="phone-pad"
                                    />
                                </>
                            )}
                            <View>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    onPress={(value) => { setRadio(value) }}
                                    formHorizontal={true}
                                    buttonColor={'#fff'}
                                    selectedButtonColor={'#00A63C'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelStyle={{
                                        color: '#fff',
                                        fontWeight: '500',
                                        fontSize: 18,
                                        marginRight: 15
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.buttonTextStyle}>S'inscrire</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

export default SignInBusinessScreen