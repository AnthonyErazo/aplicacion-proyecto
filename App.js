import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Modal, Switch } from 'react-native';

export default function App() {
  const [titleNote, setTitleNote] = useState("");
  const [textNote, setTextNote] = useState("");
  const [note, setNote] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [operation, setOperation] = useState("");
  const [noteValid, setNoteValid] = useState(true)

  const handleAddNote = () => {
    if (!!titleNote && !!textNote) {
      setNoteValid(true);
      const updatedNotes = !!selectedNote
        ? note.map((item) =>
          (item.title === selectedNote.title) && (item.text === selectedNote.text) && (item.status === selectedNote.status) ? { title: titleNote, text: textNote, status: selectedNote.status } : item
        )
        : [...note, { title: titleNote, text: textNote, status: 'pending' }];

      setNote(updatedNotes);
      setOperation("");
      setTitleNote("");
      setTextNote("");
      setSelectedNote(null);
      setModalVisible(false);
    } else {
      setNoteValid(false);
    }
  }
  const handlerModal = (item, operation) => {
    setOperation(operation);
    setSelectedNote(item);
    setTitleNote(item ? item.title : "");
    setTextNote(item ? item.text : "");
    setModalVisible(true);
  }
  const handlerDeleteNote = (item) => {
    setNote((prevNotes) =>
      prevNotes.filter((noteItem) => !(noteItem.title === item.title && noteItem.text === item.text && noteItem.status === item.status))
    );
    setModalVisible(false);
  }
  const handleCompleteNote = (item) => {
    setNote((prevNote) =>
      prevNote.map((n) =>
        n.title === item.title && n.text === item.text
          ? { ...n, status: n.status === 'completed' ? 'pending' : 'completed' }
          : n
      )
    );
  }

  
  return (
    <View style={styles.container}>
      <Button title="+ Add New Note" onPress={() => handlerModal(null, 'Add')} />
      <Modal visible={modalVisible}>
      <View style={styles.modalContainer}>
        {operation=='View'?
        <View style={styles.modalContent}>
        <Text style={styles.modalTextView}>Titulo de la nota:</Text>
        <Text style={[styles.modalText,{textAlign:"center"}]}>{selectedNote.title}</Text>
        <Text style={styles.modalTextView}>Descripcion de la nota:</Text>
        <Text style={[styles.modalText,{textAlign:"left"}]}>{selectedNote.text}</Text>
        <Text style={styles.modalTextView}>Estado:</Text>
        <Text style={[styles.modalText,{ textAlign: "center", color: selectedNote.status === 'completed' ? 'green' : 'red' }]}>{selectedNote.status}</Text>
        <View style={styles.actionsModal}>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </View>
        :(operation === 'Delete' ? (
          <View style={styles.modalContent}>
            <Text style={[styles.modalText,{textAlign:"center"}]}>¿Estás seguro que quieres borrar?</Text>
            <Text style={[styles.modalText,{textAlign:"center"}]}>{selectedNote.title}</Text>
            <View style={styles.actionsModal}>
              <Button title="Confirmar" onPress={() => handlerDeleteNote(selectedNote)} />
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        ) : (
          
            <View style={styles.modalContent}>
              <Text style={[styles.modalText,{textAlign:"center"}]}>{operation === 'Modify' ? 'Modificar nota' : 'Añadir nueva nota'}</Text>
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
      <View style={styles.listContainer}>
        <FlatList
          data={note}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={[styles.cardNotes, { backgroundColor: item.status === 'completed' ? '#c0f0c0' : '#f0f0f0' }]}>
              <View style={styles.infoCardNotes}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Switch
                  style={styles.switchCardNotes}
                  value={item.status === 'completed'}
                  onValueChange={() => handleCompleteNote(item)}
                />
              </View>
              <View style={styles.actionsCardNotes}>
                <Button title="Delete" onPress={() => handlerModal(item, 'Delete')} color="#ff4d4d" />
                <Button title="Modify" onPress={() => handlerModal(item, 'Modify')} color="#4da6ff" />
                <Button title="View" onPress={() => handlerModal(item, 'View')} color="#4da6ff" />
              </View>

            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width:"100%"
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalTextView:{
    fontSize: 18,
    marginBottom: 8,
    textAlign: "left",
    fontWeight: 'bold',
    fontSize: 20 
  },
  actionsModal:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  input: {
    height: 40,
    width:"100%",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  listContainer: {
    flex: 1,
    marginTop:10,
    padding:10
  },
  cardNotes: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15
  },
  infoCardNotes:{
    flex:1,
    flexDirection:"row",
    justifyContent: "flex-end",
  },
  switchCardNotes:{
    flex:1,
  },
  actionsCardNotes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf:"stretch",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});