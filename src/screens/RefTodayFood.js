import { Text, View, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from "react";
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

const RefTodayFood = () => {
  const [userData1, setUserData1] = useState(null);
  const [userData2, setUserData2] = useState(null);

  const getData = async () => {
    try {
      const userCollection = collection(db, "fridges");
      const userDoc1 = doc(userCollection, "jtJgYOmcTgBJAfbhR5WD");
      const userDoc2 = doc(userCollection, "9fPJgKl8FvEzphsriDvn");

      const userDocSnap1 = await getDoc(userDoc1);
      const userDocSnap2 = await getDoc(userDoc2);

      if (userDocSnap1.exists()) {
        setUserData1(userDocSnap1.data());
      } else {
        console.log("Document 1 not found");
      }

      if (userDocSnap2.exists()) {
        const data = userDocSnap2.data();
        const defaultData = { 麵包: 0, 牛奶: 0, 餅乾: 0, 水果: 0 };
        setUserData2({ ...defaultData, ...data });
      } else {
        console.log("Document 2 not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderContent = () => {
    if (userData1 && userData1.open === false) {
      return <Text style={styles.detail1}>今日已結束領取</Text>;
    } else if (userData1 && userData1.open === true) {
      const otherItems = userData2
        ? Object.entries(userData2).filter(
            ([key]) =>
              key !== "麵包" &&
              key !== "牛奶" &&
              key !== "餅乾" &&
              key !== "水果"
          )
        : [];

      return (
        <View>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.detail}>今日開放領取時間:{userData1.start_time}</Text>
          </View>
          <Text />
          <Text />
          <View style={{ marginBottom: 60 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View>
                <Image style={styles.pic} source={require('map/asset/吐司.png')} />
                <View style={styles.square}></View>
                <Text style={styles.detail}>麵包:{userData2 ? userData2.麵包 : 'Loading...'}份</Text>
              </View>
              <View style={{ marginLeft: 60 }}>
                <Image style={styles.pic} source={require('map/asset/牛奶.jpg')} />
                <Text style={styles.detail}>牛奶:{userData2 ? userData2.牛奶 : 'Loading...'}份</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 60 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View>
                <Image style={styles.pic} source={require('map/asset/餅乾.jpg')} />
                <Text style={styles.detail}>餅乾:{userData2 ? userData2.餅乾 : 'Loading...'}份</Text>
              </View>
              <View style={{ marginLeft: 60 }}>
                <Image style={styles.pic} source={require('map/asset/水果.jpg')} />
                <Text style={styles.detail}>水果:{userData2 ? userData2.水果 : 'Loading...'}份</Text>
              </View>
            </View>
          </View>
          <View style={{  flexDirection: 'row',marginBottom: 60 }}>
            {otherItems.map(([key, value]) => (
              <Text style={styles.detail} key={key}>{key}:{value}份    </Text>
            ))}
          </View>
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo1}
        source={require("map/asset/背景.jpg")}
      />
      <Text style={styles.imageText}>輔仁大學食享冰箱</Text>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
    paddingTop: 20,
  },
  imageText: {
    position: 'absolute',
    top: 130,
    left: 20,
    fontSize: 35,
    color: 'white',
  },
  logo1: {
    width: 400,
    height: 250,
    borderRadius: 50,
    top: -70
  },
  pic: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: 'white',
    top: -60
  },
  detail: {
    fontSize: 20,
    left: 20,
    top: -60
  },
  detail1: {
    fontSize: 30,
    top: 100
  },
});

export default RefTodayFood;
