import { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../../components/InputForm'
import { useSelector } from 'react-redux'
import { editProfileSchema } from '../../validations/editProfileSchema'
import { useGetProfileDataQuery, usePostProfileDataMutation } from '../../app/services/userService'
import Loading from '../../components/Loading';
import SubmitButton from '../../components/SubmitButton';
import WaveLoading from '../../components/WaveLoading';

export default function EditProfileScreen({ navigation }) {
    const localId = useSelector(state => state.auth.value.localId)
    const { data, isError, isSuccess, error, isLoading } = useGetProfileDataQuery(localId)
    const [triggerProfileData] = usePostProfileDataMutation()

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState(null)

    const [nameError, setNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [birthdayError, setBirthdayError] = useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setBirthdayError("");
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        setBirthday(selectedDate);
        hideDatePicker();
    };

    const formattedBirthday = birthday ? new Date(birthday).toLocaleDateString('es-ES') : 'Seleccionar fecha';



    useEffect(() => {
        if (isSuccess) {
            setName(data.name)
            setLastName(data.lastName)
            setBirthday(data.birthday)
        }
        if (isError) console.log(error)
    }, [])

    const handleEditProfile = () => {
        try {
            setNameError("")
            setLastNameError("")
            setBirthdayError("")
            editProfileSchema.validateSync({ name, lastName, birthday })
            const dataProfile = {
                email: data.email,
                name,
                lastName,
                birthday
            }
            triggerProfileData({ localId, dataProfile })
            navigation.navigate("MyProfile")
        } catch (error) {
            console.log(error)
            switch (error.path) {
                case "name":
                    setNameError(error.message)
                    break
                case "lastName":
                    setLastNameError(error.message)
                    break
                case "birthday":
                    setBirthdayError(error.message)
                    break
                default:
                    break

            }

        }
    }

    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />


    return (
        <View style={styles.container}>
            <Text style={styles.title} >Edit Profile</Text>
            <InputForm
                label="Name"
                value={name}
                onChangeText={(t) => setName(t)}
                isSecure={false}
                error={nameError}
            />
            <InputForm
                label="LastName"
                value={lastName}
                onChangeText={(t) => setLastName(t)}
                isSecure={false}
                error={lastNameError}
            />
            <View style={styles.continerDate}>
                <Text style={styles.titleDate}>Birthday: </Text>
                <Pressable style={styles.buttonDate} onPress={showDatePicker}>
                    <Text style={styles.textDate}>{formattedBirthday}</Text>
                    {birthdayError ? <View style={styles.errorContainer}><Text style={styles.error}>{birthdayError}</Text></View> : null}
                </Pressable>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
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
                    actionButton={handleEditProfile}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 25
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    buttonAction: {
        backgroundColor: '#4C7BC8',
        width: 100
    },
    errorContainer: {
        alignItems: 'center',
        position: 'relative'
    },
    error: {
        marginTop: 16,
        color: 'red',
        fontSize: 12,
        position: 'absolute'
    },
    continerDate: {
        marginTop: 14,
        marginBottom: 14
    },
    buttonDate:{
        backgroundColor:'#f2f2f2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    titleDate:{
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign:'center' 
    },
})