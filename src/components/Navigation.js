import React from "react";
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegesterScreen from "../screens/RegesterScreen";
import RegesterChoose from "../screens/RegesterChoose";
import RegesterScreen2 from "../screens/RegesterScreen2";
import Ref from "../screens/Ref";
import RefTodayFood from "../screens/RefTodayFood";
import Meal from "../screens/Meal";
import Store from "../screens/Store";
import Donate1 from "../screens/Donate1";
import Donate2 from "../screens/Donate2";
import Donate3 from "../screens/Donate3";
import Take1 from "../screens/Take1";
import Take2 from "../screens/Take2";
import Take3 from "../screens/Take3";
import GoogleMap from "../screens/GoogleMap";
import Me from "../screens/Me";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Navigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name  ="Login" component={LoginScreen}/>
                <Stack.Screen name  ="Home" component={HomeScreen} />
                <Stack.Screen name  ="Regester" component={RegesterScreen}  />
                <Stack.Screen name  ="Regester2" component={RegesterScreen2}  />
                <Stack.Screen name  ="RegesterChoose" component={RegesterChoose} />
                <Stack.Screen name  ="Ref" component={Ref} />
                <Stack.Screen name  ="RefTodayFood" component={RefTodayFood}  />
                <Stack.Screen name  ="Meal" component={Meal}  />
                <Stack.Screen name  ="Store" component={Store} />
                <Stack.Screen name  ="Donate1" component={Donate1} />
                <Stack.Screen name  ="Donate2" component={Donate2} />
                <Stack.Screen name  ="Donate3" component={Donate3} />
                <Stack.Screen name  ="Take1" component={Take1} />
                <Stack.Screen name  ="Take2" component={Take2} />
                <Stack.Screen name  ="Take3" component={Take3} />
                <Stack.Screen name  ="GoogleMap" component={GoogleMap} />
                <Stack.Screen name  ="Me" component={Me} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;