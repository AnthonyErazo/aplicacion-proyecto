import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProductCart } from '../features/cart/cartSlice';
import SubmitButton from './SubmitButton';
import ModalAlert from './ModalAlert';
import CarrouselImageProduct from './CarrouselImageProduct';
import { buton } from '../global/buton';
import CloseButton from './CloseButton';
import { formatPriceReal } from '../utils/formatPriceReal';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [subtotal, setSubtotal] = useState(product.price);

  const [modal, setModal] = useState(false);
  const [textModal, setTextModal] = useState("");

  const handleModalAction = () => {
    dispatch(setProductCart({ product, quantity }))
    setModal(false);
  };

  const quantityPlus = () => {
    setQuantity(quantity + 1);
    updateSubtotal(quantity + 1);
  };

  const quantityReduce = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateSubtotal(quantity - 1);
    }
  };

  const updateSubtotal = (qty) => {
    const newSubtotal = (formatPriceReal(product) * qty).toFixed(2);
    setSubtotal(newSubtotal);
  };

  const addToCart = () => {
    const realPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    const subtotal = (realPrice * quantity).toFixed(2);
    setTextModal(
      `Está por añadir:\nProducto: ${product.title}\nCantidad: ${quantity}\nPrecio Real: $${realPrice}\nSubtotal: $${subtotal}`
    );
    setModal(true);
  };

  return (
      <ScrollView>
        <CloseButton/>
        <View style={styles.container}>
          <CarrouselImageProduct product={product}/>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.priceStrike}>Precio: ${product.price.toFixed(2)}</Text>
          <Text style={styles.priceDiscount}>
            Descuento: {product.discountPercentage}% (Precio Real: ${formatPriceReal(product)})
          </Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.ratingContainer}>
            {product.rating && (
              <>
                <Text style={styles.ratingTitle}>
                  Rating:{' '}
                  {[...Array(Math.floor(product.rating))].map((_, index) => (
                    <AntDesign key={index} name="star" size={20} color="#f1c40f" style={styles.star} />
                  ))}{' '}
                  {product.rating}
                </Text>
              </>
            )}
          </View>
          <View style={styles.quantityContainer}>
            <SubmitButton
              text
              actionButton={quantityReduce}
              title={"-"}
              textStyle={styles.quantityButtonText}
            buttonStyle={styles.quantityButton}
            />
            <Text style={styles.quantityText}>{quantity}</Text>
            <SubmitButton
              text
              actionButton={quantityPlus}
              title={"+"}
              textStyle={styles.quantityButtonText}
            buttonStyle={styles.quantityButton}
            />
          </View>
          <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>
          <SubmitButton
            text
            actionButton={addToCart}
            title={"Agregar al carrito"}
            buttonStyle={styles.addButton}
            textStyle={styles.addText}
          />
          <ModalAlert
            visible={modal}
            modalText={textModal}
            confirmAction={handleModalAction}
            cancelAction={() => setModal(false)}
          />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  brand: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
    textAlign: 'center',
  },
  priceStrike: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceDiscount: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    marginTop: 2,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  star: {
    marginRight: 3,
  },
  swiperContainer: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#3498db',
  },
  paginationActiveDot: {
    backgroundColor: '#bdc3c7',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityText: {
    fontSize: 22,
    marginHorizontal: 10,
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityButtonText:{
    color:'#111',
    fontSize:15,
  },
  quantityButton:{
    backgroundColor:'#E5E5E5',
    width:40,
    borderColor:'#A9A9A9',
    borderWidth:1
  },
  addButton:{
    ...buton,
  },
  addText:{
    color:'#4C7BC8',
  }
});
