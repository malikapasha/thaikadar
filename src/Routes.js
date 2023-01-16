import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Main/HomeScreen/HomeScreen';
import MessageScreen from './screens/Main/MessageScreen/MessageScreen';
import FavouriteScreen from './screens/Main/FavouriteScreen/FavouriteScreen';
import UserSceen from './screens/Main/UserScreen/UserScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddScreen from './screens/Main/AddSreen/AddScreen';
import SignInScreen from "./screens/Auth/SignInScreen/SignInScreen";
import IntroScreen from "./screens/Auth/Intro";
import WelcomeLoginWith from "./screens/Auth/WelcomeLoginWith";



import SignUpScreen from "./screens/Auth/SignUpScreen/SignUpScreen";
import SignInBusinessScreen from "./screens/Auth/SignInBusinessScreen/SignInBusinessScreen";
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import MesAnnonceScreen from './screens/Main/MesAnnonceScreen/MesAnnonceScreen';
import MesAnnonceDetailsScreen from './screens/Main/MesAnnonceDetailsScreen/MesAnnonceDetailsScreen';
import HomeDetailsScreen from './screens/Main/HomeDetailsScreen/HomeDetailsScreen';
import EditUserScreen from './screens/Main/EditUserScreen/EditUserScreen';
import  OtpSocial from './screens/Main/OtpSocial/OtpSocial'
import OtpVerification from './screens/Main/OtpSocial/OtpVerification'
import UpdatePassword from './screens/Main/OtpSocial/UpdatePassword'
import WebView from './screens/Main/WebView/WebView'
 import Chat from './screens/Main/Chat/Chat'
  import Map from './screens/Main/Map/Map'

import  Chat_Controller from './screens/Main/Chat/Chat_Controller'

import  Inbox_Chat_Controller from './screens/Main/Chatinbox/Chat_Controller'
 import InboxChat from './screens/Main/Chatinbox/Chat'

const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
};

const Tab = createBottomTabNavigator();
const TabRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'MessageScreen') {
                        iconName = focused ? 'mail' : 'mail-outline';
                    } else if (route.name === 'AddScreen') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'FavouriteScreen') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'UserScreen') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: '#28A646',
                tabBarInactiveTintColor: '#C3C3C3',
            })}
        >
            
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
            <Tab.Screen name="AddScreen" component={AddScreen} options={{ headerShown: false }} />
            <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} options={{ headerShown: false }} />
            <Tab.Screen name="UserScreen" component={UserSceen} options={{ headerShown: false }} />
            
            
        </Tab.Navigator>
    );
}


const AuthStack = createNativeStackNavigator();
const AuthStacks = ()=>{

    return (
        <AuthStack.Navigator
            initialRouteName="IntroScreen"
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnabled: false,
                TransitionScreenOptions
            })}
            options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
             <AuthStack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
             <AuthStack.Screen name="WelcomeLoginWith" component={WelcomeLoginWith} options={{ headerShown: false }} />
            
             
            <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="OtpSocial" component={OtpSocial} options={{ headerShown: false }} />
            <AuthStack.Screen name="UpdatePassword" component={UpdatePassword} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignInBusinessScreen" component={SignInBusinessScreen} options={{ headerShown: false }} />
            

        </AuthStack.Navigator>
    )
}


// const Stack = createNativeStackNavigator();
// const StackRoutes = () => {
//     return (
//         <Stack.Navigator
//             // initialRouteName="SignInScreen"
//             screenOptions={({ route, navigation }) => ({
//                 headerShown: false,
//                 gestureEnabled: false,
//                 TransitionScreenOptions
//             })}
//             options={{
//                 cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//             }}>
         
//                 <Stack.Screen name="Chat_Controller" component={Chat_Controller} options={{ headerShown: false }} />
//                 <Stack.Screen name="Inbox_Chat_Controller" component={Inbox_Chat_Controller} options={{ headerShown: false }} />
//                 <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
//                 <Stack.Screen name="InboxChat" component={InboxChat} options={{ headerShown: false }} />
//                 <Stack.Screen name="WebView" component={WebView} options={{ headerShown: false }} />
//                 <Stack.Screen name="HomeDetailsScreen" component={HomeDetailsScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="MesAnnonceScreen" component={MesAnnonceScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="MesAnnonceDetailsScreen" component={MesAnnonceDetailsScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="EditUserScreen" component={EditUserScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
                
          
//         </Stack.Navigator>
//     )
// }

const MainStack = createNativeStackNavigator();
const Routes = () => {
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen name="AuthStack" component={AuthStacks} options={{ headerShown: false }} />
                <MainStack.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: false }} />
                {/* <MainStack.Screen name="StackRoutes" component={StackRoutes} options={{ headerShown: false }} /> */}
                <MainStack.Screen name="Chat_Controller" component={Chat_Controller} options={{ headerShown: false }} />
                <MainStack.Screen name="Inbox_Chat_Controller" component={Inbox_Chat_Controller} options={{ headerShown: false }} />
                <MainStack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <MainStack.Screen name="InboxChat" component={InboxChat} options={{ headerShown: false }} />
                <MainStack.Screen name="WebView" component={WebView} options={{ headerShown: false }} />
                <MainStack.Screen name="HomeDetailsScreen" component={HomeDetailsScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="MesAnnonceScreen" component={MesAnnonceScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="MesAnnonceDetailsScreen" component={MesAnnonceDetailsScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="EditUserScreen" component={EditUserScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="Map" component={Map} options={{ headerShown: false }} />
             
               
                
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;