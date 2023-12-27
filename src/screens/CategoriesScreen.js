import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSelector,useDispatch } from 'react-redux'
import { setProductsFilteredByCategory } from "../features/shopSlice"

export default function CategoriesScreen({ navigation }) {
    const categories = useSelector((state) => state.shop.value.categories)
    const dispatch = useDispatch()
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    return (
        <View style={styles.modalContainer}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        dispatch(setProductsFilteredByCategory(item))
                        navigation.navigate('ProductCategories', { item })
                    }} style={styles.categoryItem}>
                        <Text>{formatCategory(item)}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});