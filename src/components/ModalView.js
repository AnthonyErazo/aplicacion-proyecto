import { View, Text, StyleSheet, TextInput, Button, Modal} from 'react-native';

export default function ModalView({selectedNote,setNoteValid,setTextNote,textNote,setTitleNote,noteValid,titleNote,handleAddNote,handlerDeleteNote,operation,deleted,modify,view,modalVisible,setModalVisible,completed}) {
    return (
            <Modal visible={modalVisible}>
                <View style={styles.modalContainer}>
                    {operation == view ?
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTextView}>Titulo de la nota:</Text>
                            <Text style={[styles.modalText, { textAlign: "center" }]}>{selectedNote.title}</Text>
                            <Text style={styles.modalTextView}>Descripcion de la nota:</Text>
                            <Text style={[styles.modalText, { textAlign: "left" }]}>{selectedNote.text}</Text>
                            <Text style={styles.modalTextView}>Estado:</Text>
                            <Text style={[styles.modalText, { textAlign: "center", color: selectedNote.status === completed ? 'green' : 'red' }]}>{selectedNote.status}</Text>
                            <View style={styles.actionsModal}>
                                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                        : (operation === deleted ? (
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalText, { textAlign: "center" }]}>¿Estás seguro que quieres borrar?</Text>
                                <Text style={[styles.modalText, { textAlign: "center" }]}>{selectedNote.title}</Text>
                                <View style={styles.actionsModal}>
                                    <Button title="Confirmar" onPress={() => handlerDeleteNote(selectedNote)} />
                                    <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                                </View>
                            </View>
                        ) : (

                            <View style={styles.modalContent}>
                                <Text style={[styles.modalText, { textAlign: "center" }]}>{operation === modify ? 'Modificar nota' : 'Añadir nueva nota'}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Título de la nota..."
                                    onChangeText={(t) => setTitleNote(t)}
                                    value={titleNote}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Descripción de la nota..."
                                    onChangeText={(t) => setTextNote(t)}
                                    value={textNote}
                                />
                                {!noteValid && <Text style={styles.errorText}>Todos los campos deben ser ingresados</Text>}
                                <View style={styles.actionsModal}>
                                    <Button title="Confirmar" onPress={handleAddNote} />
                                    <Button title="Cerrar" onPress={() => {
                                        setModalVisible(false)
                                        setNoteValid(true)
                                    }} />
                                </View>
                            </View>
                        ))}
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: "100%"
    },
    modalText: {
        fontSize: 18,
        marginBottom: 8,
    },
    modalTextView: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 20
    },
    actionsModal: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    }
});