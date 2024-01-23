import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputForm = ({ label, value, onChangeText, isSecure, error }) => {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>{label}</Text>
            <TextInput value={value} onChangeText={onChangeText} style={styles.input} secureTextEntry={isSecure} />
            {error ? <View><Text style={styles.error}>{error}</Text></View> : null}
        </View>
    )
}


export default InputForm


const styles = StyleSheet.create({
})