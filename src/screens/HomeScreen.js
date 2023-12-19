
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import Ref from '../screens/Ref';
import Meal from '../screens/Meal';
import Me from './Me';
import Map from './Map';
import Shop from '../screens/Shop';

const HomeScreen = ({navigation}) => {
  const handleButtonPress = () => {
      navigation.navigate('Ref');
    };
    const handleButtonPress2 = () => {
      navigation.navigate('Meal');
    };
    const handleButtonPress3 = () => {
      navigation.navigate('Me');
    };
    const handleButtonPress5 = () => {
      navigation.navigate('Shop');
    };
    const handleButtonPress6 = () => {
      navigation.navigate('RefAdjust');
    };
    
    


   return (
    

        <View style={styles.container}>
         
            <View style={styles.topBlock}></View>
            <Image
              style={styles.logo}
               source={require('map/asset/即食行樂2.jpg')}/>
           
          <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>食享冰箱</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleButtonPress2}style={styles.buttonContainer}>
            <Text style={styles.buttonText}>待用餐</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress3} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>個人頁面</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress5} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>店家資訊</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleButtonPress6} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>修改冰箱資訊</Text>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
          <Text></Text>
         
        </View>
      );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDFBF1',
    paddingTop: 30,
  },

  buttonContainer: {
    backgroundColor: '#E6A984', // 自定义背景颜色
    padding: 20,
    borderRadius: 20, // 圆角效果
    marginVertical: 10, // 设置垂直间距
    width: '80%',
  },
  buttonText: {
    color: 'white', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 20,
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 30,
  },
});

export default HomeScreen;
