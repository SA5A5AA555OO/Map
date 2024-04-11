import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import React, { useState ,useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import Favorite from './Favorite';
import Record from './Record';
import EditProfile from './EditProfile';
import LoginScreen from './LoginScreen';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword,signOut } from 'firebase/auth';
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
  const { email: routeEmail } = route.params || { email: '' }; // 從路由參數中獲取 email
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 新增一個狀態來追蹤登入狀態
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(routeEmail); // 將路由參數中的 email 存儲在狀態中
  const [status, setStatus] = useState('');

  const auth = getAuth();
  

  useEffect(() => {
    // 判斷是否已經登入
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setEmail(user.email);
        setStatus('已登入');
      } else {
        setIsLoggedIn(false);
        setEmail('');
        setStatus('');
      }
    });
  }, [email, status]); // 添加 email 和 status 作為 useEffect 的依賴

  useEffect(() => {
    // 確認 email 不為空才執行
    email && fetchUserData();
  }, [email]); // 當 email 發生變化時重新執行效果

  const fetchUserData = async () => {
    try {
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

  const handleButtonPress = () => {
    navigation.navigate('Favorite');
  };
  const handleButtonPress2 = () => {
    navigation.navigate('Record', {email});
  };
  const handleButtonPress3 = () => {
    navigation.navigate('EditProfile');
  };
  const handleLogin = () => {
    if (isLoggedIn) {
      // 如果已經登入，執行登出操作
      signOut(auth)
        .then(() => {
          // 登出成功後清除 email 和 status，並將登入狀態設置為 false
          setEmail('000@gmail.com');
          setStatus('0');
          setIsLoggedIn(false);
          navigation.navigate('Home', { email: userData.email, status: status });
          navigation.navigate('Me', { email: userData.email, status: status });
        
        })
        .catch(error => console.error('登出時發生錯誤：', error));
    } else {
      // 如果尚未登入，導航到登入頁面
      navigation.navigate('Login');
    }
  };

  const handleButtonPress5 = () => {
    navigation.navigate('MyDonate', {email});
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
         <Image
           style={styles.logo}
           source={require('map/asset/user.png')}/>
           <Text style={styles.headerText} >您好,{userData ? userData.username : '用戶'}</Text>

      </View>
      
      <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>最愛店家</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2}style={styles.buttonContainer}>
            <Text style={styles.buttonText}>領取資訊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress5} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>捐贈資訊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress3} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>修改個人資料</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{isLoggedIn ? '登出' : '登入'}</Text>
      </TouchableOpacity>
    
    </View>
    
  );
  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20,
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
    leftText :{
        fontSize: 25,
        marginBottom: 10,
    },
    row:{
      paddingLeft:20,
      flexDirection: 'row',
    },
    detail:{
        fontSize: 20,
        left:20
    },
    link:{
        color:'#DA7746',
    },

    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 20, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'80%',
      alignSelf: 'center', 
       
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:20,
      
    },

    
    
  });
  
export default Me;