import React from "react";
import { Text, View, Image } from 'react-native';
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
import FjuRef from "../screens/FjuRef";
import Map from "../screens/Map";
import Favorite from "../screens/Favorite";
import Record from "../screens/Record";
import EditProfile from "../screens/EditProfile";
import Shop from "../screens/Shop";
import TakePeople from "../screens/TakePeople";
import DonatePeople from "../screens/DonatePeople";
import ShopImf from "../screens/ShopImf";
import LoginSuccess from "../screens/LoginSuccess";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            
            <Stack.Screen name="Regester" component={RegesterScreen} />
            <Stack.Screen name="Regester2" component={RegesterScreen2} />
            <Stack.Screen name="RegesterChoose" component={RegesterChoose} />
            <Stack.Screen name="Ref" component={Ref} />
            <Stack.Screen name="RefTodayFood" component={RefTodayFood} />
            <Stack.Screen name="Meal" component={Meal} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="Donate1" component={Donate1} />
            <Stack.Screen name="Donate2" component={Donate2} />
            <Stack.Screen name="Donate3" component={Donate3} />
            <Stack.Screen name="Take1" component={Take1} />
            <Stack.Screen name="Take2" component={Take2} />
            <Stack.Screen name="Take3" component={Take3} />
            <Stack.Screen name="GoogleMap" component={GoogleMap} />

            <Stack.Screen name="FjuRef" component={FjuRef} />
            
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="Record" component={Record} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="TakePeople" component={TakePeople} />
            <Stack.Screen name="DonatePeople" component={DonatePeople} />
            <Stack.Screen name="ShopImf" component={ShopImf} />
            <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
        </Stack.Navigator>
    );
};


//下方的導覽列
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: 'white' },
            tabBarShowLabel: false, //下方導覽列名稱隱藏
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('map/asset/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? 'black' : '#5A545E', // 設置默認顏色
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#E6A984' : 'E6A984', fontSize: 12 }}>
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('map/asset/map.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? 'black' : '#5A545E', // 設置默認顏色
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#E6A984' : 'E6A984', fontSize: 12 }}>
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Me"
                component={Me}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('map/asset/user.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? 'black' : '#5A545E', // 設置默認顏色
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#E6A984' : 'E6A984', fontSize: 12 }}>
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const Navigation = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};


export default Navigation;