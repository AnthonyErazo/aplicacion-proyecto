import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useGetOrdersQuery } from '../app/services/userService';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

export default function OrdersDetailsScreen({ navigation,route }) {

    const {idOrder}=route.params
    const localId=useSelector(state=>state.auth.value.localId)
    const {data,isLoading} = useGetOrdersQuery(localId,idOrder)
    const [order,setOrder]=useState([])
    const [productsOrder,setProductsOrder]=useState([])
    useEffect(() => {
        if (data) {
            setOrder(data[idOrder]);
            setProductsOrder(data[idOrder].product)
        }
    }, [data, idOrder]);

    if(isLoading) return <Loading />

    return (
        <View>
            <Text>Ordenes</Text>
            <Text>Fecha de orden: {order.orderDate}</Text>
            <Text>Total: {order.totalPrice}</Text>
            <Text>Productos</Text>
            <FlatList
                data={productsOrder}
                keyExtractor={(item) => item.product.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.product.title}</Text>
                        <Text>{item.product.price}</Text>
                        <Text>{item.quantity}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});