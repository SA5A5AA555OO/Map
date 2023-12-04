/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const RefTodayFood = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.leftText, {alignSelf: 'flex-start'}]}>
        輔仁大學食享冰箱
      </Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.detail}>今日開放領取時間:13:30</Text>
      </View>
      <Text />
      <Text />
      <View style={{marginBottom: 60}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <Image style={styles.pic} source={require('./assets/吐司.png')} />
            <Text style={styles.detail}>麵包:50份</Text>
          </View>
          <View style={{marginLeft: 60}}>
            <Image style={styles.pic} source={require('./assets/牛奶.jpg')} />
            <Text style={styles.detail}>牛奶:50份</Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 60}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <Image style={styles.pic} source={require('assets/餅乾.jpg')} />
            <Text style={styles.detail}>餅乾:50份</Text>
          </View>
          <View style={{marginLeft: 60}}>
            <Image style={styles.pic} source={require('assets/水果.jpg')} />
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
    backgroundColor: '#FDFBF1',
    paddingTop: 20,
  },
  pic: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  leftText: {
    fontSize: 30,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
});

export default RefTodayFood;
