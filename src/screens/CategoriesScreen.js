import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import categories from '../data/categories.json';
import { useEffect, useState } from 'react';

export default function CategoriesScreen({navigation}) {
    const [itemsCategories, setItemsCategories] = useState([]);
    useEffect(() => {
        setItemsCategories(categories);
    }, []);
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    return (
        <View style={styles.modalContainer}>
            <FlatList
                data={itemsCategories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigation.navigate('ProductCategories',{item})} style={styles.categoryItem}>
                        <Text>{formatCategory(item)}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});