import { View, Image, Text, ScrollView, StyleSheet , TouchableOpacity ,TextInput} from 'react-native';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import Store from '../screens/Store';

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


const Meal = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleButtonPress = (storeName) => {
    navigation.navigate('Store', { storeName: storeName });
  };

  useEffect(() => {
    const fetchStores = async () => {
      const storeCollection = collection(db, 'store');
      const storeSnapshot = await getDocs(storeCollection);
      const storeData = storeSnapshot.docs.map(doc => doc.data());
      setStores(storeData);
    };

    fetchStores();
  }, [db]);

  useEffect(() => {
    const storageRef = ref(storage, 'meal');
    listAll(storageRef)
      .then((res) => {
        return Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));
      })
      .then((urls) => {
        setImageUrls(urls);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error listing files: ', error);
        setLoading(false);
      });
  }, [storage]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="輸入店家名稱"
            onChangeText={text => setSearchText(text)}
          />
          <Text></Text>
          <Image style={styles.logo2} source={require('map/asset/search.png')} />
        </View>
        {imageUrls.map((url, index) => {
          const storeName = stores[index].store_name;
          if (!storeName.includes(searchText) && searchText !== '') {
            return null;
          }

          return (
            <View key={index}>
              <Image source={{ uri: url }} style={styles.logo} />
              <View style={styles.storeContainer}>
                <TouchableOpacity onPress={() => handleButtonPress(storeName)} style={{ alignSelf: 'flex-start' }}>
                  <Text style={styles.leftText}>{storeName}</Text>
                </TouchableOpacity>
                <Text style={styles.detail}>今日提供份數: {stores[index].provide}</Text>
                <Text style={styles.detail}>地址: {stores[index].store_address}</Text>
                <Text style={styles.detail}>電話: {stores[index].store_phone}</Text>
                {/* Add other store details here */}
              </View>
              <Text></Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20
      
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 350,
        height: 200,
        borderRadius: 30,
      },
    leftText :{
        fontSize: 30,
        left:10,
        color:'#DA7746',
    },
    detail:{
        fontSize: 18,
        left:10
    },
    logo2: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginBottom: 20,
      
    },
    row:{
      flexDirection: 'row',
      paddingLeft:70
    },
    input:{
      marginBottom:12,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:15,
      paddingHorizontal:14,
      backgroundColor: 'white',
      height: 45,
      width:'70%',
  },

    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 20, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default Meal;