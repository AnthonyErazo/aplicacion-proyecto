import { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Pressable, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { usePostProfileImageMutation, useGetProfileImageQuery } from '../app/services/userService'
import { useSelector } from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import Loading from '../components/Loading'


export default function ImageSelectorScreen({ navigation }) {

    const localId = useSelector(state => state.auth.value.localId)
    const [image, setImage] = useState("")
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [triggerProfileImage] = usePostProfileImageMutation()
    const { data, isSuccess, isLoading } = useGetProfileImageQuery(localId)

    useEffect(() => {
        if (isSuccess && data) setImage(data.image)
    }, [isSuccess])

    const pickImageFromCamera = async () => {
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

    const pickImageFromGallery = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
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

    if (isLoading) return <Loading />

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={image ? { uri: image } : require("../../assets/user.png")}
                    style={styles.image}
                    resizeMode='cover'
                    onLoad={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && <Loading style={styles.loading} />}
            </View>
            <SubmitButton
                text
                title={"Cancelar"}
                actionButton={() => navigation.goBack()}
            />
            <SubmitButton
                text
                title={"Tomar foto"}
                actionButton={pickImageFromCamera}
            />
            <SubmitButton
                text
                title={"Seleccionar de la galería"}
                actionButton={pickImageFromGallery}
            />
            <SubmitButton
                text
                title={"Confirm photo"}
                actionButton={confirmImage}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    loading: {
        position: 'absolute',
        width:'100%',
        height:'100%',
        zIndex:100,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});
