import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleButtonPress = () => {
    navigation.navigate('LoginSuccess');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>您好</Text>
      <View style={styles.wrapper}>
        <Text style={{fontSize: 40}} />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="輸入帳號"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="輸入密碼"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>登入</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={styles.link1}>沒有帳號? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegesterChoose')}>
            <Text style={styles.link}>註冊</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#E6A984',
    padding: 17,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
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
    fontSize: 20,
  },
  link1: {
    fontSize: 20,
  },
});

export default LoginScreen;
