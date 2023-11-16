import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
}from 'react-native';

const Map = ({navigation}) =>{
   
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={styles.logo}
             source={require('map/asset/googlemap.jpg')}/>
             <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>我的最愛</Text>
             <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>訂單紀錄</Text>
             <Text style={[styles.leftText, { alignSelf: 'flex-start' }]}>修改個人資訊</Text>
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
    width: 400,
    height: 800,
    borderRadius: 30,
      
    },
  leftText :{
      fontSize: 25,
      left:20,
  },
  detail:{
      fontSize: 20,
      left:20
  },
  link:{
      color:'#DA7746',
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

export default Map;