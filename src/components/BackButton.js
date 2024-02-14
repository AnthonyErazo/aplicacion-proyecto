import { StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
    const navigation = useNavigation();
    return (
        <SubmitButton
            icon
            nameIcon={"left"}
            text
            title={"Regresar"}
            sizeIcon={30}
            colorIcon={"#2c3e50"}
            textStyle={styles.backButtonText}
            buttonStyle={styles.backButton}
            containerStyle={styles.backButtonContainer}
            actionButton={() => navigation.goBack()}
        />
    )
}

const styles = StyleSheet.create({
    backButtonContainer: {
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
        top: 20,
        zIndex: 1,
        elevation: 5,
        padding: 4,
        marginLeft: 15,
        marginRight:15
    },
    backButtonText: {
        color: '#111',
    },
    backButton: {
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 0,
        margin: 0,
        backgroundColor: '#ecf0f1',
    }
})
