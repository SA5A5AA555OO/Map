import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Navigation from './Components/Navigation';
import Store from './screens/Store';

const Meal = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('Store');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="輸入店家名稱" />
          <Text />
          <Image
            style={styles.logo2}
            source={require('../assets/search.png')}
          />
        </View>

        <Image style={styles.logo} source={require('../assets/素食的店.jpg')} />

        <TouchableOpacity
          onPress={handleButtonPress}
          style={{alignSelf: 'flex-start'}}>
          <Text style={styles.leftText}>素食的店</Text>
        </TouchableOpacity>

        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.detail}>今日提供份數:10</Text>
          <Text style={styles.detail}>地址:新北市新莊區泰順街</Text>
          <Text style={styles.detail}>電話:0932921110</Text>
          <Text style={styles.detail}>請讓給有需要人士領取</Text>
        </View>

        {/* 省略其他部分 */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
    paddingTop: 20,
  },
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
  leftText: {
    fontSize: 30,
    left: 10,
    color: '#DA7746',
  },
  detail: {
    fontSize: 18,
    left: 10,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 70,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    height: 45,
    width: '70%',
  },
  // 省略其他樣式
});

export default Meal;
