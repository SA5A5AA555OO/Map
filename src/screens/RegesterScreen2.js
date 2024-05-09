import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Alert, Image, PermissionsAndroid } from 'react-native';
import RegisterScreenButton from '../screens/RegesterScreenButton'
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { firebase } from "@react-native-firebase/firestore";

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
const auth = getAuth(app); // 使用 getAuth 獲取 Firebase 身份驗證物件

const RegesterScreen2 = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    
      
    // const requestStoragePermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: '存儲權限',
    //           message: '應用程式需要訪問您的存儲空間以保存照片。',
    //           buttonNeutral: '稍後再詢問',
    //           buttonNegative: '拒絕',
    //           buttonPositive: '允許',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('存儲權限已獲取');
    //       } else {
    //         console.log('存儲權限被拒絕');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   };

    // const handleChoosePhoto = () => {
    //     const options = {
    //         title: '選擇圖片',
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     ImagePicker.showImagePicker(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             // 更新選取的圖片
    //             setImage(response.uri);
    //         }
    //     });
    // };

    // const openImagePicker = () => {
    //     const options = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //     };

    //     launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('Image picker error: ', response.error);
    //         } else {
    //             let imageUri = response.uri || response.assets?.[0]?.uri;
    //             setSelectedImage(imageUri);
    //         }
    //     });
    // };

    const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
    }

    const handleRegister = async () => {
        try {
            if (password == passwordConfirm) {
                // 使用 Firebase 身份驗證進行註冊
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 發送驗證郵件
                await sendEmailVerification(user);

                // 顯示註冊成功提示訊息
                // Alert.alert('註冊成功', '請檢查您的電子郵件收件箱以完成驗證。');
                navigation.navigate('Regester3', { email, password, phone, name, address });
            }
            else { Alert.alert('密碼輸入不一致'); }
        } catch (error) {
            // 顯示註冊失敗的錯誤訊息
            Alert.alert('註冊失敗', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Image style={styles.logo1} source={require('map/asset/register1.jpg')} />
            <View style={styles.wrapper}>
                {/* 選取照片按鈕 */}
                {/* <TouchableOpacity onPress={requestStoragePermission} style={styles.button}>
                    <Text style={styles.buttonText}>要求存取照片權限</Text>
                </TouchableOpacity> */}
                {/* 顯示選取的圖片 */}
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Text></Text>
                <Button title="選照片" onPress={choosePhotoFromLibrary} />
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="店家名稱"
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    value={phone}
                    placeholder="電話"
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    value={address}
                    placeholder="地址"
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="信箱"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="密碼"
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    value={passwordConfirm}
                    placeholder="再次輸入密碼"
                    onChangeText={setPasswordConfirm}
                />
                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>繼續</Text>
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
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',

    },
    logo1: {
        width: 300,
        height: 70,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E6A984', // 自定义按钮颜色
        padding: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white', // 按钮文本颜色
        fontWeight: 'bold',
        textAlign: 'center',
    },

    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 20,
        paddingHorizontal: 14,
        backgroundColor: 'white',
        height: 60,
    },
    link: {
        color: '#DA7746',
    }

});

export default RegesterScreen2; 