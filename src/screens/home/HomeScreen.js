import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useGetProductByDescountQuery, useGetProductByRatingQuery, useGetProductByStockQuery, useGetProductsQuery, useGetSomeCategoriesQuery } from '../../app/services/shopServices';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import CarouselCategory from '../../components/CarrouselCategory';
import WaveLoading from '../../components/WaveLoading';
import CarouselProducts from '../../components/CarrouselProducts';

export default function HomeScreen({ navigation }) {
    const { data: dataRating, isSuccess: succesRating, isLoading: loadingRating } = useGetProductByRatingQuery()
    const { data: dataStock, isSuccess: succesStock, isLoading: loadingStock } = useGetProductByStockQuery()
    const { data: dataDescount, isSuccess: succesDescount, isLoading: loadingDescount } = useGetProductByDescountQuery()
    const { data: dataSomeCategories, isSuccess: succesSomeCategories, isLoading: loadingSomeCategories } = useGetSomeCategoriesQuery()

    const [itemRating, setItemRating] = useState([])
    const [itemStock, setItemStock] = useState([])
    const [itemDescount, setItemDescount] = useState([])
    const [someCategories, setSomeCategories] = useState([])


    function productsArray(data) {
        return Object.keys(data).map(id => ({
            id: parseInt(id),
            ...data[id]
        }));
    }

    useEffect(() => {
        if (succesRating) {
            setItemRating(productsArray(dataRating));
        }
    }, [dataRating, succesRating]);
    useEffect(() => {
        if (succesStock) {
            setItemStock(productsArray(dataStock));
        }
    }, [dataStock, succesStock]);
    useEffect(() => {
        if (succesDescount) {
            setItemDescount(productsArray(dataDescount));
        }
    }, [dataDescount, succesDescount]);
    useEffect(() => {
        if (succesSomeCategories) {
            setSomeCategories(dataSomeCategories);
        }
    }, [dataSomeCategories, succesSomeCategories]);
    
    if(loadingRating||loadingStock||loadingDescount||loadingSomeCategories)return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <SearchBar 
                onSearch={()=>navigation.navigate('Search')}
                actionInput={()=>navigation.navigate('Search')}
                />
                <Text style={styles.sectionTitle}>Productos más Populares</Text>
                {loadingRating ? <Loading /> : <CarouselProducts display={"rating"} navigation={navigation} products={itemRating}/>}

                <Text style={styles.sectionTitle}>¡Corre que se Acaban!</Text>
                {loadingStock ? <Loading /> : <CarouselProducts display={"stock"} navigation={navigation} products={itemStock}/>}

                <Text style={styles.sectionTitle}>Ofertas Especiales</Text>
                {loadingDescount ? <Loading /> : <CarouselProducts display={"discount"} navigation={navigation} products={itemDescount}/>}

                <Text style={styles.sectionTitle}>Explorar Categorías</Text>

                {loadingSomeCategories ? <Loading /> : <CarouselCategory 
                category={someCategories} 
                navigation={navigation}
                />}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    swiperContainer: {
        height: 200,
    },
    swiperContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
