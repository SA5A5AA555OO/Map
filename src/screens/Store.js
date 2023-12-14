import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import Navigation from '../Components/Navigation';
import Donate2 from '../screens/Donate2';
import Take1 from '../screens/Take1';
import {Icon} from '@rneui/themed';

const Store = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('Donate2');
  };
  const handleButtonPress2 = () => {
    navigation.navigate('Take1');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>素食的店</Text>
      <View style={styles.line} />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.detail}>營業時間 13:30-20:00</Text>
        <Text style={styles.detail}>地址:新北市新莊區泰順街</Text>
        <Text style={styles.detail}>電話:0932921110</Text>
      </View>
      <Image style={styles.pic} source={require('map/asset/map.jpg')} />
      <TouchableOpacity
        onPress={handleButtonPress}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>捐贈待用餐</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleButtonPress2}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>領取待用餐</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>加入最愛</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  pic: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  leftText: {
    fontSize: 30,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  line: {
    borderBottomWidth: 1, // 线的宽度
    borderBottomColor: 'black',
    width: 350,
    alignSelf: 'center',
  },

  buttonContainer: {
    backgroundColor: '#E6A984',
    padding: 20,
    borderRadius: 30, // 圆角效果
    marginVertical: 5, // 设置垂直间距
    width: '80%',
  },
  buttonText: {
    color: 'white', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 15,
  },
});

export default Store;
