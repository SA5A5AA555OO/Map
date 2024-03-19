import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import LoginScreen from '../screens/LoginScreen';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from "@react-native-firebase/firestore";
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

const RegesterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const handleRegister = async () => {
        try {
            // 使用 Firebase 身份驗證進行註冊
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 將用戶資料儲存到 Firestore 中
            await addDoc(collection(db, 'user'), {
                username: name,
                phone: phone,
                email: email,
                password: password,
                status: "1",
            });

            // 顯示註冊成功提示訊息
            Alert.alert('註冊成功', '歡迎加入！');

            // 導航到首頁或其他畫面
            navigation.navigate('Home');
        } catch (error) {
            // 顯示註冊失敗的錯誤訊息
            Alert.alert('註冊失敗', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="姓名"
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    value={phone}
                    placeholder="電話"
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="信箱"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="密碼"
                    onChangeText={setPassword}
                    secureTextEntry={true}
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

export default RegesterScreen;