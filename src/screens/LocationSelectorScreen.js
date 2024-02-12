import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { googleApi } from '../firebase/googleApi';
import { useSelector } from 'react-redux';
import { usePostUserLocationMutation } from '../app/services/userService';
import SubmitButton from '../components/SubmitButton';
import Loading from '../components/Loading';

export default function LocationSelectorScreen({ navigation, route }) {
  const { latitude, longitude, address:userAddress } = route.params;
  const localId = useSelector((state) => state.auth.value.localId);

  const [location, setLocation] = useState({ latitude, longitude });
  const [address, setAddress] = useState(userAddress);
  const [triggerPostUserLocation] = usePostUserLocationMutation();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleApi}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoading(false)
      }
    })();
  }, [location]);

  const handleMapPress = (event) => {
    const { latitude: latitudeEvent, longitude: longitudeEvent } = event.nativeEvent.coordinate;
    setLocation({ latitude:latitudeEvent, longitude:longitudeEvent });
  };
  

  const onConfirmAddress = async () => {
    try {
      const locationFormatted = {
        address,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      await triggerPostUserLocation({ localId, locationFormatted });
      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };
  if(loading) return <Loading />

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{address}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} />
      </MapView>
      <SubmitButton
      text
      title={"Cancelar"} 
      actionButton={()=>navigation.goBack()}
      />
      <SubmitButton
      text
      title={"Confirmar Ubicación"} 
      actionButton={onConfirmAddress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
