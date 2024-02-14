import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import InputForm from '../../components/InputForm'
import SubmitButton from '../../components/SubmitButton'
import { useLoginMutation } from '../../app/services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'
import { insertSession } from '../../database'
import WaveLoading from '../../components/WaveLoading'

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
    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />
    return (
        <View style={styles.container}>
            <Text style={styles.title} >Log in</Text>
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
                title="Ingresar"
                buttonStyle={styles.buttonLogin}
            />
            <SubmitButton
                text
                actionButton={() => navigation.navigate("Register")}
                title={"No tienes cuenta? Registrarse"}
                buttonStyle={styles.buttonRegister}
                textStyle={styles.textRegister}
            />
            {isError ? <Text style={styles.errorText}>Correo o contraseña invalido</Text> : <></>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    errorText: {
        marginTop: 20,
        color: 'red',
        textAlign: 'center'
    },
    buttonLogin: {
        backgroundColor: '#808B96'
    },
    buttonRegister: {
        padding: 0,
        borderRadius: 0,
    },
    textRegister: {
        color: '#2037C6',
    }
})
