import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';






const Shop = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('TakePeople');
      };
      const handleButtonPress2 = () => {
        navigation.navigate('DonatePeople');
      };
      const handleButtonPress3 = () => {
        navigation.navigate('ShopImf');
      };
      return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看領取名單</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2}style={styles.buttonContainer}>
            <Text style={styles.buttonText}>查看捐贈數量</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress3} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>編輯公布資訊</Text>
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
      fontSize:20,
      
    },
    logo: {
      width: 300,
      height: 250,
      borderRadius: 30,
    },
  });
  
export default Shop;