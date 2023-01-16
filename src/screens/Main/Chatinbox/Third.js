import React from "react";
import { TextInput, TouchableOpacity, View, SafeAreaView, Image, ScrollView, Text } from "react-native";
import { styles } from "./MesAnnonceScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';

const MesAnnonceScreen = ({ navigation }) => {
    const logoImage = require('../../../assets/images/logo/logo.png');
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.imageLogoView}>
                    <Text style={styles.headerText}>Mes annonce</Text>
                </View>
                <View></View>
            </View>
            <View style={{ backgroundColor: '#fff', paddingTop: 10}}>
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.inputBoxStyle}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name={'search-outline'}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                            <View style={{
                                flex: 2,
                                marginRight: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MesAnnonceDetailsScreen')}>
                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 2,
                                marginLeft: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                            <View style={{
                                flex: 2,
                                marginRight: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>

                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 2,
                                marginLeft: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                            <View style={{
                                flex: 2,
                                marginRight: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>

                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 2,
                                marginLeft: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>

                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                            <View style={{
                                flex: 2,
                                marginRight: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>

                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 2,
                                marginLeft: 10,
                                elevation: 3,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderColor: '#c3c3c3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                shadowColor: '#000',
                            }}>
                                <TouchableOpacity>

                                    <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode='cover' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 120 }} />
                                    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#050A30' }}>Villa piscine</Text>
                                        <Text style={{ color: '#c3c3c3' }}>-Conakry</Text>
                                        <Text style={{ color: '#050A30', textAlign: 'right', marginRight: 5 }}>1.050.000€</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default MesAnnonceScreen;