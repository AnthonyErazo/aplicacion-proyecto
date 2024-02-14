import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProbuctsCart, detletProbuctCartById } from '../../features/cart/cartSlice';
import { useGetUserLocationQuery, usePostOrderMutation } from '../../app/services/userService';
import ModalAlert from '../../components/ModalAlert';
import SubmitButton from '../../components/SubmitButton';
import WaveLoading from '../../components/WaveLoading';
import { Entypo } from '@expo/vector-icons';
import { subtotal } from '../../utils/formatPriceReal';

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
    const { data: dataLocation, isLoading: isLoadingLocation } = useGetUserLocationQuery(localId)

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
            navigation.navigate("Account")
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

    if (isLoading || isLoadingLocation || loading) return (
        <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />
    );

    return (
        <View style={styles.container}>
            {localId ?
                <SubmitButton
                    text
                    actionButton={() => navigation.navigate("MyOrders")}
                    title={"Mis ordenes"}
                    buttonStyle={styles.buttonOrder}
                /> :
                <></>}
            {productsCart.length == 0 ?
                <Text style={styles.emptyCartText}>Carrito vacio</Text> :
                <View><Text style={styles.productsTitle}>Listado de Productos:</Text>
                    <FlatList
                        data={productsCart}
                        keyExtractor={(item) => item.product.id}
                        renderItem={({ item }) => (
                            <View style={styles.productItemContainer}>
                                <Text style={styles.productTitle}>{item.product.title}</Text>
                                <Text style={styles.productQuantity}>Cantidad:{item.quantity}</Text>
                                <Text style={styles.productSubtotal}>Subtotal: {subtotal(item)}</Text>
                                <View style={styles.iconsContainer}>
                                    <Pressable style={styles.eyeButtonContainer} onPress={() => navigation.navigate('ProductDetail', { productId:item.product.id })}>
                                        <Entypo name={"eye"} size={20} color={"gray"} style={styles.eyeButton} />
                                    </Pressable>
                                    <Pressable style={styles.trashButtonContainer} onPress={() => eliminatedProductCart(item.product)}>
                                        <Entypo name={"trash"} size={20} color={"red"} style={styles.trashButton} />
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
                    <Text style={styles.totalText}>Total: {totalPrice}</Text>
                    <SubmitButton
                        text
                        actionButton={eliminatedCart}
                        title={"Eliminar todo"}
                        buttonStyle={styles.buttonEliminateAll}
                    />
                    <SubmitButton
                        text
                        actionButton={orderCart}
                        title={"Ordenar"}
                        buttonStyle={styles.buttonConfirmCart}
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
    container: {
        flex: 1,
        padding: 20,
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItemContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 14,
        marginTop: 5,
    },
    productSubtotal: {
        fontSize: 14,
        marginTop: 5,
        color: 'green',
    },
    iconsContainer:{
        position: 'absolute',
        top: '50%',
        right: 20,
        flexDirection:'row'
    },
    trashButtonContainer: {
        margin:10
    },
    trashButton: {
        borderColor: '#646464',
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderWidth:1,
        borderRadius:10
    },
    eyeButtonContainer:{
        margin:10
    },
    eyeButton:{
        borderColor: '#646464',
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderWidth:1,
        borderRadius:10
    },
    buttonOrder: {
        backgroundColor: '#4C7BC8',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonEliminateAll: {
        backgroundColor: '#ff6666',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonConfirmCart: {
        backgroundColor: '#4C7BC8', 
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 10,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});