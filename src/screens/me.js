import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';

import Favorite from './Favorite';
import Record from './Record';
import EditProfile from './EditProfile';
import LoginScreen from './LoginScreen';




const Me = ({navigation}) =>{
  const handleButtonPress = () => {
    navigation.navigate('Favorite');
  };
  const handleButtonPress2 = () => {
    navigation.navigate('Record');
  };
  const handleButtonPress3 = () => {
    navigation.navigate('EditProfile');
  };
  const handleButtonPress4 = () => {
    navigation.navigate('Login');
  };
  
  const handleButtonPress5 = () => {
    navigation.navigate('MyDonate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
         <Image
           style={styles.logo}
           source={require('map/asset/user.png')}/>
           <Text style={styles.headerText} >個人頁面</Text>
      </View>
      
      <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看最愛店家</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2}style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看領取資訊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress5} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看捐贈資訊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress3} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>修改個人資料</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleButtonPress4} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>登入</Text>
          </TouchableOpacity>
    </View>
    
  );
  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20,
    },
    headerText: {
        fontSize: 35,
        
      },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginBottom: 50,
        
      },
    leftText :{
        fontSize: 25,
        marginBottom: 10,
    },
    row:{
      paddingLeft:20,
      flexDirection: 'row',
    },
    detail:{
        fontSize: 20,
        left:20
    },
    link:{
        color:'#DA7746',
    },

    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 20, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'80%',
      alignSelf: 'center', 
       
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:20,
      
    },

    
    
  });
  
export default Me;