// BottomMenu.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomMenu({ route }) {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50, backgroundColor: 'lightgray' }}>
      <TouchableOpacity onPress={navigateToHome}>
        <Text>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSearch}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      {/* Agrega más opciones de menú según sea necesario */}
    </View>
  );
}
