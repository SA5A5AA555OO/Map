import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInpu,Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, query, where,updateDoc, } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import HomeScreen from './HomeScreen';
import { useRoute } from '@react-navigation/native';
import store from './Store';
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



const Favorite = ({ navigation }) => {
  const route = useRoute();
  const { email, status } = route.params;
  const [fav,setFav] = useState([]);

  const handleButtonPress = (storeName) => {
    navigation.navigate('Store', { status: status, email: email, storeName: storeName, fav:1 });
  };

  const handleDelete = async (storeName) => {
    const querySnapshot = await getDocs(query(collection(db, 'user'), where('email', '==', email)));
    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      try {
        const userData = querySnapshot.docs[0].data();
        let favoriteStores = userData.favorite || [];
          favoriteStores = favoriteStores.filter(item => item !== storeName);
          await updateDoc(userDocRef, { favorite: favoriteStores });
          Alert.alert('成功移除最愛');
          searchFavorite(email); // 重新查詢最新的資料並更新本地狀態
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      console.error('No documents found for query');
    }
  };
  

  const [favoriteList, setFavoriteList] = useState([]);

  const searchFavorite = async (email) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'user'), where('email', '==', email)));
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const favoriteValue = userDoc.data().favorite || [];
        setFavoriteList(favoriteValue);
        // console.log('Favorite:', favoriteValue);
      } else {
        console.log('No documents found for query');
      }
    } catch (error) {
      console.error('Error searching favorite:', error);
    }
  };

  useEffect(() => {
    searchFavorite(email);
  }, [email]);

  const [storeData, setStoreData] = useState([]);

  const searchStores = async (favorites) => {
    try {
      const storeDocs = [];
      for (const favorite of favorites) {
        const querySnapshot = await getDocs(query(collection(db, 'store'), where('store_name', '==', favorite)));
        if (!querySnapshot.empty) {
          const storeDoc = querySnapshot.docs.map(doc => doc.data());
          storeDocs.push(...storeDoc);
          // console.log('Store Data:', storeDoc);
        } else {
          // console.log('No documents found for query');
        }
      }
      setStoreData(storeDocs);
    } catch (error) {
      console.error('Error searching store:', error);
    }
  };

  useEffect(() => {
    searchStores(favoriteList);
  }, [favoriteList]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}> 已儲存的店家</Text>
        <Text></Text>
        {storeData.map((store, index) => (
          <View key={index}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
              <View>
                <TouchableOpacity onPress={() => handleButtonPress(store.store_name)} style={{ alignSelf: 'flex-start' }}>
                  <Text style={styles.leftText}>{store.store_name}</Text>
                </TouchableOpacity>
                <Text style={styles.detail}>今日提供份數: {store.provide}</Text>
                <Text style={styles.detail}>品項:{store.good_name}</Text>
                <Text style={styles.detail}>電話:{store.store_phone}</Text>
                <Text></Text>
                
              </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDelete(store.store_name)}>
                  <Text style={styles.buttonText}>刪除</Text>
                </TouchableOpacity>
              </View>
              </View>
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>
          </View>
        ))}

      </ScrollView>
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
  buttonWrapper: {
    marginTop: 45, 
  },
  headerText: {
    fontSize: 35,
    alignItems: 'center',
  },

  logo: {
    width: 90,
    height: 90,
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
    fontSize: 30,
    paddingLeft: 15,
    color: '#DA7746',
  },

  detail: {
    fontSize: 20,
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#FBE8CD', // 更改此處以設置所選項目的顏色
  },



  buttonContainer: {
    backgroundColor: '#E6A984', // 自定义背景颜色
    padding: 15,
    borderRadius: 30, // 圆角效果
    marginVertical: 10, // 设置垂直间距
    width: '20%',
    marginLeft: 'auto',
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginLeft: 20,
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 10,
    borderRadius: 20,
    width: 80,
    height: 55,
  },
});

export default Favorite;