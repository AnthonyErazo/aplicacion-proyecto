import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { googleApi } from '../firebase/googleApi'
import { useSelector } from 'react-redux'
import { usePostUserLocationMutation } from '../app/services/userService'

export default function LocationSelectorScreen ({navigation}) {

    const localId = useSelector(state => state.auth.value.localId)
    const [location,setLocation] = useState({latitude:"",longitude:""})
    const [address,setAddress] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [triggerPostUserLocation] = usePostUserLocationMutation()

    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}
    &zoom=15
    &size=700x300
    &maptype=roadmap
    &markers=color:blue%7Clabel:D%7C${location.latitude},${location.longitude}
    &key=${googleApi}`


    useEffect(()=>{
        (async ()=>{
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log('status: ')
            console.log(status)
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
              }
              let location = await Location.getCurrentPositionAsync({}) 
              setLocation({
                latitude:location.coords.latitude,
                longitude:location.coords.longitude
            })
            
            
        })()
    },[])

    useEffect(()=>{
      (async ()=>{
        try {
          if(location.latitude){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleApi}`)

            const data = await response.json()
            setAddress(data.results[0].formatted_address)
          }
      
        } catch (error) {
          setErrorMsg(error.message)
        }
      })()
    },[location])

    const onConfirmAddress = async () => {
      try {
        const locationFormatted = {
          address,
          ...location
        }
        const data =  await triggerPostUserLocation({localId,locationFormatted})
        console.log(data)
        navigation.goBack()
      } catch (error) {
        setErrorMsg(error.message)
      }

    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{address} </Text>
      <Image source={location.latitude ? {uri:mapPreviewUrl} : require("../../assets/user.png")} style={styles.image}/>
      <Pressable style={styles.container} onPress={onConfirmAddress}>
        <Text style={styles.text}>Confirmar Localizacion</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        marginTop:40,
        gap:20
    },
    text:{
        fontSize:16
    }
})