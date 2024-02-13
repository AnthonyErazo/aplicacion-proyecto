import * as Location from 'expo-location';
import { StyleSheet, View, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { useGetProfileDataQuery, useGetProfileImageQuery, useGetUserLocationQuery } from '../app/services/userService'
import { useEffect, useState } from 'react'
import { deleteAllSession } from '../database'
import Loading from '../components/Loading'
import SubmitButton from '../components/SubmitButton'
import WaveLoading from '../components/WaveLoading';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch()
  const localId = useSelector(state => state.auth.value.localId)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { data: dataImage, isLoading: isLoadingImg } = useGetProfileImageQuery(localId)
  const { data, isSuccess, isLoading } = useGetProfileDataQuery(localId)
  const { data: dataLocation, isLoading: locationLoading } = useGetUserLocationQuery(localId)

  useEffect(() => {
    if (isSuccess && data) {
      setName(data.name)
      setLastName(data.lastName)
      setEmail(data.email)
      setAge(calculateAge(data.birthday))
    }
  }, [isSuccess, data])

  const logout = () => {
    dispatch(clearUser())
    deleteAllSession()
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  const handleAddLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync({});
      if (status === 'granted') {
        if (dataLocation) {
          navigation.navigate('LocationSelector', dataLocation);
        } else {
          let { coords } = await Location.getCurrentPositionAsync({});
          navigation.navigate('LocationSelector', coords);
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (locationLoading || isLoading || isLoadingImg) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={dataImage ? { uri: dataImage.image } : require("../../assets/user.png")}
          style={styles.image}
          resizeMode='cover'
          onLoad={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && <View style={StyleSheet.absoluteFill}>
          <Loading circular />
        </View>}
      </View>

      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.infoText}>{name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.infoText}>{lastName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.infoText}>{age}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
      </View>
      <SubmitButton
        text
        title={"Agregar foto"}
        buttonStyle={styles.buttonChange}
        textStyle={styles.textButtonChange}
        actionButton={() => navigation.navigate("ImageSelector")}
      />
      <SubmitButton
        text
        title={"Agregar Dirección"}
        buttonStyle={styles.buttonChange}
        textStyle={styles.textButtonChange}
        actionButton={handleAddLocation}
      />
      <View style={styles.buttonsContainer}>
        <SubmitButton
          text
          title={"Editar"}
          buttonStyle={styles.buttonAction}
          actionButton={() => navigation.navigate("EditProfile")}
        />
        <SubmitButton
          text
          title={"Log out"}
          buttonStyle={styles.buttonAction}
          actionButton={logout}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'left',
  },
  buttonChange:{
    borderColor: '#2856A2',
    borderWidth: 2,
    width:200
  },
  textButtonChange:{
    color:'#4C7BC8',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop:10
  },
  buttonAction:{
    backgroundColor:'#4C7BC8',
    width:100
  }
});