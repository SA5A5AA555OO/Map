import {Text, View,  StyleSheet,} from 'react-native';
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

  const Test = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    
  
    const getData = async (db) => {
      const userCollection = collection(db, "user");
      const userDoc = doc(userCollection, "UBDEL1cF2GcLMCFaza7C");
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
  
    return (
      <View style={styles.container}>
        {userData ? (
          <>
            <Text>Email: {userData.email}</Text>
            <Text>Password: {userData.password}</Text>
            <Text>Phone: {userData.phone}</Text>
            <Text>Username: {userData.username}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  };
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  text: {
    fontSize: 18
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  link: {
    color: '#DA7746',
    fontSize: 25,
  },

  buttonContainer: {
    backgroundColor: '#FCF3EC', // 自定义背景颜色
    padding: 60,
    borderRadius: 35, // 圆角效果
    marginVertical: 70, // 设置垂直间距
    width: '80%',
    elevation: 20,
  },
  buttonText: {
    color: 'gray', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 30,
  },
  logo1: {
    width: 350,
    height: 200,
  },
});

export default Test;