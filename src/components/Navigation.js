import React from "react";
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegesterScreen from "../screens/RegesterScreen";
import RegesterScreenButton from "../screens/RegesterScreenButton";
import RegesterChoose from "../screens/RegesterChoose";
import RegesterScreen2 from "../screens/RegesterScreen2";
import RegesterScreen3 from "../screens/RegesterScreen3";
import RegesterScreenButton2 from "../screens/RegesterScreenButton2";
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
import MyDonate from "../screens/MyDonate";
import RefAdjust from "../screens/RefAdjust";
import Introduction from "../screens/Introduction";
import Introduction2 from "../screens/Introduction2";
import Test from "../screens/Test";
import Test1 from "../screens/Test1";
import Test2 from "../screens/Test2";
import ForgetPassword from "../screens/ForgetPassword"
import VerifyStore from "../screens/VerifyStore"
import VerifyStore2 from "../screens/VerifyStore2"
import CheckStore from "../screens/CheckStore"
import CheckSUser from "../screens/CheckUser"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
    return (
      <Stack.Navigator> 
        <Stack.Screen name="Tabs" component={TabNavigator}options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FjuRef" component={FjuRef} options={{ headerShown: false }}/>
        <Stack.Screen name="Favorite" component={Favorite}options={{ headerShown: false }} />
        <Stack.Screen name="Record" component={Record} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Shop" component={Shop}options={{ headerShown: false }} />
        <Stack.Screen name="TakePeople" component={TakePeople} options={{ headerShown: false }}/>
        <Stack.Screen name="DonatePeople" component={DonatePeople} options={{ headerShown: false }}/>
        <Stack.Screen name="ShopImf" component={ShopImf} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginSuccess" component={LoginSuccess} options={{ headerShown: false }}/>
        <Stack.Screen name="MyDonate" component={MyDonate} options={{ headerShown: false }}/>
        <Stack.Screen name="RefAdjust" component={RefAdjust} options={{ headerShown: false }}/>
        <Stack.Screen name="Regester" component={RegesterScreen}options={{ headerShown: false }} />
        <Stack.Screen name="RegesterButton" component={RegesterScreenButton} options={{ headerShown: false }}/>
        <Stack.Screen name="RegesterButton2" component={RegesterScreenButton2} options={{ headerShown: false }}/>
        <Stack.Screen name="RegesterChoose" component={RegesterChoose} options={{ headerShown: false }}/>
        <Stack.Screen name="Regester2" component={RegesterScreen2} options={{ headerShown: false }}/>
        <Stack.Screen name="Regester3" component={RegesterScreen3} options={{ headerShown: false }}/>
        <Stack.Screen name="Ref" component={Ref} options={{ headerShown: false }}/>
        <Stack.Screen name="RefTodayFood" component={RefTodayFood} options={{ headerShown: false }}/>
        <Stack.Screen name="Meal" component={Meal} options={{ headerShown: false }}/>
        <Stack.Screen name="Store" component={Store} options={{ headerShown: false }}/>
        <Stack.Screen name="Donate1" component={Donate1} options={{ headerShown: false }}/>
        <Stack.Screen name="Donate2" component={Donate2} options={{ headerShown: false }}/>
        <Stack.Screen name="Donate3" component={Donate3} options={{ headerShown: false }}/>
        <Stack.Screen name="Take1" component={Take1} options={{ headerShown: false }}/>
        <Stack.Screen name="Take2" component={Take2} options={{ headerShown: false }}/>
        <Stack.Screen name="Take3" component={Take3} options={{ headerShown: false }}/>
        <Stack.Screen name="GoogleMap" component={GoogleMap} options={{ headerShown: false }}/>
        <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }}/>
        <Stack.Screen name="Introduction2" component={Introduction2} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="VerifyStore" component={VerifyStore} options={{ headerShown: false }}/>
        <Stack.Screen name="VerifyStore2" component={VerifyStore2} options={{ headerShown: false }}/>
        <Stack.Screen name="CheckStore" component={CheckStore} options={{ headerShown: false }}/>
        <Stack.Screen name="CheckUser" component={CheckSUser} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
        <Stack.Screen name="Test1" component={Test1} options={{ headerShown: false }}/>
        <Stack.Screen name="Test2" component={Test2} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  };
  const LogoTitle = () => {
    return (
        <Image
            source={require('map/asset/headerimage.jpg')}
            style={{ width: 50, height: 50 }}
        />
    );
};

//下方的導覽列
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { 
                position:'absolute',
                backgroundColor: '#FFDCB9', 
                bottom: 20,
                left: 15,
                right: 15,
                elevation: 0,
                borderRadius: 20,
                height: 60,
            },
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