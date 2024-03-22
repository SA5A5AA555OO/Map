import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
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


const ShopImf = ({ navigation }) => {
  const [store_name, setstore_name] = useState('');
  const [provide, setprovide] = useState('');
  const [store_address, setstore_address] = useState('');
  const [store_phone, setstore_phone] = useState('');
  const [closetime, setclosetime] = useState('');
  const [opentime, setopentime] = useState('');


  const handleButtonPress = async () => {
    try {
      await addStoreData(store_name, provide, store_address, store_phone,closetime,opentime);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const addStoreData = async (name, provide, address, phone,closetime,opentime) => {
    await addDoc(collection(db, 'store'), {
      store_name: name,
      provide: provide,
      store_address: address,
      store_phone: phone,
      closetime: closetime,
      opentime: opentime,

    });
    console.log('Document added successfully!');
  };

  
  return(
      <View style={styles.container}>
      <View style={styles.wrapper}>
          <TextInput
          style={styles.input} 
          value={store_name}
          placeholder ="店家名稱"
          onChangeText={Text =>setstore_name(Text)}
          />
          <TextInput
          style={styles.input} 
          value={provide}
          placeholder ="提供數量"
          onChangeText={Text =>setprovide(Text)}
          />
          <TextInput
          style={styles.input} 
          value={store_address}
          placeholder ="地址"
          onChangeText={Text =>setstore_address(Text)}
          />
           <TextInput
          style={styles.input} 
          value={store_phone}
          placeholder ="電話"
          onChangeText={Text =>setstore_phone(Text)}
          />
          <TextInput
          style={styles.input} 
          value={opentime}
          placeholder ="營業時間"
          onChangeText={Text =>setopentime(Text)}
          />
          <TextInput
          style={styles.input} 
          value={closetime}
          placeholder ="結束時間"
          onChangeText={Text =>setclosetime(Text)}
          />
         <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>上傳</Text>
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
export default ShopImf;