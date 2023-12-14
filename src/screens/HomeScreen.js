import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import products from '../data/products.json';

export default function HomeScreen({ handleSearchPress,handleProductPress,handleBackPress }) {
    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(products);
    }, []);

    return (
        <View>
            <Navbar handleBackPress={handleBackPress} />
            <SearchBar handleSearchPress={handleSearchPress} />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductList
                    product={item}
                    handleProductPress={handleProductPress}
                />}
            />
        </View>
    );
};

