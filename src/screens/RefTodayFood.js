import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import HomeScreen from '../screens/HomeScreen';
import { Icon } from '@rneui/themed';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';
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


const RefTodayFood = () => {
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
      <Image
                style={styles.logo1}
                source={require("map/asset/背景.jpg")}
              />
       <Text style={styles.imageText}>輔仁大學食享冰箱</Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.detail}>今日開放領取時間:{userData ? userData.start_time : 'Loading...'}</Text>
      </View>
      <Text />
      <Text />
      <View style={{marginBottom: 60}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <Image style={styles.pic} source={require('map/asset/吐司.png')} />
            <View style={styles.square}></View>
            <Text style={styles.detail}>麵包:{userData ? userData.bread_quantity : 'Loading...'}份</Text>
          </View>
          <View style={{marginLeft: 60}}>
            <Image style={styles.pic} source={require('map/asset/牛奶.jpg')} />
            <Text style={styles.detail}>牛奶:{userData ? userData.milk_quantity : 'Loading...'}份</Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 60}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <Image style={styles.pic} source={require('map/asset/餅乾.jpg')} />
            <Text style={styles.detail}>餅乾:{userData ? userData.cookies_quantity  : 'Loading...'}份</Text>
          </View>
          <View style={{marginLeft: 60}}>
            <Image style={styles.pic} source={require('map/asset/水果.jpg')} />
            <Text style={styles.detail}>水果:{userData ? userData.friut_quantity  : 'Loading...'}份</Text>
          </View>
        </View>
      </View>
</View>    
      );
};


            
             
        
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20,
    },
    imageText: {
      position: 'absolute',
      top: 130, 
      left: 20, 
      fontSize: 35,
      color: 'white',
    },
    logo1: {
      width: 400,
      height: 250,
      borderRadius: 50,
      top: -70
    },
    
    pic: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor:'white',
        top:-60
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20,
        top:-60
    },

  });
  
export default RefTodayFood;