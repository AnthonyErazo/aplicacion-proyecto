import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable,StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import products from '../data/products.json';
import ModalCategories from '../components/ModalCategories';

export default function HomeScreen({ handleSearchPress, handleProductPress, handleBackPress }) {
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setItems(products);
    }, []);
    
    const productCategory = (item) => {
        setItems(products.filter((i) => i.category === item));
    };
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const selectCategory = (category) => {
        productCategory(category);
        closeModal();
    };

    return (
        <View>
            <Navbar handleBackPress={handleBackPress} />
            <SearchBar handleSearchPress={handleSearchPress} />
            <Pressable style={styles.selectButton} onPress={openModal}>
                <Text style={styles.selectButtonText}>Seleccionar categoría</Text>
            </Pressable>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductList
                product={item}
                handleProductPress={handleProductPress}
                />}
            />
            <ModalCategories 
            modalVisible={modalVisible}
            closeModal={closeModal}
            selectCategory={selectCategory}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    selectButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      alignItems: 'center',
    },
    selectButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });