import { StyleSheet, FlatList } from 'react-native';
import { useGetProductsByCategoriesQuery } from '../../app/services/shopServices';
import { useEffect, useState } from 'react';
import WaveLoading from '../../components/WaveLoading';
import ProductList from '../../components/ProductList';
import BackButton from '../../components/BackButton';

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
            <BackButton />
            <FlatList
                style={styles.container}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductList product={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
            />
        </>


    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    }
});