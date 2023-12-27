import { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import ProductList from '../components/ProductList';
import products from '../data/products.json';

export default function HomeScreen({ navigation }) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(products);
    }, []);

    return (
        <SafeAreaView>
                    <Text>Publicidad</Text>
                    <Text>Recomendados</Text>
                    <Text>Destacados</Text>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ProductList
                            product={item}
                            navigation={navigation}
                        />}
                    />
        </SafeAreaView>

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