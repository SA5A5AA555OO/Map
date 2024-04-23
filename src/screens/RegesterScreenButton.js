import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegesterScreen from './RegesterScreen';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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




const RegesterScreenButton = ({ navigation }) => {
  const route = useRoute();
  const { email, password, phone, name } = route.params;
  const handleRegisterButton = async () => {
  try {
    // 使用 Firebase 的身份驗證進行登入
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user: "+user.emailVerified);
    if (user.emailVerified) {
      // 將用戶資料儲存到 Firestore 中
      await addDoc(collection(db, 'user'), {
        username: name,
        phone: phone,
        email: email,
        password: password,
        status: "1",
        favorite:"",
      });
      Alert.alert('驗證成功')
      navigation.navigate('Login');
    }
    else{Alert.alert('未驗證成功');}

    
  } catch (error) {
    // 顯示註冊失敗的錯誤訊息
    Alert.alert('註冊失敗', error.message);
  }
};

return (

  <View style={styles.container}>
    {/* <Text style={{ fontSize: 40 }}>{email}</Text>
    <Text style={{ fontSize: 40 }}>{password}</Text>
    <Text style={{ fontSize: 40 }}>{phone}</Text> */}
    <Text style={{ fontSize: 40 }}>您好，{name}</Text>
    <Text style={{ fontSize: 25 }}>EMAIL驗證成功後請點選按鈕</Text>
    <View style={styles.topBlock}></View>
    <TouchableOpacity onPress={handleRegisterButton} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>點此確認</Text>
    </TouchableOpacity>
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDFBF1'
  },
  topBlock: {
    height: 50, // 设置横色块的高度
    backgroundColor: '#E6A984'
  }, // 自定义颜色
  buttonContainer: {
    backgroundColor: '#E6A984', // 自定义背景颜色
    padding: 20,
    borderRadius: 20, // 圆角效果
    marginVertical: 10, // 设置垂直间距
    width: '80%'
  },
  buttonText: {
    color: 'white', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中

  },
});

export default RegesterScreenButton;