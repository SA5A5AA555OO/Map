import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import Favorite from './Favorite';
import Record from './Record';
import EditProfile from './EditProfile';
import LoginScreen from './LoginScreen';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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



const Me = ({ navigation, route }) => {
  const [buttons, setButtons] = useState([]);
  // console.log("(Me) route: "+ Object.keys(route.params));
  const { email: routeEmail } = route.params || { email: '' }; // 從路由參數中獲取 email
  const { status: routeStatus } = route.params || { status: '' }; // 從路由參數中獲取 email
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 新增一個狀態來追蹤登入狀態
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(routeEmail); // 將路由參數中的 email 存儲在狀態中
  const [status, setStatus] = useState(routeStatus);
  // console.log(`(Me)36 routestatus:${routeStatus}   status:${status}   email:${email}   routeEmail:${routeEmail}`)


  const auth = getAuth();

  useEffect(() => {
    // 根據使用者的 status 狀態動態設置按鈕
    // console.log(`(Me)43 useEffect  routestatus:${routeStatus}   status:${status}   email:${email}   routeEmail:${routeEmail}`)
    fetchUserData();
    switch (status) {
      case "1":
        setButtons([
          { text: '最愛店家', onPress: () => navigation.navigate('Favorite') },
          { text: '領取資訊', onPress: () => navigation.navigate('Record', { email }) },
          { text: '捐贈資訊', onPress: () => navigation.navigate('MyDonate', { email }) },
          { text: '修改個人資料', onPress: () => navigation.navigate('EditProfile') },
          { text: '登出', onPress: () => handleLogout() }
        ]);
        break;
        case "2":
        setButtons([
          { text: '登出', onPress: () => handleLogout() }
        ]);
        break;
        case "3":
        setButtons([
          { text: '登出', onPress: () => handleLogout() }
        ]);
        break;
      default:
        setButtons([
          { text: '登入', onPress: () => navigation.navigate('Login') }
        ]);
        break;
    } 
  }, [status]);

  useEffect(() => {
    // console.log(`(Me)62 useEffect  routestatus:${routeStatus}   status:${status}   email:${email}   routeEmail:${routeEmail}`)
    // 確認 email和status不為空才執行
    if(email != "" || status !="") fetchUserData();
    // 判斷是否已經登入
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setEmail(routeEmail);
        setStatus(routeStatus);
      } else {
        // console.log("(Me) onAuth Logout") 
        setIsLoggedIn(false);
        // setEmail('');
        // setStatus('');
      }
    });
  }, [routeEmail,routeStatus]); // 當 email或status 發生變化時重新執行效果
  

  const fetchUserData = async () => {
    // console.log(`(Me)82 fetchUserData email ${email} status ${status}`)
    try {
      // if (!email || !status) {
        // console.error('fetchUserData 函數收到無效的參數:', email, status);
        // return;
      // }
      const usersCollection = collection(db, 'user');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
      } else { 
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('獲取使用者資料時發生錯誤：', error); 
    }
  };

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        // 登出成功後清除 email 和 status，並將登入狀態設置為 false
        setEmail('000@gmail.com');
        setStatus('0');
        // console.log(`(Me)logout clear data email ${email} status ${status}`)
        setIsLoggedIn(false);
          navigation.navigate('Home', { email: "000@gmail.com", status: "0" });
          navigation.navigate('Me', { email: "000@gmail.com", status: "0" });
      })
      .catch(error => console.error('登出時發生錯誤：', error));
  };


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.logo}
          source={require('map/asset/user.png')} />
        <Text style={styles.headerText} >您好,{userData ? userData.username : '請登入'}</Text>

      </View>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{button.text}</Text>
        </TouchableOpacity>
      ))}

    </View>

  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 35,

  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginBottom: 50,

  },
  leftText: {
    fontSize: 25,
    marginBottom: 10,
  },
  row: {
    paddingLeft: 20,
    flexDirection: 'row',
  },
  detail: {
    fontSize: 20,
    left: 20
  },
  link: {
    color: '#DA7746',
  },

  buttonContainer: {
    backgroundColor: '#E6A984', // 自定义背景颜色
    padding: 20,
    borderRadius: 20, // 圆角效果
    marginVertical: 10, // 设置垂直间距
    width: '80%',
    alignSelf: 'center',

  },
  buttonText: {
    color: 'white', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 20,

  },



});

export default Me; 