import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useCallback } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore/lite';
import { useFocusEffect } from '@react-navigation/native';

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

const Notification = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userData1, setUserData1] = useState(null);
  const [donateData, setDonateData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState('notReceived');

  const getData = async () => {
    try {
      const userCollection1 = collection(db, "fridges"); // 集合名稱可能需要修改
      const userDoc1 = doc(userCollection1, "jtJgYOmcTgBJAfbhR5WD");
      const userDocSnap1 = await getDoc(userDoc1);
      if (userDocSnap1.exists()) {
        setUserData(userDocSnap1.data());
      } else {
        console.log("Document not found");
      }
  
      const userCollection2 = collection(db, "fridges"); // 集合名稱可能需要修改
      const userDoc2 = doc(userCollection2, "9fPJgKl8FvEzphsriDvn");
      const userDocSnap2 = await getDoc(userDoc2);
      if (userDocSnap2.exists()) {
        const userData2 = userDocSnap2.data(); // 取得 9fPJgKl8FvEzphsriDvn 文件的資料
        setUserData1(userData2); // 設置到對應的變數中
      } else {
        console.log("Document not found");
      }
  
      const today = new Date().toISOString().split('T')[0]; 
      console.log("Today's date:", today); 
      const donateCollection = collection(db, "donate");
      const q = query(donateCollection, where("date", "==", today)); 
      const querySnapshot = await getDocs(q);
      const donateList = querySnapshot.docs.map(doc => doc.data());
      console.log("Donations fetched:", donateList); 
      setDonateData(donateList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const handlePress = (status) => {
    setSelected(status);
  };

  const renderContent = () => {
    if (selected === 'notReceived') {
      return (
        <View>
          
          { userData && userData1 && userData.open ? (
            <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
                  <View>
      <Text style={styles.leftText}>{userData.adjustTime}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  {Object.keys(userData1).map((key, index) => (
    <View key={index} style={{ flexDirection: 'row',  width: '40%' }}>
      <Text style={styles.detail}>{key}: {userData1[key]}份</Text>
      {index % 2 === 1 && <Text></Text>}

    </View>
  ))}
</View>
    </View>
            </View>
          ) : (
            <Text style={styles.detail1}>今日已結束領取</Text>
          )}
        </View>
      );
    } else if (selected === 'received') {
      return (
        <View>
          {donateData.length > 0 ? donateData.map((data, index) => (
            <View key={index}>
              <View style={styles.row}>
                <Image
                  style={styles.logo}
                  source={require("map/asset/food.jpg")}
                />
                <View>
                  <Text style={styles.leftText}>{data.storeName}</Text>
                  <Text style={styles.detail}>有人捐贈了{data.count}份待用餐!!</Text>
                  <Text style={styles.detail}>{data.dateTime}</Text>
                </View>
              </View>
              <Text></Text>
              <View style={styles.line} />
              <Text></Text>
            </View>
          )) : <Text style={styles.detail1}>沒有待用餐記錄</Text>}
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image
          style={styles.logo1}
          source={require("map/asset/背景.jpg")}
        />
        <Text style={styles.imageText}>及時通知</Text>
        <View style={styles.row1}>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'notReceived' ? styles.selected : null,
            ]}
            onPress={() => handlePress('notReceived')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>食享冰箱</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'received' ? styles.selected : null,
            ]}
            onPress={() => handlePress('received')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>待用餐店家</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF1',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top:-50
  },
  buttonWrapper: {
    marginTop: 45,
  },
  headerText: {
    fontSize: 35,
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 100,
    top: 10,
  },
  row: {
    flexDirection: 'row',
    top: -50,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    width: 350,
    alignSelf: 'center',
    top: -50,
  },
  leftText: {
    fontSize: 24,
    paddingLeft: 15,
    color: '#DA7746',
  },
  logo1: {
    width: 400,
    height: 250,
    borderRadius: 50,
    top: -60,
  },
  detail: {
    fontSize: 20,
    paddingLeft: 15,
  },
  detail1: {
    fontSize: 30,
    paddingLeft: 80,
    paddingTop: 100,
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
    top: -30,
  },
  imageText: {
    position: 'absolute',
    top: 130,
    left: 20,
    fontSize: 32,
    color: 'white',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  contentContainer: {
    padding: 10,
  },
});

export default Notification;
