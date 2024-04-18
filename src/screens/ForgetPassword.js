import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegesterScreen from './RegesterScreen';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
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




const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const handleResetPassword = async () => {
    try {
      // 發送密碼重設郵件
      await sendPasswordResetEmail(auth, email);
      // 如果登入成功，繼續從 Firestore 中獲取更多使用者資訊
      const usersCollection = collection(db, 'user');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        Alert.alert('成功', '密碼重設郵件已發送至您的信箱，請檢查。');
        navigation.navigate('Login');
      } else {
        Alert.alert('請檢查輸入的email是否正確。');
      }
      // 顯示成功訊息

    } catch (error) {
      // 顯示錯誤訊息
      Alert.alert('錯誤', '重設密碼時發生錯誤：' + error.message);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>請輸入email以重設密碼</Text>

      <View style={styles.wrapper}>
        <Text style={{ fontSize: 40 }}></Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="輸入帳號"
          onChangeText={Text => setEmail(Text)}
        />
      </View>
      <TouchableOpacity onPress={handleResetPassword} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>確認</Text>
      </TouchableOpacity>

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
  topBlock: {
    height: 50, // 设置横色块的高度
    backgroundColor: '#E6A984'
  }, // 自定义颜色
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    height: 60,
  },
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

export default ForgetPassword;