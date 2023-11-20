import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import Favorite from '../screens/Favorite';
import Record from '../screens/Record';
import EditProfile from '../screens/EditProfile';





const Me = ({navigation}) =>{
   
  return (
    <View style={styles.container}>
      <View style={styles.row}>
         <Image
           style={styles.logo}
           source={require('map/asset/user.png')}/>
           <Text style={styles.headerText} >個人頁面</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
        <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>我的最愛</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Record')}>
        <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>查看領取資訊</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>修改個人資訊</Text>
      </TouchableOpacity>
    </View>
  );
  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:20,
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
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default Me;