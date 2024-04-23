import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, doc, getDoc, where,query, updateDoc } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import React, { useState, useEffect, } from 'react';

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



const RefAdjust = ({ navigation }) => {
  const route = useRoute();
  const { status } = route.params || { status: 0 };
  const [userData, setUserData] = useState(null);
  const [time, settime] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState('');
  const [milk, setmilk] = useState('');
  const [cookies, setcookies] = useState('');
  const [friut, setfriut] = useState('');
  const [bread, setbread] = useState('');
  const handleButtonPress = async () => {
    const storeDocRef = doc(db, 'fridges', 'jtJgYOmcTgBJAfbhR5WD'); 
    try {
      await updateDoc(storeDocRef, {
        start_time: time,
        fridge_address: address,
        fridge_phone: phone,
        milk_quantity: milk,
        cookies_quantity: cookies,
        friut_quantity: friut,
        bread_quantity: bread
      });
      showAlert(); // 顯示修改成功的提示
      navigation.navigate('Home', { status });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const showAlert = () => {
    Alert.alert('修改成功');
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserData();
}, []);

const fetchUserData = async () => {
  try {
    const userQuery = doc(db, 'fridges', 'jtJgYOmcTgBJAfbhR5WD');
    const userDocSnap = await getDoc(userQuery);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      settime(userData.start_time); // 更新開放領取持間
      setaddress(userData.fridge_address); // 更新地址
      setphone(userData.fridge_phone); // 更新電話
      setmilk(userData.milk_quantity); // 更新牛奶數量
      setcookies(userData.cookies_quantity); // 更新餅乾數量
      setfriut(userData.friut_quantity); // 更新水果數量
      setbread(userData.bread_quantity); // 更新麵包數量
    } else {
      console.log('找不到符合條件的使用者');
    }
  } catch (error) {
    console.error('獲取使用者資料時發生錯誤：', error);
  }
};


  return (
    <View style={styles.container}>
      
      <View style={styles.wrapper}><ScrollView>
        <Text></Text>
        <Text>開放領取時間</Text>
        <TextInput
          style={styles.input}
          value={time}
          placeholder="開放領取持間"
          onChangeText={text => settime(text)}
        />
        <Text>地址</Text>
        <TextInput
          style={styles.input}
          value={address}
          placeholder="地址"
          onChangeText={text => setaddress(text)}
        />
        <Text>電話</Text>
        <TextInput
          style={styles.input}
          value={phone}
          placeholder="電話"
          onChangeText={text => setphone(text)}
        />
        <Text>牛奶數量</Text>
        <TextInput
          style={styles.input}
          value={milk}
          placeholder="牛奶數量"
          onChangeText={text => setmilk(text)}
          
        />
        <Text>餅乾數量</Text>
        <TextInput
          style={styles.input}
          value={cookies}
          placeholder="餅乾數量"
          onChangeText={text => setcookies(text)}
          s
        />
        <Text>水果數量</Text>
        <TextInput
          style={styles.input}
          value={friut}
          placeholder="水果數量"
          onChangeText={text => setfriut(text)}
          
        />
        <Text>麵包數量</Text>
        <TextInput
          style={styles.input}
          value={bread}
          placeholder="麵包數量"
          onChangeText={text => setbread(text)}
      
        />
        
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>修改</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}></View>
      </ScrollView></View>
    </View>
  );
};
const styles =StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  backgroundColor:'#FDFBF1',
  justifyContent:'center',},
  wrapper:{
      width:'80%',
      
  },
  button: {
      backgroundColor: '#E6A984', // 自定义按钮颜色
      padding: 20,
      borderRadius: 20,
    },
    buttonText: {
      color: 'white', // 按钮文本颜色
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
    },

  input:{
      marginBottom:20,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:20,
      paddingHorizontal:14,
      backgroundColor: 'white',
      height:60,
  },
  link:{
      color:'#DA7746',
  }
  
});

export default RefAdjust;