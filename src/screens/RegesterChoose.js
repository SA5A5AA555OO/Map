import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet} from 'react-native';
import RegesterScreen from '../screens/RegesterScreen';
import RegesterScreen2 from '../screens/RegesterScreen';


const RegesterChoose = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('Regester');
      };
      const handleButtonPress2 = () => {
        navigation.navigate('Regester2');
      };
      return (
        
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>註冊</Text>
            <View style={styles.topBlock}></View>
          <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>消費者</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>店家</Text>
          </TouchableOpacity>
        </View>
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#FDFBF1'
    },
    topBlock: {
        height: 50, // 设置横色块的高度
        backgroundColor: '#E6A984'}, // 自定义颜色
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
  
export default RegesterChoose;