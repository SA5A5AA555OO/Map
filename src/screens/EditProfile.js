import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Me from './Me';
import React, { useState ,useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, where,query, updateDoc } from 'firebase/firestore/lite';
import { Alert } from 'react-native';
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


const EditProfile = ({navigation}) =>{
 
    const [name, setName]=useState('');
    const [phone, setPhone]=useState('');
    

    const handleButtonPress = async () => {
      try {
        const userQuery = query(collection(db, 'user'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const docRef = doc(db, 'user', querySnapshot.docs[0].id);
          await updateDoc(docRef, { username: name, phone: phone });
          showAlert(); // 顯示修改成功的提示
          navigation.navigate('Home', { status });
        } else {
          console.log('找不到符合條件的使用者');
        }
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };
    const showAlert = () => {
    Alert.alert('修改成功');
  };
    const route = useRoute();
      const { email,status } = route.params;
      useEffect(() => {
        fetchUserData();
      }, []);
    
      const fetchUserData = async () => {
        try {
          const userQuery = query(collection(db, 'user'), where('email', '==', email));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const docRef = doc(db, 'user', querySnapshot.docs[0].id);
            const userData = querySnapshot.docs[0].data();
            setName(userData.username); // 更新名字
            setPhone(userData.phone); // 更新電話
          } else {
            console.log('找不到符合條件的使用者');
          }
        } catch (error) {
          console.error('獲取使用者資料時發生錯誤：', error);
        }
      };
    
    return(
        <View style={styles.container}>
        <View style={styles.wrapper}>
            <TextInput
            style={styles.input} 
            value={name}
            placeholder ="姓名"
            onChangeText={Text =>setName(Text)}
            />
            <TextInput
            style={styles.input} 
            value={phone}
            placeholder ="電話"
            onChangeText={Text =>setPhone(Text)}
            />
            <TextInput
            style={styles.input} 
            value={email}
            placeholder ="信箱"
            editable={false}
            />
            
           <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                  <Text style={styles.buttonText}>修改</Text>
                </TouchableOpacity>
            <View style={{flexDirection:'row', marginTop:20}}></View>

            
         
              
            
        </View>
    </View>
    );
};
const styles =StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  backgroundColor:'#FDFBF1',
  justifyContent:'center',},
  wrapper:{
      width:'80%',
      
  },
  button: {
      backgroundColor: '#E6A984', // 自定义按钮颜色
      padding: 20,
      borderRadius: 20,
    },
    buttonText: {
      color: 'white', // 按钮文本颜色
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
    },

  input:{
      marginBottom:20,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:20,
      paddingHorizontal:14,
      backgroundColor: 'white',
      height:60,
  },
  link:{
      color:'#DA7746',
  }
  
});

export default EditProfile;