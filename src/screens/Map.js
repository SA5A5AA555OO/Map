import React, { useState } from "react";
import {
    View, StyleSheet, Text, Image, ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FjuRef from '../screens/FjuRef';
import Store from '../screens/Store';

const CustomMarker = ({ coordinate, title, icon }) => (
    <Marker coordinate={coordinate} title={title}>
        <View style={{ alignItems: 'center' }}>
            <Image source={icon} style={{ width: 30, height: 30 }} />
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


    const [markerslist, setMarkersList] = useState([
        {
            id: 1,
            latitude: 25.036536324078433,//經度
            longitude: 121.43183548002627,//緯度
            title: '食享冰箱',
            description: '點擊食享冰箱'
        },
        {
            id: 2,
            latitude: 25.042853691197738,//經度
            longitude: 121.44725038057825,//緯度
            title: '素食的店',
            description: '點擊素食的店'
        }
    ])

    const handleButtonPress = (markerId) => {
        if (markerId === 1) {
            navigation.navigate('FjuRef');
            setDestination({ latitude: 25.036536324078433, longitude: 121.43183548002627 });
        } else if (markerId === 2) {
            navigation.navigate('Store');
            setDestination({ latitude: 25.042853691197738, longitude: 121.44725038057825 });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 25.03719676448161,//經度
                    longitude: 121.43248323862977,//緯度
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <CustomMarker coordinate={markerCoordinate} title={markerTitle} icon={customIcon} />
                {
                    markerslist.map((marker) => {
                        return (
                            <Marker //標記地點
                                key={marker.id}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                title={marker.title}
                                description={marker.description}
                                onPress={() => handleButtonPress(marker.id)}
                            />
                        )
                    })
                }
                {origin && destination != undefined ? (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        strokeColor="black"
                        strokeWidth={4}
                        mode="walking"
                        onReady={(result) => {
                            setDistance(result.distance);
                            setDuration(result.duration);
                            
                            console.log(`Distance: ${result.distance} km`);
                            console.log(`Duration: ${result.duration} min`);
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