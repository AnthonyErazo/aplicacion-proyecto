import { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Pressable, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { usePostProfileImageMutation, useGetProfileImageQuery } from '../app/services/userService'
import { useSelector } from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import Loading from '../components/Loading'
import WaveLoading from '../components/WaveLoading'


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

    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={image ? { uri: image } : require("../../assets/user.png")}
                    style={styles.image}
                    resizeMode='cover'
                    onLoad={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && <View style={StyleSheet.absoluteFill}>
                    <Loading circular />
                </View>}
            </View>
            <SubmitButton
                text
                title={"Tomar foto"}
                buttonStyle={styles.buttonChange}
                textStyle={styles.textButtonChange}
                actionButton={pickImageFromCamera}
            />
            <SubmitButton
                text
                title={"Galería"}
                buttonStyle={styles.buttonChange}
                textStyle={styles.textButtonChange}
                actionButton={pickImageFromGallery}
            />
            <View style={styles.buttonsContainer}>
                <SubmitButton
                    text
                    title={"Cancelar"}
                    buttonStyle={styles.buttonAction}
                    actionButton={() => navigation.goBack()}
                />
                <SubmitButton
                    text
                    title={"Confirmar"}
                    buttonStyle={styles.buttonAction}
                    actionButton={confirmImage}
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
    image: {
        width: 200,
        height: 200,
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
    buttonChange: {
        borderColor: '#2856A2',
        borderWidth: 2,
        width: 200
    },
    textButtonChange: {
        color: '#4C7BC8',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    buttonAction: {
        backgroundColor: '#4C7BC8',
        width: 100
    }
});
