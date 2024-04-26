import React, { useState, useEffect } from "react";
import {
    View, StyleSheet, Text, Image, ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore/lite';
import Geocoder from 'react-native-geocoding';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import FjuRef from '../screens/FjuRef';
import Store from '../screens/Store';

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
Geocoder.init("AIzaSyBARwrOhviGWEHN94EDPR0Ojy - YftRlljA");

const CustomMarker = ({ coordinate, title,  }) => (
    <Marker coordinate={coordinate} title={title} pinColor="skyblue">
        <View style={{ alignItems: 'center' }}>
            
        </View>
    </Marker>
);

const Map = ({ navigation }) => {
    const markerCoordinate = { latitude: 25.0335130275009, longitude: 121.43384983277525 };
    const markerTitle = '您的位置';
    const customIcon = require('map/asset/location.png'); //您的位置 圖片

    const [origin, setOrigin] = useState({ latitude: 25.0335130275009, longitude: 121.43384983277525 });
    const [destination, setDestination] = useState(null);

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const route = useRoute();
    const { status, email } = route.params || { status: 0 };

    const [store, setStore] = useState([]);

    useEffect(() => {
        console.log(`(map)52 useEffect  status:${status}   email:${email}`)
        const fetchStoreData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'store'));
                const storeData = querySnapshot.docs.map(async doc => {
                    const data = doc.data();
                    // 使用 Geocoder 將地址轉換為經度和緯度
                    const response = await Geocoder.from(data.store_address);
                    const { lat, lng } = response.results[0].geometry.location;
                    return {
                        ...data,
                        latitude: lat,
                        longitude: lng
                    };
                });
                // 等待所有數據轉換完成
                const resolvedStoreData = await Promise.all(storeData);
                setStore(resolvedStoreData);
            } catch (error) {
                console.error('Error fetching store data:', error);
            }
        };
    
        fetchStoreData();
    }, [db]);
    

    const [markerslist, setMarkersList] = useState([
        {
            id: 1,
            latitude: 25.036536324078433,//經度
            longitude: 121.43183548002627,//緯度
            title: '食享冰箱',
            description: '點擊食享冰箱'
        },
    ])

    const handleButtonPressFridge = (markerId) => {
        if (markerId === 1) {
            navigation.navigate('FjuRef');
            setDestination({ latitude: 25.036536324078433, longitude: 121.43183548002627 });
        }
    };

    const handleButtonPress1 = () => {
        navigation.navigate('FjuRef');
    };

    // 點擊店鋪標記時的處理函數
    const handleButtonPress = (storeName) => {
        // 在 store 數據中查找選定的店鋪
        const selectedStore = store.find(store => store.store_name === storeName);
        // 如果找到了選定的店鋪，設置目的地
        if (selectedStore) {
            setDestination({ latitude: selectedStore.latitude, longitude: selectedStore.longitude });
        }
        // 導航到 Store 畫面並傳遞 storeName 參數
        navigation.navigate('Store', { storeName: storeName, email: email, status: status });
    };




    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 25.03719676448161,
                    longitude: 121.43248323862977,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <CustomMarker coordinate={markerCoordinate} title={markerTitle} icon={customIcon} />
                {
                    markerslist.map((marker) => {
                        return (
                            <Marker //標記地點
                                key={marker.id}
                                // pinColor="skyblue"
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                title={marker.title}
                                description={`距離: ${parseFloat(distance).toFixed(1)} km 走路時間: ${Math.round(duration)} 分鐘`}
                                onPress={() => handleButtonPressFridge(marker.id)}
                            />
                        )
                    })
                }
                {store.map((store) => (
                    <Marker
                        key={store.store_name}
                        coordinate={{
                            latitude: parseFloat(store.latitude),
                            longitude: parseFloat(store.longitude)
                        }}
                        title={store.store_name}
                        description={`距離: ${parseFloat(distance).toFixed(1)} km 走路時間: ${Math.round(duration)} 分鐘`}
                        onPress={() => handleButtonPress(store.store_name)}
                    >
                    </Marker>


                ))}

                {origin && destination != undefined ? (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        strokeColor="black"
                        strokeWidth={4}
                        mode="WALKING"
                        onReady={(result) => {
                            // 計算距離和時間
                            const roundedDistance = parseFloat(result.distance).toFixed(1);
                            const roundedDuration = Math.round(result.duration);

                            // 更新距離和時間狀態
                            setDistance(roundedDistance);
                            setDuration(roundedDuration);

                            console.log(`roundedDistance: ${roundedDistance} km`);
                            console.log(`roundedDuration: ${roundedDuration} min`);

                            console.log(`Distance: ${distance} km`);
                            console.log(`Duration: ${duration} min`);
                        }}
                        apikey="AIzaSyBARwrOhviGWEHN94EDPR0Ojy - YftRlljA"
                    />
                ) : null}
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
        left: 20
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
        width: '80%'
    },
    buttonText: {
        color: 'white', // 文本颜色
        fontWeight: 'bold',
        textAlign: 'center', // 文本居中

    },
});

export default Map; 