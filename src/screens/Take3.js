import React, { useState ,useEffect} from "react";
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { initializeApp } from 'firebase/app';
import { useRoute } from '@react-navigation/native';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
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
const Take3 = ({navigation}) =>{
  const route = useRoute();
  const { storeName,name,phone,email } = route.params;
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 9000) + 1000);
  useEffect(() => {
    const uploadData = async () => {
      try {
        const docRef = await addDoc(collection(db, "pickup"), {
          storeName: storeName,
          name: name,
          phone: phone,
          email: email,
          randomNumber: randomNumber
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    uploadData();
  }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{ storeName }</Text>
            <Text ></Text>
            <Image
              style={styles.logo1}
               source={require('map/asset/step3.jpg')}/>
            <TouchableOpacity  style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>領取編號 {randomNumber}</Text>
                </TouchableOpacity>
           <TouchableOpacity onPress={() =>navigation.navigate('Home')}>
                        <Text style={styles.link}>回主頁</Text>
                    </TouchableOpacity>
                    
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 30,
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20
    },
    link:{
        color:'#DA7746',
        fontSize:25
    },

    

    
    buttonContainer: {
      backgroundColor: '#FCF3EC', // 自定义背景颜色
      padding: 60,
      borderRadius: 35, // 圆角效果
      marginVertical: 70, // 设置垂直间距
      width:'80%',
      elevation: 20,
     
    },
    buttonText: {
      color: 'gray', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:30
      
    },
    logo1: {
      width: 350,
      height: 60,
    },
  });
  
export default Take3;