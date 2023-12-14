import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import HomeScreen from './HomeScreen';
import { DataTable } from 'react-native-paper';




const TakePeople = ({navigation}) =>{
   
      return (
        <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>姓名</DataTable.Title>
          <DataTable.Title>電話</DataTable.Title>
          <DataTable.Title numeric>信箱</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>廖老大</DataTable.Cell>
          <DataTable.Cell>0983635462</DataTable.Cell>
          <DataTable.Cell numeric>ruikewang3@gmail.com</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>0912345678</DataTable.Cell>
          <DataTable.Cell numeric>105</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Mei</DataTable.Cell>
          <DataTable.Cell>0935472634</DataTable.Cell>
          <DataTable.Cell numeric>23</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
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
        width: 70,
        height: 70,
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
  
export default TakePeople;