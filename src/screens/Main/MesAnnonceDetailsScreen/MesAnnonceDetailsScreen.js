
import React, { useRef, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View, SafeAreaView, Image, ScrollView, Text, Dimensions } from "react-native";
import { styles } from "./MesAnnonceDetailsScreenStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";

const logoImage = require('../../../assets/images/logo/logo.png');

const MesAnnonceDetailsScreen = ({ navigation }) => {
    const [locationModal, setlocationModal] = useState(false);
    const [categoriesModal, setcategoriesModal] = useState(false);
    const [prixModal, setPrixModal] = useState(false);
  
    const refRBSheet = useRef();
const [arrCategory,setArrCategory] = useState([

    {
        id :1,
        categoryName:"Immobilier"

    },
])



    useEffect(() => {
       
        if (locationModal) {
            refRBSheet.current.open();
        }
    }, [locationModal]);

    useEffect(() => {
        if (categoriesModal) {
            refRBSheet.current.open();
        }
    }, [categoriesModal]);

    useEffect(() => {
        if (prixModal) {
            refRBSheet.current.open();
        }
    }, [prixModal]);
    const get_values = async () => {

        console.log("obj::::::",obj) 

    }

    const get_pricdata = async () => {

        let obj =  {"contactno": text,}
       
        console.log("obj::::::",obj)
        // AsyncStorage.setItem('user', JSON.stringify(obj));

    }

   


    return (
        <SafeAreaView style={styles.safeAreaViewStyle} forceInset={'never'}>
            <View style={styles.safeViewStyle}>
                <View>
                    <Icon
                        name={'ios-chevron-back'}
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.imageLogoView}>
                    <Image source={logoImage} style={styles.imageLogoStyle} />
                </View>
            </View>
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <View>
                        <Image source={require('../../../assets/images/home/Home-Adidas-Banner.jpg')} resizeMode='contain' style={{ height: 200, width: Dimensions.get('window').width }} />
                    </View>
                    <View style={{ margin: 15 }}>
                        <View style={{ marginTop: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Title</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Description</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={styles.descriptionBoxStyle}
                                    multiline
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View> 
                    <View style={{ marginTop: 15, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={() => setPrixModal(true)}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#002B64', fontSize: 18 }}>Price Type</Text>
                                </View>
                                <View style={{ marginTop: 10, justifyContent: "center" }}>
                                    <TextInput
                                        style={[styles.inputBoxStyle, { height: 40 }]}
                                        editable={false}
                                        underlineColorAndroid="transparent"
                                        placeholder="Price"
                                        // onChangeText={text => settxtProPrice(text)}
                                        // defaultValue={txtProPrice}
                                    />
                                    <View style={{ position: 'absolute', right: 0 }}>
                                        <Icon
                                            name={'ios-chevron-forward'}
                                            style={styles.forwardIcon}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#002B64', fontSize: 18 }}>Price</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        style={[styles.inputBoxStyle, { height: 40 }]}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setcategoriesModal(true)}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Categorie</Text>
                            </View>
                            <View style={{ marginTop: 10, justifyContent: "center" }}>
                                <TextInput
                                    editable={false}
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                />
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <Icon
                                        name={'ios-chevron-forward'}
                                        style={styles.forwardIcon}

                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setlocationModal(true)}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#002B64', fontSize: 18 }}>Location</Text>
                            </View>
                            <View style={{ marginTop: 10, justifyContent: "center" }}>
                                <TextInput
                                    editable={false}
                                    style={styles.inputBoxStyle}
                                    underlineColorAndroid="transparent"
                                />
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <Icon
                                        name={'ios-chevron-forward'}
                                        style={styles.forwardIcon}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderColor: '002B64', borderWidth: 1, marginTop: 25, marginBottom: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#28A646', borderRadius: 30, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            {prixModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setPrixModal(true)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Type de prix</Text>
                            </View>
                            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity onPress={()=> get_pricdata()}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Negotiable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> get_pricdata()}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Fixed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> get_pricdata()}
                                style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>free</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Gratuit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>prix négociable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>enchère</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </RBSheet>
                </View>
            )}
            {categoriesModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setcategoriesModal(true)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>Categorie</Text>
                            </View>
                            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Immobilier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>vehicule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Vetements</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Habby</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Sport</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Electronique</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Immobilier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>vehicule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Vetements</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Habby</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Sport</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>Electronique</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </RBSheet>
                </View>
            )}
            {locationModal && (
                <View style={{ justifyContent: 'center' }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={500}
                        openDuration={250}
                        onClose={() => setlocationModal(true)}
                        dragFromTopOnly={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                            draggableIcon: {
                                width: 38,
                                height: 6,
                                marginTop: 15,
                                backgroundColor: "#E8E8E8",
                            },
                        }}
                    >
                        <View style={{ marginHorizontal: 40 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#050A30', }}>localisation</Text>
                            </View>
                            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#050A30', fontSize: 18 }}>localisation</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </RBSheet>
                </View>
            )}
        </SafeAreaView>
    )
}

export default MesAnnonceDetailsScreen;
