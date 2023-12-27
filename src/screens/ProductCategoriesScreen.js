import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import products from '../data/products.json'

export default function ProductCategoriesScreen({ navigation, route }) {
    const {item}=route.params
    const [productsCategories, setProductsCategories] = useState([])
    useEffect(() => {
        setProductsCategories(products.filter((p) => p.category === item))
    }, [])
    return (
        <FlatList
            data={productsCategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate("ProductDetail", { product:item })}>
                <View style={styles.productItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productDescription}>{item.description}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                </View>

            </Pressable>}
        />


    );
};

const styles = StyleSheet.create({
    productItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff', // Fondo blanco
    },
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e44d26', // Color naranja
    },
});