import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState ,useEffect} from "react";
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




const Shop = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('TakePeople',{ username: userData ? userData.username : '用戶' });
      };
      const handleButtonPress2 = () => {
        navigation.navigate('DonatePeople',{ username: userData ? userData.username : '用戶' });
      };
      const handleButtonPress3 = () => {
        navigation.navigate('ShopImf',{ username: userData ? userData.username : '用戶',status:status });
      };
      const [userData, setUserData] = useState(null);
      const route = useRoute();
      const { email,status } = route.params || { email: '' };
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
      return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看領取名單</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2}style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看捐贈數量</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress3} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>修改店家資訊</Text>
          </TouchableOpacity>
            

           
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#FDFBF1'
    },
    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 20, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:20,
      
    },
    logo: {
      width: 300,
      height: 250,
      borderRadius: 30,
    },
  });
  
export default Shop;