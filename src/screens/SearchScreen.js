import { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import { useSelector, useDispatch } from 'react-redux'
import { setProductSearch } from '../features/shop/shopSlice';

export default function SearchScreen({ navigation }) {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('');
    const [textEnter, setTextEnter] = useState('');
    const productSearch = useSelector(state => state.shop.value.productSearch)
    const handleSearch = () => {
        dispatch(setProductSearch(searchText))
        setTextEnter(searchText)
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        onSearch={handleSearch} />
                </View>
            </View>
            {((productSearch.length > 0) || (textEnter === '')) ? (
                <></>
            ) : (
                <View style={styles.noProductContainer}>
                    <Text style={styles.noProductText}>
                        No se encontraron resultados para "{textEnter}"
                    </Text>
                </View>
            )}
            <FlatList
                data={productSearch}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductList
                    product={item}
                    navigation={navigation}
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