import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInpu,Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where,updateDoc, } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import HomeScreen from './HomeScreen';
import { useRoute } from '@react-navigation/native';
import store from './Store';
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



const Notification = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    
  
    const getData = async (db) => {
      const userCollection = collection(db, "fridges");
      const userDoc = doc(userCollection, "jtJgYOmcTgBJAfbhR5WD");
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        console.log("Document not found");
      }
    };
  
    useEffect(() => {
      getData(db); // 將 db 傳遞給 getData 函數
    }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
      <Image
                style={styles.logo1}
                source={require("map/asset/背景.jpg")}
              />
      <Text style={styles.imageText}>食享冰箱更新通知</Text>
      <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
              <View>
                <Text style={styles.leftText}>{userData ? userData.adjustTime : 'Loading...'}</Text>
                <Text style={styles.detail}>麵包:{userData ? userData.bread_quantity : 'Loading...'}份        牛奶:{userData ? userData.milk_quantity : 'Loading...'}份 </Text>
                <Text style={styles.detail}>餅乾:{userData ? userData.cookies_quantity  : 'Loading...'}份      水果{userData ? userData.friut_quantity  : 'Loading...'}份</Text>
              </View>
              
            </View>
        

      </ScrollView>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF1',
    
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',


  },
  buttonWrapper: {
    marginTop: 45, 
  },
  headerText: {
    fontSize: 35,
    alignItems: 'center',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 100,
    top:10

  },
  row: {
    flexDirection: 'row',
    top:-20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    width: 350,
    alignSelf: 'center',
    top:-30
  },
  leftText: {
    fontSize:24,
    paddingLeft: 15,
    color: '#DA7746',
  },
  logo1: {
    width: 400,
    height: 250,
    borderRadius: 50,
    top: -60
  },

  detail: {
    fontSize: 20,
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#FBE8CD', // 更改此處以設置所選項目的顏色
  },



  buttonContainer: {
    backgroundColor: '#E6A984', // 自定义背景颜色
    padding: 15,
    borderRadius: 30, // 圆角效果
    marginVertical: 10, // 设置垂直间距
    width: '20%',
    marginLeft: 'auto',
    
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginLeft: 20,
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 10,
    borderRadius: 20,
    width: 80,
    height: 55,
    top:-30
  },
  imageText: {
    position: 'absolute',
    top: 130, 
    left: 20, 
    fontSize: 32,
    color: 'white',
  },
});

export default Notification;