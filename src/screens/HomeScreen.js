import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ProductList from '../components/ProductList';
import Swiper from 'react-native-swiper';
import products from '../data/products.json';

export default function HomeScreen({ navigation }) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(products);
    }, []);

    const featuredByRating = [...items].sort((a, b) => b.rating - a.rating).slice(0, 8);
    const featuredByDiscount = [...items].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 8);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Productos Destacados</Text>

                <Text style={styles.sectionTitle}>Mayor Rating</Text>
                <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                    loop
                    autoplay
                >
                    {featuredByRating.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayRating />
                    ))}
                </Swiper>

                <Text style={styles.sectionTitle}>Mayor Descuento</Text>
                <Swiper
                    style={styles.swiperContainer}
                    showsPagination={false}
                    contentContainerStyle={styles.swiperContentContainer}
                    loop
                    autoplay
                >
                    {featuredByDiscount.map((item) => (
                        <ProductList key={item.id} product={item} navigation={navigation} displayDiscount />
                    ))}
                </Swiper>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40,
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
