import {Text, View, TouchableOpacity, StyleSheet,Image,} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import Introduction2 from '../screens/Introduction2';
import firestore from "@react-native-firebase/firestore"
const Introduction = ({navigation}) => {

  const[userData,setUserData] =useState()

const getData = async() =>{
 const userCollection =await  firestore().collection("user").doc("UBDEL1cF2GcLMCFaza7C").get()
 console.log(userCollection.data())
 setUserData(userCollection.data())
}

useEffect(() =>{
    getData()
  },[])

  return (
    <View style={styles.container}>
       
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/intro1.jpg')} />
      <Text style={styles.text}>即食行樂是一個以輔仁大學食享冰箱發想的平台</Text>
      <Text style={styles.text}>用戶可使用手機查看可領取物資以及捐贈待用餐</Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate('Introduction2')}>
        <Text style={styles.link}>下一頁</Text>
      </TouchableOpacity>
      {userData ? (
      <>
        <Text>Email: {userData.email}</Text>
        <Text>Password: {userData.password}</Text>
        <Text>Phone: {userData.phone}</Text>
        <Text>User ID: {userData.user_ID}</Text>
        <Text>Username: {userData.username}</Text>
      </>
    ) : (
      <Text>Loading...</Text>
    )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  text: {
    fontSize: 17,
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  link: {
    color: '#DA7746',
    fontSize: 25,
  },

  buttonContainer: {
    backgroundColor: '#FCF3EC', // 自定义背景颜色
    padding: 60,
    borderRadius: 35, // 圆角效果
    marginVertical: 70, // 设置垂直间距
    width: '80%',
    elevation: 20,
  },
  buttonText: {
    color: 'gray', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 30,
  },
  logo1: {
    width: 350,
    height: 200,
  },
});

export default Introduction;
