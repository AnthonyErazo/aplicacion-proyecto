import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ProductList from '../components/ProductList';
import Swiper from 'react-native-swiper';
import products from '../data/products.json';
import { useGetProductByDescountQuery, useGetProductByRatingQuery, useGetProductByStockQuery, useGetProductsQuery, useGetSomeCategoriesQuery } from '../app/services/shopServices';
import Loading from '../components/Loading';

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                
                <Text style={styles.title}>Productos Destacados</Text>

                <Text style={styles.sectionTitle}>Productos más Populares</Text>
                {loadingRating ? <Loading /> : <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                    loop
                    autoplay
                >
                    {itemRating.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayRating />
                    ))}
                </Swiper>}

                <Text style={styles.sectionTitle}>¡Corre que se Acaban!</Text>
                {loadingStock ? <Loading /> : <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                    loop
                    autoplay
                >
                    {itemStock.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayDiscount />
                    ))}
                </Swiper>}

                <Text style={styles.sectionTitle}>Ofertas Especiales</Text>
                {loadingDescount ? <Loading /> : <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                    loop
                    autoplay
                >
                    {itemDescount.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayDiscount />
                    ))}
                </Swiper>}

                <Text style={styles.sectionTitle}>Explorar Categorías</Text>

                {loadingSomeCategories ? <Loading /> : <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                >
                    {itemDescount.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayDiscount />
                    ))}
                </Swiper>}

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
        marginVertical: 10,
    },
    swiperContainer: {
        height: 200,
    },
    swiperContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
