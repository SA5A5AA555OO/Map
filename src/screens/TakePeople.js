import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import HomeScreen from './HomeScreen';




const TakePeople = ({navigation}) =>{
   
      return (
        <View style={styles.container}>
            <Text style={styles.headerText}>尚無最愛店家</Text>
            

           
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#FDFBF1',
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        
      },
    leftText :{
        fontSize: 25,
        left:20,
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
  
export default TakePeople;