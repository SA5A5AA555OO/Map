import { Text, View, TouchableOpacity, StyleSheet, Modal, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';

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

const Test1 = ({ navigation }) => {
  const route = useRoute();
  const { username, status } = route.params || { username: '用戶' };
  const [pickupCount, setPickupCount] = useState(0);
  const [donateCount, setDonateCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [donateData, setDonateData] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [cancelData, setCancelData] = useState([]);  // 新增取消数据状态
  const [cancelCount, setCancelCount] = useState(0);
  const [modalContent, setModalContent] = useState('donate'); // 新增状态变量来追踪显示的数据类型

  const getData = async () => {
    const userCollection = collection(db, "pickup");
    const pickupQuery = query(userCollection, where("storeName", "==", username), where("take", "in", [1, 2]));
    const cancelQuery = query(userCollection, where("storeName", "==", username), where("take", "==", 3));

    const pickupSnapshot = await getDocs(pickupQuery);
    const cancelSnapshot = await getDocs(cancelQuery);

    if (!pickupSnapshot.empty) {
      let data = [];
      pickupSnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setPickupCount(pickupSnapshot.size);
      setPickupData(data);
    } else {
      console.log("Pickup documents not found");
    }

    if (!cancelSnapshot.empty) {
      let data = [];
      cancelSnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setCancelCount(cancelSnapshot.size);
      setCancelData(data);
    } else {
      console.log("Cancel documents not found");
    }
  };

  const getData1 = async () => {
    const userCollection = collection(db, "donate");
    const userDocQuery = query(userCollection, where("storeName", "==", username));
    const querySnapshot = await getDocs(userDocQuery);
    if (!querySnapshot.empty) {
      let totalCount = 0;
      let data = [];
      querySnapshot.forEach(doc => {
        totalCount += doc.data().count || 0;
        data.push(doc.data());
      });
      setDonateCount(totalCount);
      setDonateData(data);
    } else {
      console.log("Donate documents not found");
    }
  };

  useEffect(() => {
    getData();
    getData1();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>後台資訊</Text>
      <View style={{ marginBottom: 60 }}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.leftText1}>捐贈累計</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity onPress={() => { setModalVisible(true); setModalContent('donate'); }}>
            <View style={[styles.pic, { backgroundColor: '#FBE8CD' }]}>
              <Text style={styles.detail}> {donateCount} </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 10, marginTop: -33 }}>
            <Text style={styles.leftText1}>領取數量</Text>
            <TouchableOpacity onPress={() => { setModalVisible(true); setModalContent('pickup'); }}>
              <View style={[styles.pic, { backgroundColor: '#FBE8CD' }]}>
                <Text style={styles.detail}> {pickupCount} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View style={{ marginTop: -33 }}>
            <Text style={styles.leftText1}>取消數量</Text>
            <TouchableOpacity onPress={() => { setModalVisible(true); setModalContent('cancel'); }}>
              <View style={[styles.pic, { backgroundColor: '#FBE8CD' }]}>
                <Text style={styles.detail}> {cancelCount} </Text>
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10,marginTop: -33 }}>
            <Text style={styles.leftText1}>  領取率</Text>

              <View style={[styles.pic, { backgroundColor: '#FBE8CD' }]}>
                <Text style={styles.detail}> {((pickupCount / (pickupCount + cancelCount)) * 100).toFixed(0)}% </Text>
              </View>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalContent === 'donate' ? '捐贈資料' : (modalContent === 'pickup' ? '領取資料' : '取消資料')}</Text>
              {(modalContent === 'donate' ? donateData : (modalContent === 'pickup' ? pickupData : cancelData)).map((data, index) => (
                <View key={index} style={styles.dataContainer}>
                  <Text style={styles.modalText}>姓名: {data.name}</Text>
                  {modalContent === 'pickup' && (
                    <>
                      <Text style={styles.modalText}>電話: {data.phone}</Text>
                      <Text style={styles.modalText}>領取編號: {data.randomNumber}</Text>
                    </>
                  )}
                  {modalContent === 'donate' && (
                    <>
                      <Text style={styles.modalText}>數量: {data.count}</Text>
                      <Text style={styles.modalText}>日期: {data.dateTime}</Text>
                    </>
                  )}
                  {modalContent === 'cancel' && (
                    <>
                      <Text style={styles.modalText}>領取編號: {data.randomNumber}</Text>
                      <Text style={styles.modalText}>電話: {data.phone}</Text>
                    </>
                  )}
                  <Text>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
                </View>
              ))}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>關閉</Text>
              </TouchableOpacity>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
    top: -70,
  },
  pic: {
    width: 180,
    height: 130,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 30,
  },
  leftText1: {
    fontSize: 25,
    left: 40,
    bottom: 10,
  },
  detail: {
    fontSize: 80,
    textAlign: 'center',
    color: 'sandybrown',
  },
  detail1: {
    fontSize: 80,
    textAlign: 'center',
    color: 'sandybrown',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  dataContainer: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#E6A984',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginTop: 15,
  },
});

export default Test1;