import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

export default function QRcodesScreen1() {
  const navigation = useNavigation();
  const [P, setP] = useState('');
  const [p2, setP2] = useState('');
  const [Entrance, setEntrance] = useState('');
  const [Exit, setExit] = useState('');
  const [ticketAmount, setTicketAmount] = useState(null);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const storedP = await AsyncStorage.getItem('P');
        const storedP2 = await AsyncStorage.getItem('p2');
        if (storedP !== null && storedP2 !== null) {
          setP(storedP);
          setP2(storedP2);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getData();
  }, []);

  
  {/*useEffect(() => {
    const fetchEntrance = async () => {
      try {
        const storedEntrance = await AsyncStorage.getItem('Entrance');
        setEntrance(storedEntrance || '');
  
        // Set a timeout to remove the entrance gate after 3 minutes
        const clearEntranceTimeout = setTimeout(async () => {
          await AsyncStorage.removeItem('Entrance');
          setEntrance('');
        }, 240000); // 3 minutes in milliseconds
  
        return () => clearTimeout(clearEntranceTimeout); // Cleanup function to clear the timeout
      } catch (error) {
        console.error('Error fetching entrance:', error);
      }
    };
    fetchEntrance();
  }, []);*/}


  const fetchEntranceFromBackend = async () => {
    try {
      const response = await axios.post('http:/192.168.43.116:8070/vehicle/get-entrance', { Vehicle_number: P });
      if (response.data.isValid) {
        const fetchedEntrance = response.data.entrance;
        setEntrance(fetchedEntrance);
        await AsyncStorage.setItem('Entrance', fetchedEntrance);
      } else {
        // Handle case when vehicle number is not found
        alert('Vehicle Not Found', 'The vehicle number is not registered.');
      }
    } catch (error) {
      //console.error('Error fetching entrance from backend:', error);
      // Handle other errors
      alert('You journey not started', 'An error occurred while fetching entrance from backend.');
    }
  };

  useEffect(() => {
    if (P) {
      fetchEntranceFromBackend();
    }
  }, [P]);

  const checkEntranceInDatabase = async () => {
    try {
      const response = await axios.post('http:/192.168.43.116:8070/vehicle/get-entrance', { Vehicle_number: P });
      if (response.data.isValid) {
        const fetchedEntrance = response.data.entrance;
        setEntrance(fetchedEntrance);
        await AsyncStorage.setItem('Entrance', fetchedEntrance);
      }
    } catch (error) {
      console.error('Error checking entrance in database:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkEntranceInDatabase, 60000); // Check every minute
    return () => clearInterval(interval); // Clean up interval
  }, []);

  {/*
  useEffect(() => {
    const fetchExit = async () => {
      try {
        const storedExit = await AsyncStorage.getItem('Exit');
        setExit(storedExit || '');
  
        // Set a timeout to remove the exit gate after 3 minutes
        const clearExitTimeout = setTimeout(async () => {
          await AsyncStorage.removeItem('Exit');
          setExit('');
        }, 240000); // 3 minutes in milliseconds
  
        return () => clearTimeout(clearExitTimeout); // Cleanup function to clear the timeout
      } catch (error) {
        console.error('Error fetching exit:', error);
      }
    };
    fetchExit();
  }, []);*/}

  const fetchExitFromBackend = async () => {
    try {
      const response = await axios.post('http:/192.168.43.116:8070/vehicle/get-exit', { Vehicle_number: P });
      if (response.data.isValid) {
        const fetchedExit = response.data.exit;
        setExit(fetchedExit);
        await AsyncStorage.setItem('Exit', fetchedExit);
      } else {
        // Handle case when vehicle number is not found
        alert('Vehicle Not Found', 'The vehicle number is not registered.');
      }
    } catch (error) {
      //console.error('Error fetching exit from backend:', error);
      // Handle other errors
      alert('Welcome to highway jouney! have a safe journey', 'An error occurred while fetching exit from backend.');
    }
  };
  
  useEffect(() => {
    if (P) {
      fetchExitFromBackend();
    }
  }, [P]);
  
  const checkExitInDatabase = async () => {
    try {
      const response = await axios.post('http:/192.168.43.116:8070/vehicle/get-exit', { Vehicle_number: P });
      if (response.data.isValid) {
        const fetchedExit = response.data.exit;
        setExit(fetchedExit);
        await AsyncStorage.setItem('Exit', fetchedExit);
      }
    } catch (error) {
      console.error('Error checking exit in database:', error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(checkExitInDatabase, 60000); // Check every minute
    return () => clearInterval(interval); // Clean up interval
  }, []);
  




  useEffect(() => {
    const checkTicketValidity = async () => {
      try {
        const response = await axios.post('http:/192.168.43.116:8070/ticket/check-ticket', { Entrance, Exit });
        const { isValid, amount } = response.data;
        if (isValid) {
          setTicketAmount(amount);
          await AsyncStorage.setItem('ticketAmount', amount.toString());
        } else {
          // Show error message if ticket is not valid
          alert('Invalid Ticket', 'Please check your entrance and exit points.');
        }
      } catch (error) {
        console.error('Error checking ticket validity:', error);
        // Show error message if there's an error with the request
       alert('error', 'An error occurred while checking ticket validity.');
      }
    };

    if (Entrance && Exit) {
      checkTicketValidity();
    }
  }, [Entrance, Exit]); // Run effect when Entrance or Exit changes

  

  const qrData = `${P ? P.trim() : ''}, ${p2 ? p2.trim() : ''}, ${Entrance ? Entrance.trim() : ''}`;


  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 25 }}>
      <StatusBar style='dark' />
      <View style={{ flexDirection: 'row', backgroundColor: '#080742', padding: 15, justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
        <Text style={{ color: '#FF6F00', fontSize: 20 }}>HighWay Hub</Text>
        <TouchableOpacity onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>

      <View className="w-full p-1 mt-5 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
        <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Your QR code</Text>
      </View>

      <View style={{ marginTop: 70, alignItems: 'center' }}>
        <QRCode
          value={qrData}
          size={200}
          color='#080742'
        />
      </View>

      <Animated.Text style={{ color: '#080742',fontSize: 18, paddingTop: 80 ,alignSelf:'center'}}>Entrance: {Entrance}</Animated.Text>
      <Animated.Text style={{ color: '#080742',  fontSize: 18, paddingTop: 10 ,alignSelf:'center'}}>Exit: {Exit}</Animated.Text>


      {ticketAmount !== null && (

      <TouchableOpacity style={{alignSelf:'center'}} onPress={()=> navigation.push('PaymentAmount')}>
        <View style={{backgroundColor: '#080742',marginTop:40,borderRadius:60,alignItems:'center',height:40,width:300}}>
          <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Pay RS.{ticketAmount}</Text>
        </View>
      </TouchableOpacity>
      )}
    </View>
  );
  
}

