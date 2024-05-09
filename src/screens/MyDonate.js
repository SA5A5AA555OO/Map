import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image, ScrollView} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState ,useEffect} from "react";
import { Alert } from 'react-native'
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


const MyDonate = ({navigation}) =>{
  const route = useRoute();
const { email } = route.params || { email: '' };
  const [selected, setSelected] = useState('notReceived');
  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 確認 email 不為空才執行
    email && fetchUserData();
  }, [email]); // 當 email 發生變化時重新執行效果

  const fetchUserData = async () => {
    try {
      const usersCollection = collection(db, "donate");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDataList = querySnapshot.docs.map((doc) => doc.data());
        setUserData(userDataList);
      } else {
        console.log("找不到符合條件的使用者");
      }
    } catch (error) {
      console.error("獲取使用者資料時發生錯誤：", error);
    }
  };
  const handlePress = (option) => {
    setSelected(option);
  };
  const renderContent = () => {
    if (selected === 'notReceived' && userData) {
      return userData
        .filter((data) => !data.pay) 
        .map((data, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
              <View>
                <Text style={styles.leftText}>{data.storeName}</Text>
                <Text style={styles.detail}>捐贈數量:{data.count}</Text>
                <Text style={styles.detail}>{data.dateTime}</Text>
              </View>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>付款</Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>
          </View>
        ));
    } else if (selected === 'received' && userData) {
      return userData
        .filter((data) => data.pay) 
        .map((data, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
              <View>
                <Text style={styles.leftText}>{data.storeName}</Text>
                <Text style={styles.detail}>捐贈數量:{data.count}</Text>
                <Text style={styles.detail}>{data.dateTime}</Text>
              </View>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>回饋</Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>
          </View>
        ));
    }
  };
  
      return (
        
        <View style={styles.container}>
          <ScrollView>
          <Image
                style={styles.logo1}
                source={require("map/asset/背景.jpg")}
              />
              <Text style={styles.imageText}>捐贈資訊</Text>
        <View style={styles.row1}>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'notReceived' ? styles.selected : null,
            ]}
            onPress={() => handlePress('notReceived')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>尚未付款</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'received' ? styles.selected : null,
            ]}
            onPress={() => handlePress('received')}
            activeOpacity={0.5} 
          >
            <Text style={styles.text}>已付款</Text>
          </TouchableOpacity>
        </View>
           
        <View style={styles.contentContainer}>{renderContent()}</View>
        </ScrollView>
      </View>
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FDFBF1',
      
    },
    textContainer: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      
      
    },
    logo1: {
      width: 400,
      height: 250,
      borderRadius: 50,
      top: -70
    
    },
    imageText: {
      position: 'absolute',
      top: 120, 
      left: 20, 
      fontSize: 35,
      color: 'white',
    },
    headerText: {
        fontSize: 40,
      },
      
    logo: {
        width: 63,
        height: 63,
        borderRadius: 100,
        
      },
      row1:{
        top:-30,
         flexDirection: 'row',
       },
      row:{
       
        flexDirection: 'row',
      },
      line: {
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        borderBottomStyle: 'solid',
        width: 350,
       alignSelf: 'center',
      },
    leftText :{
        fontSize: 25,
        paddingLeft:15,
    },

    detail:{
        fontSize: 20,
        paddingLeft:15,
    },
   text:{
    fontSize:20,
   },
    selected: {
      backgroundColor: '#FBE8CD', // 更改此處以設置所選項目的顏色
    },
    

    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 15,
      borderRadius: 30, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'20%',
      marginLeft: 'auto',
      height:50
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default MyDonate;