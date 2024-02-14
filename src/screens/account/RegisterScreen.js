import { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import InputForm from '../../components/InputForm'
import SubmitButton from '../../components/SubmitButton'
import { useSignupMutation } from '../../app/services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'
import { loginSchema } from '../../validations/loginSchema'
import { usePostProfileDataMutation } from '../../app/services/userService'
import { insertSession } from '../../database';
import WaveLoading from '../../components/WaveLoading';

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
        if (isError) {
            console.log(error)
            if (error.data.error.message == "EMAIL_EXISTS") {
                setEmailError("El email ya existe")
            }
        }
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
            console.log(error)
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
    if(isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
            <SubmitButton
                text
                title="Send"
                actionButton={onSubmit}
                buttonStyle={styles.buttonRegister}
            />
            <SubmitButton
                text
                actionButton={() => navigation.navigate("Login")}
                title={"Ya tienes una cuenta? Login"}
                textStyle={styles.textLogin}
                buttonStyle={styles.buttonLogin}
            />
        </ScrollView>
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
    buttonRegister: {
        backgroundColor: '#808B96'
    },
    buttonLogin: {
        padding: 0,
        borderRadius: 0,
        marginBottom:90
    },
    textLogin: {
        color: '#2037C6',
    }
})