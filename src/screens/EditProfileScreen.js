import { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../components/InputForm'
import {  useSelector } from 'react-redux'
import { editProfileSchema } from '../validations/editProfileSchema'
import { useGetProfileDataQuery, usePostProfileDataMutation } from '../app/services/userService'
import Loading from '../components/Loading';
import SubmitButton from '../components/SubmitButton';

export default function EditProfileScreen({ navigation }) {
    const localId = useSelector(state => state.auth.value.localId)
    const {data, isError, isSuccess, error, isLoading} = useGetProfileDataQuery(localId)
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
            const dataProfile={
                email:data.email,
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

    if(isLoading) return <Loading />


    return (
        <View style={styles.main}>
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
                <Pressable onPress={showDatePicker}>
                    <Text>Birthday</Text>
                    <Text>{formattedBirthday}</Text>
                    {birthdayError ? <Text>{birthdayError}</Text> : <></>}
                </Pressable>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <SubmitButton 
                text
                title={"Cancelar"}
                actionButton={() => navigation.goBack()}
                />
                <SubmitButton 
                text
                title={"Confirmar"}
                actionButton={handleEditProfile}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
})