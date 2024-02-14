import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { useGetOrdersQuery } from '../../app/services/userService';
import { useSelector } from 'react-redux';
import WaveLoading from '../../components/WaveLoading';
import BackButton from '../../components/BackButton';
import { Entypo } from '@expo/vector-icons';
import { formatDate } from '../../utils/formatDate';

export default function OrdersScreen({ navigation }) {

    const localId = useSelector(state => state.auth.value.localId)
    const { data, isLoading } = useGetOrdersQuery(localId)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (data) {
            const ordersArray = Object.entries(data).map(([orderId, orderDetails]) => ({
                id: orderId,
                orderDate: orderDetails.orderDate,
                totalOrder: orderDetails.totalPrice
            }));
            setOrders(ordersArray);
        }
    }, [data])


    if (isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

    return (
        <>
            <BackButton />
            {orders.length == 0 ? <View style={styles.container}><Text style={styles.noOrdersText}>No tiene órdenes</Text></View> : <View style={styles.container}>
                <Text style={styles.ordersTitle}>Mis órdenes</Text>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.orderDate}>Fecha: {formatDate(item.orderDate)}</Text>
                            <Text style={styles.totalOrder}>Total: {item.totalOrder}</Text>
                            <Pressable style={styles.eyeButtonContainer} onPress={() => navigation.navigate("OrderDetails", { idOrder: item.id })}>
                                <Entypo name={"eye"} size={20} color={"gray"} style={styles.eyeButton} />
                            </Pressable>
                        </View>
                    )}
                />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    noOrdersText: {
        fontSize: 18,
        textAlign: 'center',
    },
    ordersTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#E8E8E8',
    },
    orderDate: {
        fontSize: 16,
    },
    totalOrder: {
        fontSize: 16,
        marginTop: 5,
    },
    eyeButtonContainer: {
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: [{ translateY: -10 }],
    },
    eyeButton: {
        backgroundColor: '#ccc',
        width: 30,
        height: 30,
        borderRadius: 15,
        textAlign: 'center',
        lineHeight: 30,
    },
});
