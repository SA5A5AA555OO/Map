import { View, Image, Text, ScrollView, StyleSheet , TouchableOpacity ,TextInput} from 'react-native';
import React, { useState ,useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';


const Test = ({ navigation }) => {
  

  const handleButtonPress = (storeName) => {
    navigation.navigate('Test1');
  };

  

  

  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <Image
        style={styles.logo}
        source={require('map/asset/即食行樂2.jpg')} />
    </TouchableOpacity>
  );
};


  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    backgroundColor:'#FDFBF1',
    paddingTop:200
    
  },
  headerText: {
      fontSize: 40,
    },
  logo: {
      width: 200,
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
export default Test;