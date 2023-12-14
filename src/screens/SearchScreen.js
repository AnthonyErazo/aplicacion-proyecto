import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import products from '../data/products.json'
import ProductList from '../components/ProductList';
export default function SearchScreen({ handleBackPress, handleProductPress }) {
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState([])
    let filteredItems
    useEffect(() => {
        setItems(products);
    }, []);
    if (searchText === '') {
        filteredItems = []
    } else {
        filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <Pressable style={styles.backContainer} onPress={handleBackPress}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <View style={styles.searchBarContainer}>
                    <SearchBar searchText={searchText} setSearchText={setSearchText} />
                </View>
            </View>
            {((filteredItems.length > 0) || (searchText === '')) ? (
                <></>
            ) : (
                <View style={styles.noProductContainer}>
                    <Text style={styles.noProductText}>
                        Producto no encontrado "{searchText}"
                    </Text>
                </View>
            )}
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductList
                    product={item}
                    handleProductPress={handleProductPress}
                />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    backContainer: {
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgray',
    },
    searchBarContainer: {
        flex: 1,
    },
    noProductContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noProductText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
});