import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { useGetProfileDataQuery, useGetProfileImageQuery } from '../app/services/userService'
import { useEffect, useState } from 'react'
import { deleteAllSession, fechSession } from '../database'
import Loading from '../components/Loading'

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  // const [localId, setLocalId]=useState('')
  const localId = useSelector(state => state.auth.value.localId)
  const { data: dataImage, isLoading: isLoadingImg } = useGetProfileImageQuery(localId)
  const { data, isSuccess, isLoading } = useGetProfileDataQuery(localId)
  console.log(dataImage)
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

  // if (isLoadingImg || isLoading) return <Loading />

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={dataImage ? { uri: dataImage.image } : require("../../assets/user.png")}
          style={styles.image}
          resizeMode='cover'
        />
        <Pressable onPress={() => navigation.navigate("ImageSelector")}>
          <Text >Agregar foto</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("LocationSelector")}>
          <Text >Agregar Direccion</Text>
        </Pressable>
        <Text >{name}</Text>
        <Text >{lastName}</Text>
        <Text >{age}</Text>
        <Text >{email}</Text>
      </View>
      <Pressable onPress={logout}>
        <Text>Log out</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ImageSelector")}>
        <Text>Editar</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  }
})