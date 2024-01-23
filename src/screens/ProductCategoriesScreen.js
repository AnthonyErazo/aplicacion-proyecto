import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setProductSelected } from '../features/shop/shopSlice';
import { AntDesign } from '@expo/vector-icons';

export default function ProductCategoriesScreen({ navigation, route }) {
    const dispatch = useDispatch()
    const productsFilteredByCategory = useSelector(state => state.shop.value.productsFilteredByCategory)
    const { item } = route.params
    return (
        <>
            <Pressable
                style={styles.backButtonContainer}
                onPress={() => navigation.goBack()}
            >
                <View style={styles.backButton}>
                    <AntDesign name="left" size={30} color="#2c3e50" />
                </View>
            </Pressable>
            <FlatList
            style={styles.container}
                data={productsFilteredByCategory}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Pressable onPress={() => {
                    dispatch(setProductSelected(item))
                    navigation.navigate("ProductDetail", { product: item })
                }}>
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
        </>


    );
};

const styles = StyleSheet.create({
    container:{
        marginTop:90
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
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
        color: '#e44d26',
    },
    backButtonContainer: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        elevation: 5,
    },
});