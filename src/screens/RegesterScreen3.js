import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreenButton from '../screens/RegesterScreenButton'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { firebase } from "@react-native-firebase/firestore";
import { cleanSingle } from 'react-native-image-crop-picker';
const firebaseConfig = {
    apiKey: "AIzaSyBARwrOhviGWEHN94EDPR0Ojy-YftRlljA",
    authDomain: "sa5a5aa555oo.firebaseapp.com",
    databaseURL: "https://sa5a5aa555oo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sa5a5aa555oo",
    storageBucket: "sa5a5aa555oo.appspot.com",
    messagingSenderId: "602378113582",
    appId: "1:602378113582:web:c6b308cc039586506ec5bf",
    measurementId: "G-NS22NW5C8F"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 使用 getAuth 獲取 Firebase 身份驗證物件

const RegesterScreen2 = ({ navigation }) => {
    const route = useRoute();
    const { email, password, phone, name, address } = route.params;
    const [good_name, setGood_name] = useState('');
    const [good_price, setGood_price] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [opentime, setOpentime] = useState('');
    const [closetime, setClosetime] = useState('');
    const handleRegister = async () => {
        try {
            // 顯示註冊成功提示訊息
            Alert.alert('註冊成功', '請檢查您的電子郵件收件箱以完成驗證。');
            navigation.navigate('RegesterButton2', { good_name, good_price, latitude, longitude, opentime, closetime,email, password, phone, name, address });
        } catch (error) {
            // 顯示註冊失敗的錯誤訊息
            Alert.alert('註冊失敗', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Image style={styles.logo1} source={require('map/asset/register2.jpg')} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={good_name}
                    placeholder="待用餐點名稱"
                    onChangeText={setGood_name}
                />
                <TextInput
                    style={styles.input}
                    value={good_price}
                    placeholder="待用餐點價錢"
                    onChangeText={setGood_price}
                />
                <TextInput
                    style={styles.input}
                    value={opentime}
                    placeholder="營業時間"
                    onChangeText={setOpentime}
                />
                <TextInput
                    style={styles.input}
                    value={closetime}
                    placeholder="打烊時間"
                    onChangeText={setClosetime}
                />
                <TextInput
                    style={styles.input}
                    value={latitude}
                    placeholder="經度(請至googlemap尋找準確經緯度)"
                    onChangeText={setLatitude}
                />
                <TextInput
                    style={styles.input}
                    value={longitude}
                    placeholder="緯度(請至googlemap尋找準確經緯度)"
                    onChangeText={setLongitude}
                />
                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>註冊</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FDFBF1',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',

    },
    logo1: {
        width: 300,
        height: 70,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E6A984', // 自定义按钮颜色
        padding: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white', // 按钮文本颜色
        fontWeight: 'bold',
        textAlign: 'center',
    },

    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 20,
        paddingHorizontal: 14,
        backgroundColor: 'white',
        height: 60,
    },
    link: {
        color: '#DA7746',
    }

});

export default RegesterScreen2;