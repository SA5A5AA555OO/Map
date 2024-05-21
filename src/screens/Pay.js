import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput,Image,TouchableOpacity,Alert  } from 'react-native';

const Pay = () => {
    const route = useRoute();
    const { storeName, count, status, email, total } = route.params;
    
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const formatCardNumber = (number) => {
        return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (date) => {
        return date.replace(/\s?\/?/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').trim();
    };

    const handlePayment = (storeName) => {
        if (cardNumber.length === 19 || expiryDate.length === 5 || cvv.length === 3) {
            Alert.alert('付款成功');
            navigation.navigate('Donate3', { storeName: storeName,status:status,total:total });
        } else {
            Alert.alert('請輸入所有必要信息');
        }
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>交易付款</Text>
        </View>
        
        <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
          
          <Text style={styles.Text}>{storeName}</Text>
          <Text style={styles.moneyText}>
            <Text style={styles.currencyText}>NT$ </Text>
            <Text style={styles.totalText}>{total}</Text>
          </Text>
          
          <Text></Text>
          <View style={styles.cardContainer}>
            <Text style={styles.Text2}>本次可刷卡別</Text>
            <Image 
              source={require('map/asset/card.jpg')}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>卡號         </Text>
              <TextInput
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                keyboardType="numeric"
                maxLength={19}
                value={formatCardNumber(cardNumber)}
                onChangeText={(text) => setCardNumber(text)}
                placeholderTextColor="#AAAAAA"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.inputGroup}>
              <Text style={styles.label}>有效期限</Text>
              <TextInput
                style={styles.input}
                placeholder="有效月份(兩碼) /有效年分(兩碼)"
                keyboardType="numeric"
                maxLength={5}
                value={formatExpiryDate(expiryDate)}
                onChangeText={(text) => setExpiryDate(text)}
                placeholderTextColor="#AAAAAA"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.inputGroup}>
              <Text style={styles.label}>末三碼    </Text>
              <TextInput
                style={styles.input}
                placeholder="信用卡背面末三碼"
                keyboardType="numeric"
                maxLength={3}
                value={cvv}
                onChangeText={(text) => setCvv(text)}
                placeholderTextColor="#AAAAAA"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePayment(storeName)}>
            <Text style={styles.buttonText}>確認付款</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3C3C3C', 
    padding: 20, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white', 
    fontSize: 20, 
  },
  Text2: {
    fontSize: 20,
    color: 'black',
    left:-123,
  },
  Text: {
    fontSize: 25,
    color: 'black',
    alignContent: 'center',
  },
  moneyText: {
    fontSize: 25, 
    color: 'black',
    alignContent: 'center',
    flexDirection: 'row',
  },
  currencyText: {
    fontSize: 20, 
  },
  totalText: {
    fontSize: 30, 
  },
  inputContainer: {
    width: '110%',
    backgroundColor: 'white',
    top:5,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
    
  },
  label: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  input: {
    flex:1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    width: '100%',
    backgroundColor: 'white',
    
  },
  cardContainer: {
    flexDirection: 'row',
  },
  Text2: {
    fontSize: 18,
    color: 'black',
    left: -78,
  },
  cardImage: {
    width: 100,
    height: 30,
    left: -65,
  },
  button: {
    marginTop: 330,
    backgroundColor: '#8E8E8E',
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Pay;
