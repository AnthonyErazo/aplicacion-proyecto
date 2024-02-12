import * as Location from 'expo-location';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { useGetProfileDataQuery, useGetProfileImageQuery, useGetUserLocationQuery } from '../app/services/userService'
import { useEffect, useState } from 'react'
import { deleteAllSession } from '../database'
import Loading from '../components/Loading'
import SubmitButton from '../components/SubmitButton'

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
          console.log(dataLocation)
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

  if (locationLoading || isLoading || isLoadingImg) return <Loading />

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Image
            source={dataImage ? { uri: dataImage.image } : require("../../assets/user.png")}
            style={styles.image}
            resizeMode='cover'
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && <Loading style={styles.loading} />}
        </View>
        <SubmitButton
          text
          title={"Agregar foto"}
          actionButton={() => navigation.navigate("ImageSelector")}
        />
        <SubmitButton
          text
          title={"Agregar Dirección"}
          actionButton={handleAddLocation}
        />
        <Text >{name}</Text>
        <Text >{lastName}</Text>
        <Text >{age}</Text>
        <Text >{email}</Text>
      </View>
      <SubmitButton
        text
        title={"Log out"}
        actionButton={logout}
      />
      <SubmitButton
        text
        title={"Editar"}
        actionButton={() => navigation.navigate("EditProfile")}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  }
})