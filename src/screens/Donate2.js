import { View, Image, Text, ScrollView, StyleSheet , TouchableOpacity ,TextInput} from 'react-native';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, where,query } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
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


const Donate2 = ({ navigation }) => {
  //查詢資料
  const [userData, setUserData] = useState(null);
      const getData = async (db) => {
        const userCollection = collection(db, "store");
        const userDoc = doc(userCollection, storeName);
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
  //
  
  
const route = useRoute();
const { storeName } = route.params;
  const handleButtonPress = (storeName) => {
    navigation.navigate('Donate1', { storeName: storeName ,count: count  });
  };
  const [count, setCount] = useState(0);
  const handleOperation = (value) => {
    setCount(count + value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{storeName}</Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/Dstep1.jpg')} />
      <Text></Text>
      <Image style={styles.logo} source={require('map/asset/素食的店.jpg')} />

      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.detail}>一份 ${userData ? userData.good_price : 'Loading...'}元       </Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleOperation(-1)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>  {count}  </Text>
            <TouchableOpacity style={styles.button} onPress={() => handleOperation(1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            

          </View>
        </View>
        <Text style={styles.totalText}>總計${userData ? userData.good_price * count : 'Loading...'}</Text>
        <Text></Text>
        <TouchableOpacity onPress={() => handleButtonPress(storeName)} style={styles.donateButton}>
          <Text style={styles.buttonText}>捐贈</Text>
        </TouchableOpacity>
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
  logo1: {
    width: 350,
    height: 60,
  },
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  detailsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: 35,
    marginBottom: 20,
    marginRight: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#E6A984',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:20
  },
  donateButton: {
    backgroundColor: '#E6A984',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 40,
  },
  totalText:{
    fontSize: 30,

  }
});

export default Donate2;