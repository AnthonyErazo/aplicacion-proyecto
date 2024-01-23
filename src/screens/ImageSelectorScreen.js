import { useEffect, useState } from 'react'
import { StyleSheet, Image, View,Pressable,Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { usePostProfileImageMutation,useGetProfileImageQuery } from '../app/services/userService'
import { useSelector } from 'react-redux'


export default function ImageSelectorScreen({ navigation }) {

    const [image, setImage] = useState("")
    const [triggerProfileImage] = usePostProfileImageMutation()
    const localId = useSelector(state => state.auth.value.localId)
    const { data, isSuccess } = useGetProfileImageQuery(localId)
    console.log(data.image)

    useEffect(() => {
        if (isSuccess && data) setImage(data.image)
    }, [isSuccess])

    const pickImage = async () => {

        const { granted } = await ImagePicker.requestCameraPermissionsAsync()

        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.3,
                base64: true
            })

            if (!result.canceled) {
                setImage('data:image/jpeg;base64,' + result.assets[0].base64)
            }
        }

    }
    const confirmImage = () => {
        triggerProfileImage({ localId, image })
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : require("../../assets/user.png")}
                style={styles.image}
                resizeMode='cover'
            />
            <Pressable onPress={pickImage}>
                <Text>Tomar foto</Text>
            </Pressable>
            <Pressable onPress={confirmImage}>
                <Text>Confirm photo</Text>
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