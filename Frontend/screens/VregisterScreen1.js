import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';





const VregisterScreen1 = () => {
  const [register_no, setRegisterNo] = useState('');
  const [sv, setSv] = useState('');
  const navigation = useNavigation();
 

  // Backend connecting
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Ensure both register_no and sv are not empty
      if (!register_no || !sv) {
        setError('Please fill in all the fields.');
        return;
      }

      
      // Generate QR code data
      const qrCodeData = `Register Number: ${register_no}, Type: ${sv}`;
      

      // Set vehicleInfo values
      const vehicleInfo = {
        Vehicle_number: register_no,
        Type: sv
      };

      const response = await axios.post('http:/192.168.43.116:8070/vehicle/addVehicle', vehicleInfo);
      setMessage('Register successful!');
      setTimeout(() => {
      navigation.push('VregisterScreen2', { P: register_no, p2: sv });
      }, 2000);
    } catch (error) {
      setMessage('Error in Registration. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='dark'/>
      <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{marginTop:20}}>
        <Icon name="arrow-left" size={18} color="#ffff" className="pt-1" onPress={()=> navigation.push('Home')}/>
        <Text className="text-orange-400 text-center font-bold text-xl">  HighWay Hub</Text>
        <Image source={require('../assets/images/profile.jpg')} className="w-6 h-6 rounded-3xl"/>
      </View>

      <View style={{ backgroundColor: '#FF9100', padding: 2, marginTop: 100 }}>
        <Text style={{ color: '#002366', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Vehicle Registration</Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 60 }}>
        <Icon name='car' size={150} color={'#191970'} />
      </View>

      <View style={{ backgroundColor: '#C0C0C0', padding: 10, borderRadius: 20, alignSelf: 'center', marginTop: 40, width: 300 }}>
        <TextInput placeholder='Register Number' placeholderTextColor={'gray'} onChangeText={setRegisterNo} />
      </View>

      <View style={{ backgroundColor: '#C0C0C0', padding: 10, borderRadius: 20, alignSelf: 'center', width: 300, marginTop: 30 }}>
        <Picker
          selectedValue={sv}
          onValueChange={(itemValue, itemIndex) => setSv(itemValue)}
          style={{ height: 50, width: 250, alignSelf:'center', marginTop:5 }}>
        
          <Picker.Item label="Select Type" value="" color='#002043' />
          <Picker.Item label="Type 1" value="type 1" color='#002043' />
          <Picker.Item label="Type 2" value="type 2" color='#002043' />
          <Picker.Item label="Type 3" value="type 3" color='#002043' />
        </Picker>
      </View>

      <View style={{ marginBottom: 2, height: 100, alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSubmit } style={{ backgroundColor: '#191970', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginTop: 50, width: 300 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Register</Text>
        </TouchableOpacity>
      </View>
      
      </View>


   
  );
};

export default VregisterScreen1;
