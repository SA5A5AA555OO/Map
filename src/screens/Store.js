import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase/app'; 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from "react";
import {  collection, doc, query, where, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import Donate2 from '../screens/Donate2';
import Take1 from '../screens/Take1';

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

// 获取文档的引用await getDocs(query(collection(db, 'user'), where('email', '==', email)));
const Store = ({ navigation }) => {
  const handleButtonPress = (storeName) => {
    navigation.navigate('Donate2', { storeName: storeName,status:status,email:email });
  };
  const handleButtonPress2 = (storeName) => {
    navigation.navigate('Take1', { storeName: storeName,status:status,email:email });
  };
  const handleButtonPress3 = async (email,storeName) => {
    const querySnapshot = await getDocs(query(collection(db, 'user'), where('email', '==', email)));
    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      try {
        const userData = querySnapshot.docs[0].data();
        let favoriteStores = userData.favorite || [];
        if (!favoriteStores.includes(storeName)) {
          favoriteStores.push(storeName);
          await updateDoc(userDocRef, { favorite: favoriteStores });
          Alert.alert('成功加入最愛');
          setFav(1);
          // navigation.navigate('Home', { status });
          console.log("fav:"+fav)
        } else {
          favoriteStores = favoriteStores.filter(item => item !== storeName);
          await updateDoc(userDocRef, { favorite: favoriteStores });
          setFav('');
          Alert.alert('成功移除最愛');
          // navigation.navigate('Home', { status });
          console.log("fav:"+fav)
        }
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      console.error('No documents found for query');
    }
  };


const route = useRoute();
  const { status, email } = route.params;
  const { fav: routeFav } = route.params || { fav: '' }; // 從路由參數中獲取 email
  const { storeName } = route.params;
  const [buttons, setButtons] = useState([]);
  const [fav, setFav] =useState(routeFav);
  const [userData, setUserData] = useState(null);

  
  const getData = async (db) => {
    const userCollection = collection(db, "store");
    const q = query(userCollection, where("store_name", "==", storeName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } else {
      console.log("Document not found");
    }
  };
  useEffect(() => {
    // console.log(`(store)51 useEffect  status:${status}   email:${email}`)
    // 根據使用者的 status 狀態動態設置按鈕
    switch (status) {
      case "1":
        setButtons([
          { text: '捐贈待用餐', onPress: () => handleButtonPress(storeName,status) },
          { text: '領取待用餐', onPress: () => handleButtonPress2(storeName,status) },
          { text: fav ? '移除最愛' : '加入最愛', onPress: () => handleButtonPress3(email, storeName) }
        ]);
        break;
      case "2":
        break;
      case "3":
        break;
      default:
        setButtons([]);
        break;
    }
  }, [status,fav]);

  useEffect(() => {
    getData(db); // 將 db 傳遞給 getData 函數
    // console.log(`(store)73 useEffect  status:${status}   email:${email}`)
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{route.params.storeName}</Text>
      <View style={styles.line} />
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={styles.detail}>營業時間:{userData ? userData.opentime : 'Loading...'}</Text>
        <Text style={styles.detail}>地址:{userData ? userData.store_address : 'Loading...'}</Text>
        <Text style={styles.detail}>電話:{userData ? userData.store_phone : 'Loading...'}</Text>
      </View>
      <Image
        style={styles.pic}
        source={require('map/asset/map.jpg')} />
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{button.text}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity onPress={() => handleButtonPress(storeName)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>捐贈待用餐</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress2(storeName)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>領取待用餐</Text>
                </TouchableOpacity>
               <TouchableOpacity  style={styles.buttonContainer}>
                 <Text style={styles.buttonText}>加入最愛</Text>
               </TouchableOpacity> */}



    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',

  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  pic: {
    width: 350,
    height: 350,
    borderRadius: 10,

  },
  leftText: {
    fontSize: 30,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 20
  },
  line: {
    borderBottomWidth: 1, // 线的宽度
    borderBottomColor: 'black',
    width: 350,
    alignSelf: 'center',
  },


  buttonContainer: {
    backgroundColor: '#E6A984',
    padding: 20,
    borderRadius: 30, // 圆角效果
    marginVertical: 5, // 设置垂直间距
    width: '80%'
  },
  buttonText: {
    color: 'white', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 15,
  },
});

export default Store;