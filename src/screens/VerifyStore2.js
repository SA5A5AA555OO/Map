import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState, useEffect } from "react";
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, query, where, getDocs, updateDoc,addDoc } from 'firebase/firestore/lite';
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


const TakePeople = ({ navigation }) => {
  const route = useRoute();
  const { email,status } = route.params
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const pickupsCollection = collection(db, 'user');
      const q = query(pickupsCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setUserData(data);
    } catch (error) {
      console.error('查詢資料時發生錯誤：', error);
    }
  };

  const handleVerify = async (email) => {
    try {
      const pickupsCollection = collection(db, 'user');
      const q = query(pickupsCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (snapshot) => {
        const docRef = doc(db, 'user', snapshot.id);
        await updateDoc(docRef, { status: "3" });
        console.log('Updated taken to true');
        fetchUserData(); 
        Alert.alert("審核通過!")
        
        const userData = snapshot.data();
        await addDoc(collection(db, 'store'), {
          store_name: userData.username,
          store_phone: userData.phone,
          store_address: userData.address,
          store_email: userData.email,
          good_name: userData.good_name,
          good_price: userData.good_price,
          opentime: userData.opentime,
          closetime: userData.closetime,
          provide:"0",
          
      });
      navigation.navigate('Me',{status:status});
    });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };







  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>審核店家</Text>
      <Text></Text>

      {userData.map((item, index) => (
        <View key={index}>
           <View style={styles.line} />
           <Text></Text>
          <ScrollView>
            <View style={styles.row}>
              <View>
                <Text style={styles.leftText}>姓名:{item.username}</Text>
                <Text style={styles.detail}>帳號:{item.email}</Text>
                <Text style={styles.detail}>電話:{item.phone}</Text>
                <Text style={styles.detail}>地址:{item.address}</Text>
                <Text style={styles.detail}>待用餐點名稱:{item.good_name}</Text>
                <Text style={styles.detail}>待用餐點價錢:{item.good_price}</Text>
                <Text style={styles.detail}>營業時間:{item.opentime}</Text>
                <Text style={styles.detail}>打烊時間:{item.closetime}</Text>
                <View style={{height:20}} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleVerify(item.email)}>
                  <Text style={styles.buttonText}>審核通過</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text></Text>
            
            <Text></Text>
          </ScrollView>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF1',
    paddingTop: 20,

  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',


  },
  headerText: {
    alignItems: 'center',
    fontSize: 40,
    textAlign: 'center',
  },

  logo: {
    width: 63,
    height: 63,
    borderRadius: 100,

  },
  row: {

    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    width: 350,
    alignSelf: 'center',
  },
  leftText: {
    fontSize: 25,
    paddingLeft: 22,
  },

  detail: {
    fontSize: 20,
    paddingLeft: 22,
  },
  text: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#FBE8CD',
  },



  buttonContainer: {
    backgroundColor: '#E6A984',
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
    width: '18%',
    marginLeft: 'auto',
    marginRight: 10,
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginLeft: 95,
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 17,
    borderRadius: 20,
    width: 200,
  },
});

export default TakePeople;