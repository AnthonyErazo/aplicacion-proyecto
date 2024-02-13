import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useGetOrdersQuery } from '../app/services/userService';
import { useSelector } from 'react-redux';
import SubmitButton from '../components/SubmitButton';
import WaveLoading from '../components/WaveLoading';

export default function OrdersScreen({ navigation }) {

    const localId=useSelector(state=>state.auth.value.localId)
    const {data,isLoading} = useGetOrdersQuery(localId)
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        if (data) {
            const ordersArray = Object.entries(data).map(([orderId, orderDetails]) => ({
                id: orderId,
                orderDate: orderDetails.orderDate,
                totalOrder:orderDetails.totalPrice
            }));
            setOrders(ordersArray);
        }
    },[data])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
    
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
    };
    

    if(isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />

    return (
        <View>
            <Text>Ordenes</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>Fecha: {formatDate(item.orderDate)}</Text>
                        <Text>Total: {item.totalOrder}</Text>
                        <SubmitButton
                        text
                        title={"Mostar Detalles"} 
                        actionButton={()=>navigation.navigate("OrderDetails",{idOrder:item.id})}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});