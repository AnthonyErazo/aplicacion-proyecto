import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { useGetOrdersQuery } from '../../app/services/userService';
import { useSelector } from 'react-redux';
import WaveLoading from '../../components/WaveLoading';
import BackButton from '../../components/BackButton';
import { formatDate } from '../../utils/formatDate';
import { subtotal } from '../../utils/formatPriceReal';
import { Entypo } from '@expo/vector-icons';

export default function OrdersDetailsScreen({ navigation, route }) {

    const { idOrder } = route.params;
    const localId = useSelector(state => state.auth.value.localId);
    const { data, isLoading, isSuccess } = useGetOrdersQuery(localId, idOrder);

    const [order, setOrder] = useState([]);
    const [productsOrder, setProductsOrder] = useState([]);
    const [orderDate, setOrderDate] = useState('');
    const [orderAddress, setOrderAddress] = useState('');
    
    useEffect(() => {
        if (data && isSuccess) {
            setOrder(data[idOrder]);
            setProductsOrder(data[idOrder].product);
            setOrderDate(formatDate(data[idOrder].orderDate));
            setOrderAddress(data[idOrder].address.address);
        }
    }, [data, idOrder]);

    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />;

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.orderContainer}>
                <Text style={styles.sectionTitle}>Detalles de la Orden</Text>
                <Text style={styles.orderInfo}>Fecha de Orden: {orderDate}</Text>
                <Text style={styles.orderInfo}>Lugar de Envío: {orderAddress}</Text>
                <Text style={styles.orderInfo}>Total: {order.totalPrice}</Text>
                <Text style={styles.sectionTitle}>Productos</Text>
                <FlatList
                    data={productsOrder}
                    keyExtractor={(item) => item.product.id}
                    renderItem={({ item }) => (
                        <View style={styles.productItem}>
                            <Text style={styles.productTitle}>{item.product.title}</Text>
                            <Text style={styles.productInfo}>Precio: {item.product.price}</Text>
                            <Text style={styles.productInfo}>Cantidad: {item.quantity}</Text>
                            <Text style={styles.productInfo}>Subtotal: {subtotal(item)}</Text>
                            <Pressable style={styles.eyeButtonContainer} onPress={() => navigation.navigate('ProductDetail', { productId: item.product.id })}>
                                <Entypo name={"eye"} size={20} color={"gray"} style={styles.eyeButton} />
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    orderContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    orderInfo: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    productItem: {
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productInfo: {
        fontSize: 14,
        color: '#555',
    },
    eyeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
    },
    eyeButton: {
        alignSelf: 'center',
    },
});
