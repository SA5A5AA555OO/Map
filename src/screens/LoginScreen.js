import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="輸入 email"
                        onChangeText={text => setEmail(text)}
                    />


                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="輸入密碼"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />


                    <Button title="登入" color="#E6A984" />


                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text>尚未擁有帳號?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.link}> 點擊幹註冊</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#FDFBF1"
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        width: "80%",
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#bbb",
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: "#AC5C4A",
    },

});

export default LoginScreen;  