import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState ,useEffect} from "react";
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, query, where, getDocs, updateDoc} from 'firebase/firestore/lite';
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


const TakePeople = ({navigation}) =>{
  const route = useRoute();
  const { username } = route.params || { username: '用戶' };
  const [pickupData, setPickupData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const pickupsCollection = collection(db, 'pickup');
      const q = query(pickupsCollection, where('storeName', '==', username),where('take', '==', false));
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
  const handlePickup = async (randomNumber) => {
    try {
      const pickupsCollection = collection(db, 'pickup');
      const q = query(pickupsCollection, where('randomNumber', '==', randomNumber));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (snapshot) => {
        const docRef = doc(db, 'pickup', snapshot.id);
        await updateDoc(docRef, { take: true });
        console.log('Updated taken to true');
        fetchUserData(); 
      });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  
  



  
      return (
        <View style={styles.container}>
        <Text style={styles.headerText}>{username}領取名單</Text>
        <Text></Text>
      
        {pickupData.map((item, index) => (
          <View key={index}>
            <ScrollView>
              <View style={styles.row}>
                <Image
                  style={styles.logo}
                  source={require("map/asset/food.jpg")}
                />
                <View>
                  <Text style={styles.leftText}>姓名:{item.name}</Text>
                  <Text style={styles.detail}>領取號碼:{item.randomNumber}</Text>
                  <Text style={styles.detail}>電話:{item.phone}</Text>
                  <Text style={styles.detail}>抵達時間:{item.pickupTime}</Text>
                </View>
                <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handlePickup(item.randomNumber)} 
            >
              <Text style={styles.buttonText}>完成</Text>
            </TouchableOpacity>
              </View>
              <Text></Text>
              <View style={styles.line} />
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
    backgroundColor:'#FDFBF1',
    paddingTop:20,
    
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  headerText: {
    textAlign: 'center',
      fontSize: 40,
    },
    
  logo: {
      width: 86,
      height: 86,
      borderRadius: 100,
      
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
    backgroundColor: '#FBE8CD', 
  },
  

  
  buttonContainer: {
    backgroundColor: '#E6A984', 
    padding: 20,
    borderRadius: 30, 
    marginVertical: 10, 
    width:'18%',
    marginLeft: 'auto',
    marginRight:10,
    height:65
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center', 
    
  },
});
  
export default TakePeople;