import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';

export default function ModalAlert  ({ visible, closeModal, confirmAction, cancelAction, modalText })  {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <View style={styles.buttonsContainer}>
                        <SubmitButton
                        text
                        title={"Cancelar"}
                        actionButton={cancelAction}
                        buttonStyle={styles.buttonCancel}
                        />
                        <SubmitButton
                        text
                        title={"Confirmar"}
                        actionButton={confirmAction}
                        buttonStyle={styles.buttonConfirm}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        width: '45%',
    },
    buttonConfirm: {
        backgroundColor: '#2196F3',
    },
    buttonCancel: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
