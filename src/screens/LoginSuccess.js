import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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



const Take3 = ({ navigation }) => {
  const route = useRoute();
  const { status,email } = route.params;
  const [userData, setUserData] = useState(null); // State to store user data

  // Effect to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // console.log("(LoginSuccess)fetchUserData")
        const usersCollection = collection(db, 'user');
        const q = query(usersCollection, where('status', '==', status)); // Adjust the query as per your requirements
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        } else {
          console.log('No user found with the provided status');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [status]); // Fetch user data when status changes

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>登入成功</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Me', { email: email, status: status });
        navigation.navigate('Home', { email: email, status: status });
      }}>
        <Text style={styles.link}>繼續</Text>
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
  leftText: {
    fontSize: 30,
    left: 20,
  },
  detail: {
    fontSize: 20,
    left: 20
  },
  link: {
    color: '#DA7746',
    fontSize: 25
  },




  buttonContainer: {
    backgroundColor: '#FCF3EC', // 自定义背景颜色
    padding: 100,
    borderRadius: 35, // 圆角效果
    marginVertical: 100, // 设置垂直间距
    width: '70%',
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
    height: 60,
  },
});

export default Take3;