import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './Routes';
import AuthNavigator from './screens/Auth/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import SignInScreen from "./screens/Auth/SignInScreen/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen/SignUpScreen";
import SignInBusinessScreen from "./screens/Auth/SignInBusinessScreen/SignInBusinessScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Main/HomeScreen/HomeScreen';
import MessageScreen from './screens/Main/MessageScreen/MessageScreen';
import FavouriteScreen from './screens/Main/FavouriteScreen/FavouriteScreen';
import UserSceen from './screens/Main/UserScreen/UserScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddScreen from './screens/Main/AddSreen/AddScreen';
import Map from './screens/Main/Map/Map';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
};

class Navigator extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000)
    }


    render() {
        return (
            <Routes />
        )
    }
}

export default Navigator;

