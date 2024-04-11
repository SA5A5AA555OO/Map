import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';



const DonatePeople = ({navigation}) =>{
  const route = useRoute();
  const { username } = route.params || { username: '用戶' };

      return (
        <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>姓名</DataTable.Title>
          <DataTable.Title>電話</DataTable.Title>
          <DataTable.Title numeric>捐贈數量</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>謝暈眩</DataTable.Cell>
          <DataTable.Cell>0983279525</DataTable.Cell>
          <DataTable.Cell numeric>1</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>汪殊榮</DataTable.Cell>
          <DataTable.Cell>0912345623</DataTable.Cell>
          <DataTable.Cell numeric>10</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>王家碰</DataTable.Cell>
          <DataTable.Cell>0983425334</DataTable.Cell>
          <DataTable.Cell numeric>5</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
      <Text>{username}</Text>
    </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#FDFBF1',
    },
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        
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
  
export default DonatePeople;