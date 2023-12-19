import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

const Donate2 = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('Donate1');
  };

  const [count, setCount] = useState(0);

  const handleOperation = value => {
    setCount(count + value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>素食的店</Text>
      <Text />
      <Image style={styles.logo1} source={require('map/asset/Dstep1.jpg')} />
      <Text />
      <Image style={styles.logo} source={require('map/asset/素食的店.jpg')} />

      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.detail}>乾麵 $30 </Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOperation(-1)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}> {count} </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOperation(1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.totalText}>總計${count * 30}</Text>
        <Text />
        <TouchableOpacity
          onPress={handleButtonPress}
          style={styles.donateButton}>
          <Text style={styles.buttonText}>捐贈</Text>
        </TouchableOpacity>
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
  logo1: {
    width: 350,
    height: 60,
  },
  logo: {
    width: 350,
    height: 200,
    borderRadius: 30,
  },
  detailsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: 35,
    marginBottom: 20,
    marginRight: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#E6A984',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  donateButton: {
    backgroundColor: '#E6A984',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 40,
  },
  totalText: {
    fontSize: 30,
  },
});

export default Donate2;
