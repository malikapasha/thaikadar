import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "./SignInScreen/SignInScreen";
import SignUpScreen from "./SignUpScreen/SignUpScreen";
import SignInBusinessScreen from "./SignInBusinessScreen/SignInBusinessScreen";

const Stack = createNativeStackNavigator();

const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
};

const AuthNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName="SignInScreen"
                screenOptions={({ route, navigation }) => ({
                    headerShown: false,
                    gestureEnabled: false,
                    TransitionScreenOptions
                })}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignInBusinessScreen" component={SignInBusinessScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNavigator;