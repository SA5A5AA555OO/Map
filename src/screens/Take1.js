import React, { useState ,useEffect} from "react";
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Take2 from '../screens/Take2';
import { getFirestore, collection, doc, getDocs, where,query } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
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
const storage = getStorage(app);
const Take1 = ({navigation}) =>{
  const [userData, setUserData] = useState(null);
  const getData = async (db) => {
    const userCollection = collection(db, "store");
    const q = query(userCollection, where("store_name", "==", storeName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } else {
      console.log("Document not found");
    }
  };
    
      useEffect(() => {
        getData(db); // 將 db 傳遞給 getData 函數
      }, []);
  const route = useRoute();
  const { storeName,status,email } = route.params;
  const handleButtonPress = async () => {
    try {
      const pickupQuery = query(collection(db, 'pickup'), where('email', '==', email), where('storeName', '==', storeName), where('take', '==', false));
      const pickupQuerySnapshot = await getDocs(pickupQuery);
      if (!pickupQuerySnapshot.empty) {
        alert('一天只能領取一次');
      } else {
        navigation.navigate('Take2', { storeName: storeName,status:status,email:email });
      }
    } catch (error) {
      console.error('查詢 pickup 資料時發生錯誤：', error);
    }
  };
    
    const [count, setCount] = useState(0);
  const handleOperation = (value) => {
    setCount(count + value);
  };


  const [storeImageUrl, setStoreImageUrl] = useState(null);

useEffect(() => {
    const getImageUrl = async () => {
        const imageRefs = [
            ref(storage, `meal/${storeName}.jpg`),
            ref(storage, `meal/${storeName}.png`)
        ];

        let imageUrl = null;

        for (const imageRef of imageRefs) {
            try {
                imageUrl = await getDownloadURL(imageRef);
                break; // Found a valid URL, no need to continue the loop
            } catch (error) {
                // Image does not exist, continue to the next one
            }
        }

        setStoreImageUrl(imageUrl);
    };
    getImageUrl();
}, [storeName]);
    return(
        <View style={styles.container}>
          <Text></Text>
             <Text style={styles.headerText}>{ storeName }</Text>
            <Text ></Text>
            <Image
              style={styles.logo1}
               source={require('map/asset/step1.jpg')}/>
               <Text></Text>
               {storeImageUrl && <Image style={styles.logo} source={{ uri: storeImageUrl }} />}
           
          


            
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>{userData ? userData.good_name : 'Loading...'}       一次限領取一份</Text>
              
            </View>
            <Text></Text>
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                  <Text style={styles.buttonText}>領取</Text>
                </TouchableOpacity>
            
        
        
    </View>
    );
};
const styles =StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  backgroundColor:'#FDFBF1',

},
  wrapper:{
      width:'80%',
      
  },
  headerText: {
    fontSize: 40,
  },
  leftText :{
    fontSize: 30,
    left:20,
    position: 'absolute',
    top: 0,
},
detail:{
    fontSize: 25,
    left:20,
    
    
},
logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  logo1: {
    width: 350,
    height: 60,
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
      textAlign: 'center',},

  input:{
      marginBottom:12,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:5,
      paddingHorizontal:14,
      backgroundColor: 'white',
  },
  link:{
      color:'#DA7746',
  }
  
});

export default Take1;