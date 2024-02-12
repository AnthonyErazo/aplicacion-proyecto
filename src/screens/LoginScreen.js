import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useLoginMutation } from '../app/services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import Loading from '../components/Loading'
import { insertSession } from '../database'

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch()
    const [triggerLogin, { data, isError, isSuccess, error, isLoading }] = useLoginMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(data))
            insertSession({ localId: data.localId, email: data.email, idToken: data.idToken })
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        if (isError) console.log(error)
    }, [data, isError, isSuccess])


    const onSubmit = () => {
        triggerLogin({ email, password })
    }
    if (isLoading) return <Loading />
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title} >Login to start</Text>
                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    isSecure={false}
                    error=""
                />
                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error=""
                />
                <SubmitButton 
                text
                actionButton={onSubmit} 
                title="Send" 
                />
                <Text style={styles.sub}>Not have an account?</Text>
                <SubmitButton 
                text
                actionButton={() => navigation.navigate("Register")}
                title={"Sign up"}
                />
                {isError ? <Text style={styles.sub}>Correo o contraseña invalido</Text> : <></>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
})
