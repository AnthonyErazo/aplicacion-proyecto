import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProbuctsCart, detletProbuctCartById } from '../features/cart/cartSlice';
import { useGetUserLocationQuery, usePostOrderMutation } from '../app/services/userService';
import Loading from '../components/Loading';
import ModalAlert from '../components/ModalAlert';
import SubmitButton from '../components/SubmitButton';

export default function CartScreen({ navigation }) {

    const dispatch = useDispatch()

    const products = useSelector(state => state.cart.value.cart)
    const localId = useSelector(state => state.auth.value.localId)

    const [productsCart, setProductsCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [textModal, setTextModal] = useState("");
    const [itemId, setItemId] = useState(null);

    const [triggerOrders, { isLoading }] = usePostOrderMutation()
    const { data: dataLocation, isLoading: isLoadingLocation } = useGetUserLocationQuery()

    function eliminatedProductCart(item) {
        setItemId(item.id)
        setTextModal("Seguro que quiere eliminar: " + item.title)
        setModalAction('deleteProduct')
        setModal(true)
    }
    const eliminatedCart = () => {
        setModal(true)
        setTextModal("Seguro que quiere eliminar TODOS los productos de su carrito?")
        setModalAction('deleteAllProducts')
    }
    const orderCart = () => {
        if (localId) {
            if (dataLocation) {
                setModal(true)
                setTextModal("Desea confirmar su orden?")
                setModalAction('order')
            } else {
                setModal(true)
                setTextModal("Necesita tener una direccion para continuar")
                setModalAction('redirect')
            }
        } else {
            navigation.navigate("Authentication")
        }
    }
    const handleModalAction = () => {
        switch (modalAction) {
            case 'deleteProduct':
                dispatch(detletProbuctCartById({ id: itemId }));
                break;
            case 'deleteAllProducts':
                dispatch(deleteProbuctsCart());
                break;
            case 'redirect':
                navigation.navigate("Account");
                break;
            case 'order':
                const orderData = {
                    product: productsCart,
                    orderDate: new Date(),
                    totalPrice,
                    address: dataLocation
                }
                triggerOrders({ localId, orderData })
                dispatch(deleteProbuctsCart())
                break;
            default:
                break;
        }
        setModal(false);
    };
    function formatPrice(price) {
        return parseFloat(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    useEffect(() => {
        setLoading(true)
        let total = 0
        products.forEach(item => {
            total += subtotal(item);
        });
        setTotalPrice(total)
        setProductsCart(products)
        setLoading(false)
    }, [products]);

    function subtotal(item) {
        const precio = parseFloat(item.product.price)
        const pordescuent = parseFloat(item.product.discountPercentage)
        const quantityproduct = parseInt(item.quantity)

        return (precio * (100 - pordescuent)) * quantityproduct
    }

    if (isLoading||isLoadingLocation||loading) return (
        <Loading />
    );

    return (
        <View>
            {localId ?
                <SubmitButton
                    text
                    actionButton={() => navigation.navigate("MyOrders")}
                    title={"Mis ordenes"}
                /> :
                <></>}
            {productsCart.length == 0 ?
                <Text>Carrito vacio</Text> :
                <View><Text>Listado de Productos:</Text>
                    <FlatList
                        data={productsCart}
                        keyExtractor={(item) => item.product.id}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.product.title}</Text>
                                <Text>{item.quantity}</Text>
                                <Text>Subtotal: {formatPrice(subtotal(item))}</Text>
                                <Pressable onPress={() => eliminatedProductCart(item.product)}>
                                    <Text>Eliminar</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                    <Text>Total: {formatPrice(totalPrice)}</Text>
                    <SubmitButton
                        text
                        actionButton={eliminatedCart}
                        title={"Eliminar todo"}
                    />
                    <SubmitButton
                        text
                        actionButton={orderCart}
                        title={"Ordenar"}
                    /></View>}
            <ModalAlert
                visible={modal}
                modalText={textModal}
                confirmAction={handleModalAction}
                cancelAction={() => setModal(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});