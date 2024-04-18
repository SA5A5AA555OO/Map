import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState ,useEffect} from "react";
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore/lite';
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


const DonatePeople = ({navigation}) =>{
  const route = useRoute();
  const { username } = route.params || { username: '用戶' };
  const [pickupData, setPickupData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const pickupsCollection = collection(db, 'donate');
      const q = query(pickupsCollection, where('storeName', '==', username));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setPickupData(data);
    } catch (error) {
      console.error('查詢資料時發生錯誤：', error);
    }
  };
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>{username}</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>姓名</DataTable.Title>
            <DataTable.Title>電話</DataTable.Title>
            <DataTable.Title>捐贈數量</DataTable.Title>
          </DataTable.Header>
  
          {pickupData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.phone}</DataTable.Cell>
              <DataTable.Cell>{item.count}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#FDFBF1',
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        
      },
    leftText :{
        fontSize: 25,
        left:20,
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
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default DonatePeople;