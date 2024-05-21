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
  const [userData, setUserData] = useState(null);
  const [storeImageUrl, setStoreImageUrl] = useState(null);
  const [count, setCount] = useState(1);

  const route = useRoute();
  const { storeName, status, email } = route.params;

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
    getData(db);
  }, []);

  useEffect(() => {
    const getImageUrl = async () => {
      const imageRefs = [
        ref(storage, `meal/${storeName}.jpg`),
        ref(storage, `meal/${storeName}.png`)
      ];
      const urls = await Promise.all(imageRefs.map(async (imageRef) => {
        try {
          return await getDownloadURL(imageRef);
        } catch (error) {
          return null;
        }
      }));
      const validUrl = urls.find(url => url !== null);
      if (validUrl) {
        setStoreImageUrl(validUrl);
      }
    };
    getImageUrl();
  }, [storeName]);

  const handleButtonPress = () => {
    const total = userData ? userData.good_price * count : 0;
    navigation.navigate('Donate1', { storeName, count, status, email, total });
  };

  const handleOperation = (value) => {
    if (count + value >= 1) {
      setCount(count + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={styles.headerText}>{storeName}</Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/Dstep1.jpg')} />
      <Text></Text>
      {storeImageUrl && <Image style={styles.logo} source={{ uri: storeImageUrl }} />}

      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.detail}>一份 ${userData ? userData.good_price : 'Loading...'}元</Text>
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
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity onPress={handleButtonPress} style={styles.donateButton}>
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
    fontSize: 20,
  },
  donateButton: {
    backgroundColor: '#E6A984',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 40,
  },
  totalText: {
    fontSize: 30,
  },
});

export default Donate2;