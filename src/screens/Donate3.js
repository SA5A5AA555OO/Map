import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { useRoute } from '@react-navigation/native';



const Donate3 = ({navigation}) =>{
  const route = useRoute();
  const { storeName ,status} = route.params;
      return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{storeName}</Text>
            <Text></Text>
            <Image
              style={styles.logo1}
               source={require('map/asset/Dstep3.jpg')}/>
               <Text></Text>
            <Image
              style={styles.logo}
               source={require('map/asset/感謝捐贈.jpg')}/>
               <Text></Text>
           <TouchableOpacity onPress={() =>navigation.navigate('Home',{ status:status })}>
                        <Text style={styles.link}>回主頁</Text>
                    </TouchableOpacity>
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 30,
        
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20
    },
    link:{
        color:'#DA7746',
    },
    logo1: {
      width: 350,
      height: 60,
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
  
export default Donate3;