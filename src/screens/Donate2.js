import { View, Image, Text, ScrollView, StyleSheet , TouchableOpacity ,TextInput} from 'react-native';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, where,query } from 'firebase/firestore/lite';
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
  //
  const [storeImageUrl, setStoreImageUrl] = useState(null);

useEffect(() => {
    const getImageUrl = async () => {
        const imageRef = ref(storage, `meal/${storeName}.jpg`);
        const imageUrl = await getDownloadURL(imageRef);
        setStoreImageUrl(imageUrl);
    };
    getImageUrl();
}, [storeName]);
  
const route = useRoute();
const { storeName,status,email } = route.params;
  const handleButtonPress = (storeName) => {
    navigation.navigate('Donate1', { storeName: storeName ,count: count,status:status,email:email  });
  };
  const [count, setCount] = useState(1);
  const handleOperation = (value) => {
    if (count + value >= 1) {
      setCount(count + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{storeName}</Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/Dstep1.jpg')} />
      <Text></Text>
      {storeImageUrl && <Image style={styles.logo} source={{ uri: storeImageUrl }} />}

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
        <TouchableOpacity onPress={() => handleButtonPress(storeName,status)} style={styles.donateButton}>
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