import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function InputForm ({ label, value, onChangeText, isSecure, error }) {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>{label}</Text>
            <TextInput value={value} onChangeText={onChangeText} style={styles.input} secureTextEntry={isSecure} />
            {error ? <View style={styles.errorContainer}><Text style={styles.error}>{error}</Text></View> : null}
        </View>
    )
}



const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 14,
        marginTop:14,
    },
    titleInput: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign:'center' 
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2', 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc', 
        fontSize: 16,
    },
    errorContainer: {
        alignItems: 'center',
        position:'relative'
    },
    error: {
        marginTop: 5,
        color: 'red',
        fontSize: 12,
        position:'absolute'
    },
})