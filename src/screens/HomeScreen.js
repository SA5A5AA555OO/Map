import React, { useState, useEffect, } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ref from '../screens/Ref';
import Meal from '../screens/Meal';
import Me from './Me';
import Map from './Map';
import Shop from '../screens/Shop';
import Introduction from '../screens/Introduction';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { status,email } = route.params || { status: 0 };
  const [buttons, setButtons] = useState([]);
  const { username } = route.params || { username: '' };
  
    useEffect(() => {
        // 根據使用者的 status 狀態動態設置按鈕
        switch (status) {
            case "1":
                setButtons([
                    { text: '介紹', onPress: () => navigation.navigate('Introduction', {  status: status }) },
                    { text: '食享冰箱', onPress: () => navigation.navigate('Ref') },
                    { text: '待用餐', onPress: () => navigation.navigate('Meal', {  status: status,email: email }) }
                ]);
                break;
            case "2":
                setButtons([{ text: '修改冰箱資訊', onPress: () => navigation.navigate('RefAdjust', {  status: status }) }]);
                break;
            case "3":
                setButtons([{ text: '店家資訊', onPress: () => navigation.navigate('Shop',{  email: email }) }]);
                break;
            default:
                setButtons([]);
                break;
        }
    }, [status]);
    
    

    return (
      <View style={styles.container}>
          <View style={styles.topBlock}></View>
          <Image
              style={styles.logo}
              source={require('map/asset/即食行樂2.jpg')} />
          {buttons.map((button, index) => (
              <TouchableOpacity key={index} onPress={button.onPress} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>{button.text}</Text>
              </TouchableOpacity>
          ))}
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#FDFBF1',
      paddingTop:30,
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
      fontSize:20,
      
    },
    logo: {
      width: 170,
      height: 170,
      borderRadius: 30,
    },
  });
  
export default HomeScreen;