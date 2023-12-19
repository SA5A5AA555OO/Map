import React, { useState } from 'react';
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet} from 'react-native';
import LoginScreen from '../screens/LoginScreen';

const RegesterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleButtonPress = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="姓名"
          onChangeText={Text => setEmail(Text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="電話"
          onChangeText={Text => setEmail(Text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="信箱"
          onChangeText={Text => setEmail(Text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="密碼"
          onChangeText={Text => setPassword(Text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="確認密碼"
          onChangeText={Text => setPassword(Text)}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>註冊</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFBF1',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
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
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    height: 60,
  },
  link: {
    color: '#DA7746',
  },
});

export default RegesterScreen;
