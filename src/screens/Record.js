import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image, ScrollView} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState ,useEffect} from "react";
import { Alert } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore/lite';
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

const Record = ({navigation}) =>{
  const route = useRoute();
const { email } = route.params || { email: '' };
  const [selected, setSelected] = useState('notYetReceived');
  const showTip = () => {
    Alert.alert('領取成功')
}

const showAlert = () =>{
    Alert.alert(
        '警告',
        '確認領取?？',
        [
            {text: '確認', onPress: () => showTip()},
            {text: '取消', style: 'cancel'}, 
        ],
        {cancelable: false}
    )
}
const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 確認 email 不為空才執行
    email && fetchUserData();
  }, [email]); // 當 email 發生變化時重新執行效果

  const fetchUserData = async () => {
    try {
      const usersCollection = collection(db, "pickup");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDataList = querySnapshot.docs.map((doc) => doc.data());
        setUserData(userDataList);
      } else {
        console.log("找不到符合條件的使用者");
      }
    } catch (error) {
      console.error("獲取使用者資料時發生錯誤：", error);
    }
  };
  const handlePress = (option) => {
    setSelected(option);
  };
  const renderContent = () => {
    if (selected === 'notYetReceived' && userData) {
      return userData.map((data, index) => (
        <View key={index}>
          {data.take === 1 && (
            <ScrollView>
              <View style={styles.row}>
                <Image
                  style={styles.logo}
                  source={require("map/asset/food.jpg")}
                />
                <View>
                  <Text style={styles.leftText}>{data.storeName}</Text>
                  <Text style={styles.detail}>領取號碼:{data.randomNumber}</Text>
                  <Text style={styles.detail}>領取時間:{data.pickupTime}</Text>
                </View>
                
              </View>
              <Text></Text>
              <View style={styles.line} />
              <Text></Text>
            </ScrollView>
          )}
        </View>
      ));
    } else if (selected === 'received' && userData) {
      return userData.map((data, index) => (
        <View key={index}>
          {data.take === 2 && (
            <ScrollView>
              <View style={styles.row}>
                <Image
                  style={styles.logo}
                  source={require("map/asset/food.jpg")}
                />
                <View>
                  <Text style={styles.leftText}>{data.storeName}</Text>
                  <Text style={styles.detail}>領取號碼:{data.randomNumber}</Text>
                </View>
                
              </View>
              <Text></Text>
              <View style={styles.line} />
              <Text></Text>
            </ScrollView>
          )}
        </View>
      ));
    }
    else if (selected === 'notReceived' && userData) {
      return userData.map((data, index) => (
        <View key={index}>
          {data.take === 3 && (
            <ScrollView>
              <Text style={styles.red}>超過三次未領取即停用帳號</Text>
              <Text></Text>
              <View style={styles.row}>
                <Image
                  style={styles.logo}
                  source={require("map/asset/food.jpg")}
                />
                <View>
                  <Text style={styles.leftText}>{data.storeName}</Text>
                  <Text style={styles.detail}>領取號碼:{data.randomNumber}</Text>
                </View>
                
              </View>
              <Text></Text>
              <View style={styles.line} />
              <Text></Text>
            </ScrollView>
          )}
        </View>
      ));
    }
  };
      return (
        <View style={styles.container}>
          <ScrollView>
          <Image
                style={styles.logo1}
                source={require("map/asset/背景.jpg")}
              />
              <Text style={styles.imageText}>領取資訊</Text>
        <View style={styles.row1}>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'notYetReceived' ? styles.selected : null,
            ]}
            onPress={() => handlePress('notYetReceived')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>尚未領取</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'received' ? styles.selected : null,
            ]}
            onPress={() => handlePress('received')}
            activeOpacity={0.5} 
          >
            <Text style={styles.text}>已領取</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'notReceived' ? styles.selected : null,
            ]}
            onPress={() => handlePress('notReceived')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>未領取</Text>
          </TouchableOpacity>
        </View>
            
        <View style={styles.contentContainer}>{renderContent()}</View>
        
      
      </ScrollView></View>
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FDFBF1',
 
    },
    logo1: {
      width: 400,
      height: 250,
      borderRadius: 50,
      top: -70
    
    },
    imageText: {
      position: 'absolute',
      top: 120, 
      left: 20, 
      fontSize: 35,
      color: 'white',
    },
    textContainer: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      
      
    },
    headerText: {
        fontSize: 40,
      },
      
    logo: {
        width: 63,
        height: 63,
        borderRadius: 100,
        
      },
      row1:{
       top:-30,
        flexDirection: 'row',
      },
      row:{
       
        flexDirection: 'row',
      },
      line: {
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        borderBottomStyle: 'solid',
        width: 350,
       alignSelf: 'center',
      },
    leftText :{
        fontSize: 25,
        paddingLeft:15,
        
    },

    detail:{
        fontSize: 20,
        paddingLeft:15,
    },
    red:{
      fontSize: 20,
      paddingLeft:20,
      color: "red",
  },
   text:{
    fontSize:20,
    
   },
    selected: {
      backgroundColor: '#FBE8CD', // 更改此處以設置所選項目的顏色
    },
    

    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 15,
      borderRadius: 30, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'20%',
      marginLeft: 'auto',
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default Record;