import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import categories from '../data/categories.json';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function ModalCategories({ modalVisible, selectCategory, closeModal }) {
    const [itemsCategories, setItemsCategories] = useState([]);
    useEffect(() => {
        setItemsCategories(categories);
    }, []);
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                    <AntDesign name="close" size={24} color="#333" />
                </Pressable>
                <FlatList
                    data={itemsCategories}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => selectCategory(item)} style={styles.categoryItem}>
                            <Text>{formatCategory(item)}</Text>
                        </Pressable>
                    )}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    categoryItem: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    columnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});