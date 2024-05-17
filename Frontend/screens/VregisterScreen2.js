import React,{useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VregisterScreen2 = (props) => {
  const { P, p2 } = props.route.params; // Destructure P and p2 from route params
  const qrData = `${P},\n ${p2}`;

  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);//multiple cehicles 

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('P', P);
        await AsyncStorage.setItem('p2', p2);

        
        //navigation.navigate('QRcodesScreen1,QRcodesScreen2,QRcodesScreen3');
      } catch (error) {
        console.error('Error storing data:', error);
      }
    };
    storeData();
  }, [P, p2]);


 
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 25 }}>
      <StatusBar style='dark'/>
      <View style={{ flexDirection: 'row', backgroundColor: '#080742', padding: 15, justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
        <Text style={{ color: '#FF6F00', fontSize: 20 }}>HighWay Hub</Text>
        <TouchableOpacity onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: '#FF6F00', width: '100%', height: 50, marginTop: 20, justifyContent: 'center' }}>
          <Text style={{ color: '#002043', fontSize: 18,alignSelf:'center' }}>{P}</Text>
        </View>

      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ marginTop: 100 }}>
          <QRCode
            value={qrData}
            size={250}
            color='#191970'
          />
        </View>
        {/*}
        <View style={{ marginBottom: 2, height: 100, alignItems: 'center' }}>
          <TouchableOpacity
             onPress={() => navigation.navigate('vregister1')}
           
            style={{ backgroundColor: '#191970', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginTop: 60, width: 300 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Add Another Vehicle</Text>
          </TouchableOpacity>
  </View>*/}
       
      </View>
    </View>
  );
};

export default VregisterScreen2;