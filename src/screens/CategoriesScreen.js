import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useGetCategoriesQuery } from '../app/services/shopServices';
import Loading from '../components/Loading';

export default function CategoriesScreen({ navigation }) {
    const {data:categories,isLoading}= useGetCategoriesQuery()
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    if(isLoading) return <Loading />
    return (
        <View style={styles.modalContainer}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
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