import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Picker from '@react-native-picker/picker';
import Take3 from '../screens/Donate3';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore/lite';
import { useRoute } from '@react-navigation/native';
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


const Take2 = ({ navigation }) => {
  const route = useRoute();
  const { storeName, status, email } = route.params;
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const handleButtonPress = () => {

    navigation.navigate('Take3', { storeName: storeName, name: name, phone: phone, email: email, status: status, pickupTime: pickupTime });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const usersCollection = collection(db, 'user');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
        setName(userData.username); // 將userData的username設置為name的初始值
        setPhone(userData.phone);   // 將userData的phone設置為phone的初始值
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('獲取使用者資料時發生錯誤：', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={styles.headerText}>{storeName}</Text>
      <Text ></Text>
      <Image
        style={styles.logo1}
        source={require('map/asset/step2.jpg')} />
      <Text></Text>
      <Text ></Text>
      <Text ></Text>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder={name}
          value={name}
          onChangeText={setName} />
        <TextInput
          style={styles.input}
          placeholder={phone}
          value={phone}
          onChangeText={setPhone} />
        <TextInput
          style={styles.input}
          placeholder={email}
          value={email}
        />
        <Picker
          selectedValue={pickupTime}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setPickupTime(itemValue)}
          
        >
          <Picker.Item label="13:00" value="13:00" />
          <Picker.Item label="14:00" value="14:00" />
          <Picker.Item label="15:00" value="15:00" />
          
        </Picker>


        <Text ></Text>
        <Text ></Text>

        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>取得領取編號</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}></View>





      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFBF1',
  },
  wrapper: {
    width: '80%',

  },
  leftText: {
    fontSize: 30,
    left: 20,
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: 40,
  },
  detail: {
    fontSize: 20,
    left: 20,


  },
  button: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    paddingVertical: 20,        // 垂直方向的內邊距
    paddingHorizontal: 40,      // 水平方向的內邊距
    borderRadius: 30,
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  logo1: {
    width: 350,
    height: 60,
  },
  link: {
    color: '#DA7746',
  }

});

export default Take2;