import React, { useState } from 'react';
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet} from 'react-native';
import Navigation from '../Components/Navigation';
import RegesterScreen from '../screens/RegesterScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginSuccess from '../screens/LoginSuccess';
const LoginScreen = ({navigation}) =>{
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    const handleButtonPress = () => {
        navigation.navigate('LoginSuccess');
      };

    return (
        <View style={styles.container}>
            
            <Text style={{ fontSize: 40 }}>您好</Text>
            <View style={styles.wrapper}>
                <Text style={{ fontSize: 40 }}></Text>
                <TextInput
                style={styles.input} 
                value={email}
                placeholder ="輸入帳號"
                onChangeText={Text =>setEmail(Text)}
                />
                <TextInput 
                style={styles.input} 
                value={password}
                placeholder ="輸入密碼" 
                onChangeText={Text =>setPassword(Text)}
                secureTextEntry={true}
                />
                <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                  <Text style={styles.buttonText}>登入</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row', marginTop:20}}>
                
                    <Text style={styles.link1}>沒有帳號? </Text>
                    <TouchableOpacity onPress={() =>navigation.navigate('RegesterChoose')}>
                        <Text style={styles.link}>註冊</Text>
                    </TouchableOpacity>
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
        padding: 17,
        borderRadius: 20,
      },
      buttonText: {
        color: 'white', // 按钮文本颜色
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:20,
    },

    input:{
        marginBottom:12,
        borderWidth:1,
        borderColor:'#bbb',
        borderRadius:20,
        paddingHorizontal:14,
        backgroundColor: 'white',
        height: 60,
    },
    link:{
        color:'#DA7746',
        fontSize:20,
    },
    link1:{
        fontSize:20,
    }
    
});

export default LoginScreen;