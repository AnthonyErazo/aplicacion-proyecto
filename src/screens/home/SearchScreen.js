import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList,ScrollView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import ProductList from '../../components/ProductList';
import { useGetCategoriesQuery, useGetProductsQuery } from '../../app/services/shopServices';
import WaveLoading from '../../components/WaveLoading';
import CarouselCategory from '../../components/CarrouselCategory';
import CloseButton from '../../components/CloseButton';

export default function SearchScreen({ navigation }) {
    const { data: dataProducts, isSuccess: successProducts, isLoading: loadingProducts } = useGetProductsQuery();
    const { data: dataCategories, isSuccess: successCategories, isLoading: loadingCategories } = useGetCategoriesQuery();

    const [searchText, setSearchText] = useState('');
    const [textEnter, setTextEnter] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [productsSearch, setProductsSearch] = useState([]);
    const [categoriesSearch, setCategoriesSearch] = useState([]);

    useEffect(() => {
        if (successProducts && successCategories) {
            setProducts(dataProducts)
            setCategories(dataCategories)
        }
    }, [dataProducts, dataCategories])

    const handleSearch = () => {
        setTextEnter(searchText)
        const searchCat = categories.filter(categories =>
            categories.name.replace(/-/, ' ').toLowerCase().includes(searchText.toLowerCase())
        )
        const searchPro = products.filter(product =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        )
        setCategoriesSearch(searchCat)
        setProductsSearch(searchPro)
    }
    if (loadingProducts || loadingCategories) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

    return (
        <View>
            <CloseButton />
            <View style={styles.inputContainer}>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        onSearch={handleSearch} />
                </View>
            </View>
            {((productsSearch.length == 0) && (categoriesSearch.length == 0) && (textEnter !== '')) ? (
                <View style={styles.noProductContainer}>
                    <Text style={styles.noProductText}>
                        No se encontraron resultados para "{textEnter}"
                    </Text>
                </View>
            ) : (
                <></>
            )}
            {categoriesSearch.length != 0 ?
                <View>
                    <Text style={styles.sectionTitle}>Categorias: </Text>
                    <CarouselCategory
                        category={categoriesSearch}
                        navigation={navigation}
                    />
                </View> :
                null}
            {productsSearch.length != 0 ?
                <View>
                    <Text style={styles.sectionTitle}>Productos: </Text>
                    <FlatList
                        data={productsSearch}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ProductList
                            product={item}
                            navigation={navigation}
                        />}
                    />
                </View> :
                null}

        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
});