import { TextInput, StyleSheet, View, Pressable} from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import { colors } from '../global/Color'

export default function SearchBar({navigation,searchText,setSearchText}) {
    
    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar productos..."
                    value={searchText}
                    onFocus={()=>navigation?.navigate("Search")}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Pressable style={styles.searchIcon} onPress={()=>navigation?.navigate("Search")}>
                    <AntDesign name='search1' color="black" size={25} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    containerInput: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        position: 'relative',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
        color: 'black',
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
    },
})
