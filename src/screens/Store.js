import { View, Image, Text, ScrollView, StyleSheet , TouchableOpacity ,TextInput} from 'react-native';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { useRoute } from '@react-navigation/native';
import Donate2 from '../screens/Donate2';
import Take1 from '../screens/Take1';
import { Icon } from '@rneui/themed';



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


const Store = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('Donate2');
      };
      const handleButtonPress2 = () => {
        navigation.navigate('Take1');
      };
      const route = useRoute();
      const { storeName } = route.params;

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
      return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{route.params.storeName}</Text>
            <View style={styles.line} />
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>營業時間:{userData ? userData.opentime : 'Loading...'}</Text>
               <Text style={styles.detail}>地址:{userData ? userData.store_address : 'Loading...'}</Text>
               <Text style={styles.detail}>電話:{userData ? userData.store_phone : 'Loading...'}</Text>
               </View>
               <Image
              style={styles.pic}
               source={require('map/asset/map.jpg')}/> 
               <TouchableOpacity onPress={handleButtonPress}style={styles.buttonContainer}>
                 <Text style={styles.buttonText}>捐贈待用餐</Text>
               </TouchableOpacity>
               <TouchableOpacity  onPress={handleButtonPress2} style={styles.buttonContainer}>
                 <Text style={styles.buttonText}>領取待用餐</Text>
               </TouchableOpacity>
               <TouchableOpacity  style={styles.buttonContainer}>
                 <Text style={styles.buttonText}>加入最愛</Text>
               </TouchableOpacity>
                 
                
            
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 350,
        height: 200,
        borderRadius: 30,
      },
      pic:{
        width: 350,
        height: 350,
        borderRadius: 10,
      
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20
    },
    line: {
        borderBottomWidth: 1, // 线的宽度
        borderBottomColor: 'black', 
        width: 350,
       alignSelf: 'center',
      },


    buttonContainer: {
      backgroundColor: '#E6A984', 
      padding: 20,
      borderRadius: 30, // 圆角效果
      marginVertical: 5, // 设置垂直间距
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:15,
    },
  });
  
export default Store;