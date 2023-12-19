import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image,ScrollView} from 'react-native';
import HomeScreen from './HomeScreen';




const Favorite = ({navigation}) =>{
  const handleButtonPress = () => {
    navigation.navigate('FjuRef');
  };
      return (
        <View style={styles.container}>
           <ScrollView >
            
            <View style={styles.row}>
              <TextInput
                style={styles.input} 
                placeholder ="輸入店家名稱"
                />
                <Text></Text>
                   <Image
                    style={styles.logo2}
                    source={require('map/asset/search.png')}/>

           
             </View>
        
                <Text style={styles.headerText}> 已儲存的店家</Text>
                <Text></Text>
            <Image
              style={styles.logo}
               source={require('map/asset/ref.jpg')}/>
           
           <TouchableOpacity onPress={handleButtonPress} style={{ alignSelf: 'flex-start' }}>
           <Text style={styles.leftText}>輔仁大學食享冰箱</Text>
           </TouchableOpacity>


            
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日開放領取時間:   1:30</Text>
               <Text style={styles.detail}>地址:新北市新莊區中正路510號</Text>
               <Text style={styles.detail}>電話:02-2905-2000</Text>
               <Text style={styles.detail}>僅供輔大師生教職員領取</Text>
            </View>
            <Text></Text>
            <Image
              style={styles.logo}
               source={require('map/asset/airport.jpeg')}/>
            <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>南機場樂活園地</Text>
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日開放領取時間:</Text>
               <Text style={styles.detail}>地址:台北市中正區中華路二段315巷18號</Text>
               <Text style={styles.detail}>電話:02-2303-6281</Text>
               <Text></Text>
               <Text></Text>
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
      fontSize: 30,
    },
  logo: {
      width: 350,
      height: 200,
      borderRadius: 30,
    },
    logo2: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginBottom: 20,
      
    },
  leftText :{
      fontSize: 30,
      left:10,
      color:'#DA7746', 
  },
  detail:{
      fontSize: 18,
      left:10
  },
  input:{
    marginBottom:12,
    borderWidth:1,
    borderColor:'#bbb',
    borderRadius:15,
    paddingHorizontal:14,
    backgroundColor: 'white',
    height: 45,
    width:'70%',
    
},
row:{
  flexDirection: 'row',
  paddingLeft:70
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
  
export default Favorite;