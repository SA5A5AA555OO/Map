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


const DonatePeople = ({navigation}) =>{
  const route = useRoute();
  const { username } = route.params || { username: '用戶' };
  const [pickupData, setPickupData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const pickupsCollection = collection(db, 'donate');
      const q = query(pickupsCollection, where('storeName', '==', username),where('pay', '==', false));
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
  const handlePickup = async (dateTime, count) => {
    try {
      // 找到符合 store_name 為 username 的文檔
      const userQuery = query(collection(db, 'store'), where('store_name', '==', username));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'store', querySnapshot.docs[0].id);
        const userData = querySnapshot.docs[0].data();
        const newProvide = userData.provide + parseInt(count);
        // 更新 provide 欄位
        await updateDoc(docRef, { provide: newProvide });
        console.log('Updated provide');
        
        // 更新 donate 文檔的 pay 欄位
        const pickupsCollection = collection(db, 'donate');
        const q = query(pickupsCollection, where('dateTime', '==', dateTime));
        const querySnapshotDonate = await getDocs(q);
        querySnapshotDonate.forEach(async (snapshot) => {
          const docRefDonate = doc(db, 'donate', snapshot.id);
          await updateDoc(docRefDonate, { pay: true });
          console.log('Updated pay to true');
        });
    
        fetchUserData(); // 更新資料
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
      return (
        <View style={styles.container}>
        <Text style={styles.headerText}>{username}捐贈名單</Text>
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
                  <Text style={styles.detail}>姓名:{item.name}</Text>
                  <Text style={styles.detail}>捐贈數量:{item.count}</Text>
                  <Text style={styles.detail}>電話:{item.phone}</Text>
                  <Text style={styles.detail}>{item.dateTime}</Text>
                </View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                handlePickup(item.dateTime, item.count);
                setForceUpdate(!forceUpdate);
                 }}
>
                <Text style={styles.buttonText}>確認付款</Text>
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
      borderRadius: 100
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
    padding: 10,
    paddingTop:20,
    borderRadius: 30, 
    marginVertical: 10, 
    width:'20%',
    marginLeft: 'auto',
    marginRight:10,
    height:60
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center', 
    
  },
});
  
export default DonatePeople;