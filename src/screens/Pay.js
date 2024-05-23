import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyBARwrOhviGWEHN94EDPR0Ojy-YftRlljA",
    authDomain: "sa5a5aa555oo.firebaseapp.com",
    databaseURL: "https://sa5a5aa555oo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sa5a5aa555oo",
    storageBucket: "sa5a5aa555oo.appspot.com",
    messagingSenderId: "602378113582",
    appId: "1:602378113582:web:c6b308cc039586506ec5bf",
    measurementId: "G-NS22NW5C8F"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Pay = ({ navigation }) => {
    const route = useRoute();
    const { storeName, count, status, email, total, name,phone,dateTime} = route.params;

    
    const [userData, setUserData] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const formatCardNumber = (number) => {
        return number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const handleCardNumberChange = (text) => {
        const formattedText = formatCardNumber(text);
        if (formattedText.length <= 19) {
            setCardNumber(formattedText);
        }
    };

    const formatExpiryDate = (date) => {
        return date.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').trim();
    };

    const handleExpiryDateChange = (text) => {
        const formattedText = formatExpiryDate(text);
        if (formattedText.length <= 5) {
            setExpiryDate(formattedText);
        }
    };

    const handlePayment = async (storeName) => {
        try {
            const formattedCardNumber = formatCardNumber(cardNumber);
            const formattedExpiryDate = formatExpiryDate(expiryDate);
            const currentDate = new Date().toISOString().split('T')[0];
            console.log('Formatted Card Number:', formattedCardNumber);
            console.log('Formatted Expiry Date:', formattedExpiryDate);
            console.log('CVV:', cvv);

            if (formattedCardNumber.length === 19 && formattedExpiryDate.length === 5 && cvv.length === 3) {
                Alert.alert('付款成功');
                const docRef = await addDoc(collection(db, 'donate'), {
                    storeName: storeName,
                    name: name,
                    phone: phone,
                    email: email,
                    count: count,
                    dateTime: dateTime,
                    date: currentDate,
                    pay: true,
                });
                console.log('Document written with ID: ', docRef.id);
                navigation.navigate('Donate3', { storeName: storeName, status: status, total: total });
            } else {
                Alert.alert('請輸入所有必要信息');
            }
        } catch (error) {
            Alert.alert('发生错误', '請稍後再試');
            console.error(error); // 或者在控制台输出错误信息以便调试
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
                            onChangeText={handleCardNumberChange}
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
                            onChangeText={handleExpiryDateChange}
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
                <TouchableOpacity style={styles.button} onPress={() => handlePayment(storeName)}>
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
        left: -123,
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
        top: 5,
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
        flex: 1,
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