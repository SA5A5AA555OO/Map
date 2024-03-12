import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import Store from '../screens/Store';
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



const Meal = ({navigation}) =>{
  const [userData, setUserData] = useState(null);
    
  
    const getData = async (db) => {
      const userCollection = collection(db, "store");
      const userDoc = doc(userCollection, "素食的店");
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
    const handleButtonPress = () => {
        navigation.navigate('Store');
      };
      return (
        <View style={styles.container}>
           <ScrollView >
            <View style={styles.row}>
              <TextInput style={styles.input}  placeholder ="輸入店家名稱"/>
                <Text></Text>
                   <Image style={styles.logo2} source={require('map/asset/search.png')}/>
             </View>


           <Image style={styles.logo} source={require('map/asset/素食的店.jpg')}/>
           <TouchableOpacity onPress={handleButtonPress} style={{ alignSelf: 'flex-start' }}>
           <Text style={styles.leftText}>{userData ? userData.store_name : 'Loading...'}</Text>
           </TouchableOpacity>
           <View style={{alignSelf: 'flex-start'}}>
           {userData ? (
          <>
            <Text style={styles.detail}>今日提供份數: {userData.provide}</Text>
            <Text style={styles.detail}>地址: {userData.store_address}</Text>
            <Text style={styles.detail}>電話: {userData.store_phone}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
             <Text style={styles.detail}>請讓給有需要人士領取</Text>
           </View>
        <Text></Text>


        <Image style={styles.logo} source={require('map/asset/歐姆先生.jpg')} />
        <TouchableOpacity onPress={handleButtonPress} style={{alignSelf: 'flex-start'}}>
        <Text style={styles.leftText}>歐姆先生</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.detail}>今日提供份數:5</Text>
          <Text style={styles.detail}>地址:新北市新莊區中華路二段18號</Text>
          <Text style={styles.detail}>電話:0932921110</Text>
          <Text style={styles.detail}>請讓給有需要人士領取</Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        
      </ScrollView>
    </View>
  );

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20
      
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 350,
        height: 200,
        borderRadius: 30,
      },
    leftText :{
        fontSize: 30,
        left:10,
        color:'#DA7746',
    },
    detail:{
        fontSize: 18,
        left:10
    },
    logo2: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginBottom: 20,
      
    },
    row:{
      flexDirection: 'row',
      paddingLeft:70
    },
    input:{
      marginBottom:12,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:15,
      paddingHorizontal:14,
      backgroundColor: 'white',
      height: 45,
      width:'70%',
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
  
export default Meal;