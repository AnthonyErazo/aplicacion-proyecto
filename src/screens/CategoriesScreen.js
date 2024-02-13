import { View, Text, StyleSheet, Image, Dimensions, FlatList, Pressable } from 'react-native';
import { useGetCategoriesQuery } from '../app/services/shopServices';
import WaveLoading from '../components/WaveLoading';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 3;

export default function CategoriesScreen({ navigation }) {
    const { data: categories, isLoading } = useGetCategoriesQuery()
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />
    return (
        <View style={styles.modalContainer}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View >
                        <Pressable style={styles.categoryContainer} onPress={() => {
                            navigation.navigate('ProductCategories', { item: item.name })
                        }}>
                            <Image source={{ uri: item.iconUrl }} style={styles.image} />
                            <Text style={styles.text}>{formatCategory(item.name)}</Text>
                        </Pressable>
                    </View>}
                contentContainerStyle={styles.container}
                numColumns={3}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    categoryContainer: {
        width: itemWidth,
        alignItems: 'center',
        marginBottom: 15,
        marginLeft:3,
        marginRight:3,
        backgroundColor:'#F8F8F8',
        borderRadius:15,
        borderColor:'#1111',
        borderWidth: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
        marginTop:5,
    },
    text: {
        fontSize: 10,
        marginBottom:5
    },
});