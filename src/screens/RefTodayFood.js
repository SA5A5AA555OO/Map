import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { Icon } from '@rneui/themed';



const RefTodayFood = () =>{
   
      return (
        <View style={styles.container}>
            <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>輔仁大學食享冰箱</Text>
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日開放領取時間:13:30</Text> 
            </View>  
            <Text></Text>
            <Text></Text>
            <View style={{ marginBottom: 60 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
    <View>
      <Image style={styles.pic} source={require('map/asset/吐司.png')} />
      <Text style={styles.detail}>麵包:50份</Text>
    </View>
    <View style={{ marginLeft: 60 }}>
      <Image style={styles.pic} source={require('map/asset/牛奶.jpg')} />
      <Text style={styles.detail}>牛奶:50份</Text>
    </View>
  </View>
</View>
<View style={{ marginBottom: 60 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
    <View>
      <Image style={styles.pic} source={require('map/asset/餅乾.jpg')} />
      <Text style={styles.detail}>餅乾:50份</Text>
    </View>
    <View style={{ marginLeft: 60 }}>
      <Image style={styles.pic} source={require('map/asset/水果.jpg')} />
      <Text style={styles.detail}>水果:50份</Text>
    </View>
  </View>
</View>




            
             
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20,
    },
    headerText: {
        fontSize: 40,
      },
    pic: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor:'white',
        
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20
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
  
export default RefTodayFood;