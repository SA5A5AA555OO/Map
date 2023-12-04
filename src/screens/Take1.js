import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Navigation from '../Components/Navigation';
import Take2 from '../screens/Take2';

const Take1 = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('Take2');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>素食的店</Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/step1.jpg')} />
      <Text></Text>
      <Image style={styles.logo} source={require('map/asset/素食的店.jpg')} />

      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.detail}>乾麵 $30</Text>
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>領取</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFBF1',
  },
  wrapper: {
    width: '80%',
  },
  headerText: {
    fontSize: 40,
  },
  leftText: {
    fontSize: 30,
    left: 20,
    position: 'absolute',
    top: 0,
  },
  detail: {
    fontSize: 35,
    left: 20,
  },
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  logo1: {
    width: 350,
    height: 60,
  },
  button: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    paddingVertical: 20, // 垂直方向的內邊距
    paddingHorizontal: 40, // 水平方向的內邊距
    borderRadius: 30,
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  link: {
    color: '#DA7746',
  },
});

export default Take1;
