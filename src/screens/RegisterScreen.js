import { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useSignupMutation } from '../app/services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { loginSchema } from '../validations/loginSchema'
import { usePostProfileDataMutation } from '../app/services/userService'
import { insertSession } from '../database';

export default function RegisterScreen({ navigation }) {
    const dispatch = useDispatch()
    const [triggerSignup, { data, isError, isSuccess, error, isLoading }] = useSignupMutation()
    const [triggerProfileData] = usePostProfileDataMutation()

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [nameError, setNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [birthdayError, setBirthdayError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

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

    const formattedBirthday = birthday ? `${birthday.getDate()}/${birthday.getMonth() + 1}/${birthday.getFullYear()}` : 'Select date';


    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(data))
            const localId = data.localId
            const dataProfile = {
                name,
                lastName,
                birthday,
                email
            }
            triggerProfileData({ localId, dataProfile })
            insertSession({ localId: data.localId, email: data.email, idToken: data.idToken })
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        if (isError) console.log(error)
    }, [data, isError, isSuccess])


    const onSubmit = () => {
        try {
            setNameError("")
            setLastNameError("")
            setBirthdayError("")
            setEmailError("")
            setPasswordError("")
            setConfirmPasswordError("")
            loginSchema.validateSync({ email, password, confirmPassword, name, lastName, birthday })
            triggerSignup({ email, password })
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
                case "email":
                    setEmailError(error.message)
                    break
                case "password":
                    setPasswordError(error.message)
                    break
                case "confirmPassword":
                    setConfirmPasswordError(error.message)
                    break
                default:
                    break

            }

        }
    }


    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title} >Sign up</Text>
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
                    {birthdayError?<Text>{birthdayError}</Text>:<></>}
                </Pressable>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    isSecure={false}
                    error={emailError}
                />
                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error={passwordError}
                />
                <InputForm
                    label="Confirm password"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={true}
                    error={confirmPasswordError}

                />
                <SubmitButton title="Send" onPress={onSubmit}
                />
                <Text style={styles.sub}>Alredy have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.subLink}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
})