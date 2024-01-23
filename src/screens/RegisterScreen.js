import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useSignupMutation } from '../app/services/authService'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { loginSchema } from '../validations/loginSchema'
import { usePostProfileDataMutation } from '../app/services/userService'

export default function RegisterScreen ({ navigation }) {
    const dispatch = useDispatch()
    const [triggerSignup, { data, isError, isSuccess, error, isLoading }] = useSignupMutation()
    const [triggerProfileData] = usePostProfileDataMutation()
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    useEffect(() => {
        if (isSuccess){ 
            dispatch(setUser(data))
            const localId=data.localId
            const dataProfile={
                name,
                lastName,
                age,
                email
            }
            triggerProfileData({localId,dataProfile})
        }
        if (isError) console.log(error)
    }, [data, isError, isSuccess])


    const onSubmit = () => {
        try {
            setEmailError("")
            setPasswordError("")
            setConfirmPasswordError("")
            loginSchema.validateSync({ email, password, confirmPassword })
            triggerSignup({ email, password})
        } catch (error) {
            console.log(error)
            switch (error.path) {
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
                    // error={emailError}
                />
                <InputForm
                    label="LastName"
                    value={lastName}
                    onChangeText={(t) => setLastName(t)}
                    isSecure={false}
                    // error={emailError}
                />
                <InputForm
                    label="Age"
                    value={age}
                    onChangeText={(t) => setAge(t)}
                    isSecure={false}
                    // error={emailError}
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