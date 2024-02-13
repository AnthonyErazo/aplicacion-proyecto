import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useGetOrdersQuery } from '../app/services/userService';
import { useSelector } from 'react-redux';
import WaveLoading from '../components/WaveLoading';

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

    if(isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

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