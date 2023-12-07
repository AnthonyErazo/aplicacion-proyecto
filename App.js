import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Switch } from 'react-native';
import ModalView from './src/components/ModalView';

export default function App() {
  const [titleNote, setTitleNote] = useState("");
  const [textNote, setTextNote] = useState("");
  const [note, setNote] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [operation, setOperation] = useState("");
  const [noteValid, setNoteValid] = useState(true);
  const deleted = 'Delete';
  const modify = 'Modify';
  const view = 'View';
  const completed = 'completed';
  const pending = 'pending';

  const handleAddNote = () => {
    if (!!titleNote && !!textNote) {
      setNoteValid(true);
      const updatedNotes = !!selectedNote
        ? note.map((item) =>
          (item.title === selectedNote.title) && (item.text === selectedNote.text) && (item.status === selectedNote.status) ? { title: titleNote, text: textNote, status: selectedNote.status } : item
        )
        : [...note, { title: titleNote, text: textNote, status: pending }];

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
          ? { ...n, status: n.status === completed ? pending : completed }
          : n
      )
    );
  }


  return (
    <View style={styles.container}>
      <Button title="+ Add New Note" onPress={() => handlerModal(null, 'Add')} />
      <View style={styles.listContainer}>
        <FlatList
          data={note}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={[styles.cardNotes, { backgroundColor: item.status === completed ? '#c0f0c0' : '#f0f0f0' }]}>
              <View style={styles.infoCardNotes}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Switch
                  style={styles.switchCardNotes}
                  value={item.status === completed}
                  onValueChange={() => handleCompleteNote(item)}
                />
              </View>
              <View style={styles.actionsCardNotes}>
                <Button title={deleted} onPress={() => handlerModal(item, deleted)} color="#ff4d4d" />
                <Button title={modify} onPress={() => handlerModal(item, modify)} color="#4da6ff" />
                <Button title={view} onPress={() => handlerModal(item, view)} color="#4da6ff" />
              </View>

            </View>
          )}
        />
      </View>
      <ModalView
        completed={completed}
        selectedNote={selectedNote}
        setTextNote={setTextNote}
        setTitleNote={setTitleNote}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modify={modify}
        view={view}
        deleted={deleted}
        operation={operation}
        handleAddNote={handleAddNote}
        handlerDeleteNote={handlerDeleteNote}
        textNote={textNote}
        titleNote={titleNote}
        noteValid={noteValid}
        setNoteValid={setNoteValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10
  },
  cardNotes: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15
  },
  infoCardNotes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  switchCardNotes: {
    flex: 1,
  },
  actionsCardNotes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});