import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { useGetProductsByCategoriesQuery } from '../app/services/shopServices';
import SubmitButton from '../components/SubmitButton';
import { useEffect, useState } from 'react';
import WaveLoading from '../components/WaveLoading';

export default function ProductCategoriesScreen({ navigation, route }) {
    const { item } = route.params
    const { data, isLoading,isSuccess } = useGetProductsByCategoriesQuery(item)
    const [products,setProducts]=useState([])
    

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(Object.values(data))
        }
    }, [isSuccess, data])


    if (isLoading || !data) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />
    return (
        <>
            <SubmitButton
                icon
                containerStyle={styles.backButtonContainer}
                buttonStyle={styles.backButton}
                sizeIcon={30}
                colorIcon={"#2c3e50"}
                nameIcon={"left"}
                actionButton={() => navigation.goBack()}
            />
            <FlatList
                style={styles.container}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Pressable onPress={() => {
                    navigation.navigate("ProductDetail", { productId: item.id })
                }}>
                    <View style={styles.productItem}>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail }}
                        />
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
    container: {
        marginTop: 90
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