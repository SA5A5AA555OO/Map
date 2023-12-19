import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import FjuRef from '../screens/FjuRef';

const Ref = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('FjuRef');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="輸入店家名稱" />
          <Text />
          <Image style={styles.logo2} source={require('./assets/search.png')} />
        </View>

        <Image style={styles.logo} source={require('../assets/ref.jpg')} />

        <TouchableOpacity
          onPress={handleButtonPress}
          style={{alignSelf: 'flex-start'}}>
          <Text style={styles.leftText}>輔仁大學食享冰箱</Text>
        </TouchableOpacity>

        {/* 省略其他部分 */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 省略其他樣式
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  logo2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginBottom: 20,
  },
  // 省略其他樣式
});

export default Ref;
