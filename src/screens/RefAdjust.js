import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
        time: time,
        address: address,
        phone: phone,
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={time}
          placeholder="開放領取持間"
          onChangeText={text => settime(text)}
        />
        <TextInput
          style={styles.input}
          value={address}
          placeholder="地址"
          onChangeText={text => setaddress(text)}
        />
        <TextInput
          style={styles.input}
          value={phone}
          placeholder="電話"
          onChangeText={text => setphone(text)}
        />
        <TextInput
          style={styles.input}
          value={milk}
          placeholder="牛奶數量"
          onChangeText={text => setmilk(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={cookies}
          placeholder="餅乾數量"
          onChangeText={text => setcookies(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={friut}
          placeholder="水果數量"
          onChangeText={text => setfriut(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={bread}
          placeholder="麵包數量"
          onChangeText={text => setbread(text)}
          secureTextEntry={true}
        />
        
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>修改</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}></View>
      </View>
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