import React, { useState ,useEffect} from "react";
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import RegesterScreen from '../screens/RegesterScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginSuccess from '../screens/LoginSuccess';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const LoginScreen = ({navigation}) =>{
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    const auth = getAuth(app); // 使用 getAuth 獲取 Firebase 身份驗證物件

    const handleButtonPress = async () => {
    try {
      // 使用 Firebase 的身份驗證進行登入
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // console.log("loginscreen email: "+email);
      // 如果登入成功，繼續從 Firestore 中獲取更多使用者資訊
      const usersCollection = collection(db, 'user');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userStatus = userData.status;


        // 根據 userStatus 判斷使用者身份
        if (userStatus == 1) {
          console.log('一般使用者登入');
          // 在這裡可以執行一般使用者登入後的相應操作
        } else if (userStatus == 2) {
          console.log('冰箱管理員登入');
          // 在這裡可以執行管理員登入後的相應操作
        } else if (userStatus == 3) {
          console.log('待用餐店家登入');
        
        } else if (userStatus == 4){
          console.log('管理者登入');

        }else {
          console.log('未知使用者身份');
        }

        // 導航到登入成功的畫面或其他畫面
        navigation.navigate('LoginSuccess', { email,status: userStatus });
        console.log(userStatus)
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.log('登入失敗', error.message);
      Alert.alert("登入失敗,帳號或密碼錯誤");
    }
  };


    return (
        <View style={styles.container}>
            
            <Text style={{ fontSize: 40 }}>您好</Text>
            <View style={styles.wrapper}>
                <Text style={{ fontSize: 40 }}></Text>
                <TextInput
                style={styles.input} 
                value={email}
                placeholder ="輸入帳號"
                onChangeText={Text =>setEmail(Text)}
                />
                <TextInput 
                style={styles.input} 
                value={password}
                placeholder ="輸入密碼" 
                onChangeText={Text =>setPassword(Text)}
                secureTextEntry={true}
                />
                <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                  <Text style={styles.buttonText}>登入</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row', marginTop:20}}>
                
                    <Text style={styles.link1}>沒有帳號? </Text>
                    <TouchableOpacity onPress={() =>navigation.navigate('RegesterChoose')}>
                        <Text style={styles.link}>註冊</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles =StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#FDFBF1',
    justifyContent:'center',},
    wrapper:{
        width:'80%',
        
    },
    button: {
        backgroundColor: '#E6A984', // 自定义按钮颜色
        padding: 17,
        borderRadius: 20,
      },
      buttonText: {
        color: 'white', // 按钮文本颜色
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:20,
    },

    input:{
        marginBottom:12,
        borderWidth:1,
        borderColor:'#bbb',
        borderRadius:20,
        paddingHorizontal:14,
        backgroundColor: 'white',
        height: 60,
    },
    link:{
        color:'#DA7746',
        fontSize:20,
    },
    link1:{
        fontSize:20,
    }
    
});

export default LoginScreen;