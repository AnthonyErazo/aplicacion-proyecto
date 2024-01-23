import { StyleSheet, View, Text, Pressable,Image } from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { useGetProfileDataQuery, useGetProfileImageQuery } from '../app/services/userService'
import { useEffect, useState } from 'react'

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch()
  const [name,setName]=useState('')
  const [lastName,setLastName]=useState('')
  const [age,setAge]=useState('')
  const [email,setEmail]=useState('')
  const localId = useSelector(state => state.auth.value.localId)
  // const { data } = useGetUserByIdQuery(localId)
  const { data:dataImage } = useGetProfileImageQuery(localId)
  const { data,isSuccess } = useGetProfileDataQuery(localId)
  useEffect(() => {
    if (isSuccess && data) {
      setName(data.dataProfile.name)
      setLastName(data.dataProfile.lastName)
      setEmail(data.dataProfile.email)
      setAge(data.dataProfile.age)
    }
}, [isSuccess,data])

  const logout = () => {
    dispatch(clearUser())
  }

  return (
    <View>
      <View style={styles.container}>
      <Image
            source={dataImage ? {uri:dataImage.image} : require("../../assets/user.png")}
            style={styles.image}
            resizeMode='cover'
        />
        <Pressable onPress={() => navigation.navigate("ImageSelector")}>
          <Text >Agregar foto</Text>
        </Pressable>
          <Text >{name}</Text>
          <Text >{lastName}</Text>
          <Text >{age}</Text>
          <Text >{email}</Text>
      </View>
      <Pressable onPress={logout}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  image:{
    width:200,
    height:200
}
})