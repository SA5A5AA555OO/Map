import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import Navigation from '../Components/Navigation';
import Store from '../screens/Store';




const Meal = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('Store');
      };
      return (
        <View style={styles.container}>
           <ScrollView >
            <Text style={styles.headerText}>待用餐據點</Text>
            <Text ></Text>
            <Image
              style={styles.logo}
               source={require('map/asset/素食的店.jpg')}/>
           
           <TouchableOpacity onPress={handleButtonPress} style={{ alignSelf: 'flex-start' }}>
           <Text style={styles.leftText}>素食的店</Text>
           </TouchableOpacity>


            
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日提供份數:10</Text>
               <Text style={styles.detail}>地址:新北市新莊區泰順街</Text>
               <Text style={styles.detail}>電話:0932921110</Text>
               <Text style={styles.detail}>請讓給有需要人士領取</Text>
            </View>
            <Text></Text>
            <Image
              style={styles.logo}
               source={require('map/asset/歐姆先生.jpg')}/>
            <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>歐姆先生</Text>
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日提供份數:5</Text>
               <Text style={styles.detail}>地址:台北市中正區中華路二段315巷18號</Text>
               <Text style={styles.detail}>電話:0912345678</Text>
               
            </View>
            </ScrollView>
            </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      paddingTop:20,
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 350,
        height: 200,
        borderRadius: 30,
      },
    leftText :{
        fontSize: 30,
        left:20,
        color:'#DA7746',
    },
    detail:{
        fontSize: 20,
        left:20
    },

    

    
    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 20, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'80%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default Meal;