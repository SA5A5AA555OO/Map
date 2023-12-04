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
import HomeScreen from './HomeScreen';

const Favorite = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.headerText}>已儲存的店家</Text>
      </View>
      <Text />
      <Image style={styles.logo} source={require('map/asset/歐姆先生.jpg')} />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.detail}>歐姆先生</Text>
        <Text style={styles.detail}>今日提供份數 10份</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 50,
  },
  logo: {
    width: 300,
    height: 200,
    borderRadius: 40,
  },
  leftText: {
    fontSize: 25,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 50,
  },
  link: {
    color: '#DA7746',
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
  },
});

export default Favorite;
