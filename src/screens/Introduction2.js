import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';

const Introduction2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/intro4.jpg')} />
      <Text style={styles.text}>希望能藉此達到惜食環保的目標 </Text>
      <Text style={styles.text}>落實大學社會責任實踐計畫 </Text>
      <Text style={styles.text}>發揮大學在地責任，解決區域內的社會議題。</Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text></Text>
      <Text></Text>
      
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
    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  text: {
    fontSize: 18
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  link: {
    color: '#DA7746',
    fontSize: 25,
  },

  buttonContainer: {
    backgroundColor: '#FCF3EC', // 自定义背景颜色
    padding: 60,
    borderRadius: 35, // 圆角效果
    marginVertical: 70, // 设置垂直间距
    width: '80%',
    elevation: 20,
  },
  buttonText: {
    color: 'gray', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 30,
  },
  logo1: {
    width: 350,
    height: 200,
  },
});

export default Introduction2;