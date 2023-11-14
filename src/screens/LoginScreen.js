import React, { useState } from 'react';
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet} from 'react-native';
import Navigation from '../Components/Navigation';
import RegesterScreen from '../screens/RegesterScreen';
import HomeScreen from '../screens/HomeScreen';
const LoginScreen = ({navigation}) =>{
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    const handleButtonPress = () => {
        navigation.navigate('Home');
      };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="輸入 email"
                        onChangeText={text => setEmail(text)}
                    />


                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="輸入密碼"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />


                    <Button title="登入" color="#E6A984" />


                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text>尚未擁有帳號?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.link}> 點擊註冊</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white', // 按钮文本颜色
        fontWeight: 'bold',
        textAlign: 'center',},

    input:{
        marginBottom:12,
        borderWidth:1,
        borderColor:'#bbb',
        borderRadius:5,
        paddingHorizontal:14,
        backgroundColor: 'white',
    },
    link:{
        color:'#DA7746',
    }
    
});

export default LoginScreen;