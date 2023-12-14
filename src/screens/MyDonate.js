import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import HomeScreen from './HomeScreen';
import React, { useState } from 'react';
import { Alert } from 'react-native'


const MyDonate = ({navigation}) =>{
  const [selected, setSelected] = useState('notReceived');
  const showTip = () => {
    Alert.alert('領取成功')
}

const showAlert = () =>{
    Alert.alert(
        '警告',
        '確認領取?？',
        [
            {text: '確認', onPress: () => showTip()},
            {text: '取消', style: 'cancel'}, 
        ],
        {cancelable: false}
    )
}
  const handlePress = (option) => {
    setSelected(option);
  };
  const renderContent = () => {
    if (selected === 'notReceived') {
      return <View><View style={styles.row}>
            <Image
           style={styles.logo}
           source={require('map/asset/food.jpg')}/>
             <View>
             <Text style={styles.leftText}>領取編號4398</Text>
             <Text style={styles.detail}>素食的店</Text>
             </View>
             <TouchableOpacity onPress = {showAlert} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>領取</Text>
          </TouchableOpacity>
             </View>
             <Text></Text>
             <View style={styles.line} />
           </View>
    
    
    
    
    } else if (selected === 'received') {
      return <View><View style={styles.row}>
      <Image
     style={styles.logo}
     source={require('map/asset/food.jpg')}/>
       <View>
       <Text style={styles.leftText}>素食的店</Text>
       <Text style={styles.detail}>乾麵 : 1</Text>
       </View>
       <TouchableOpacity  style={styles.buttonContainer}>
      <Text style={styles.buttonText}>回饋</Text>
    </TouchableOpacity>
       </View>
       <Text></Text>
       <View style={styles.line} />
           </View>
    
    }
  };
      return (
        <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'notReceived' ? styles.selected : null,
            ]}
            onPress={() => handlePress('notReceived')}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>尚未付款</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 'received' ? styles.selected : null,
            ]}
            onPress={() => handlePress('received')}
            activeOpacity={0.5} 
          >
            <Text style={styles.text}>已付款</Text>
          </TouchableOpacity>
        </View>
            <Text></Text>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FDFBF1',
      paddingTop:20,
    },
    textContainer: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      
      
    },
    headerText: {
        fontSize: 40,
      },
      
    logo: {
        width: 63,
        height: 63,
        borderRadius: 100,
        
      },
      row:{
       
        flexDirection: 'row',
      },
      line: {
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        borderBottomStyle: 'solid',
        width: 350,
       alignSelf: 'center',
      },
    leftText :{
        fontSize: 25,
        paddingLeft:15,
    },

    detail:{
        fontSize: 20,
        paddingLeft:15,
    },
   text:{
    fontSize:20,
   },
    selected: {
      backgroundColor: '#FBE8CD', // 更改此處以設置所選項目的顏色
    },
    

    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 15,
      borderRadius: 30, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'20%',
      marginLeft: 'auto',
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default MyDonate;