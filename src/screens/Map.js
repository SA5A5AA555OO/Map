import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import FjuRef from '../screens/FjuRef';
import Store from '../screens/Store';

const Map = ({navigation}) => {
  const handleButtonPress1 = () => {
    navigation.navigate('FjuRef');
  };
  const handleButtonPress2 = () => {
    navigation.navigate('Store');
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.03719676448161, //經度
          longitude: 121.43248323862977, //緯度
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker //標記地點
          coordinate={{
            latitude: 25.036536324078433,
            longitude: 121.43183548002627,
          }}
          title={'食享冰箱'}
          description={'點擊食享冰箱'}
          onPress={handleButtonPress1}
        />
        <Marker //標記地點
          coordinate={{
            latitude: 25.042853691197738,
            longitude: 121.44725038057825,
          }}
          title={'素食的店'}
          description={'點擊素食的店'}
          onPress={handleButtonPress2}
        />
      </MapView>
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
  headerText: {
    fontSize: 0,
  },
  logo: {
    width: 400,
    height: 800,
    borderRadius: 30,
  },
  leftText: {
    fontSize: 25,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  link: {
    color: '#DA7746',
  },
  map: {
    width: '100%',
    height: '100%',
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

export default Map;
