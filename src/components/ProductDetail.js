import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProductCart } from '../features/cart/cartSlice';
import SubmitButton from './SubmitButton';
import ModalAlert from './ModalAlert';
import Loading from './Loading';

export default function ProductDetail({ product }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [subtotal, setSubtotal] = useState(product.price);
  const [loadingImage, setLoadingImage] = useState(false);

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
    const realPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    const newSubtotal = (realPrice * qty).toFixed(2);
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
      <SubmitButton
      icon
      nameIcon={"left"}
      sizeIcon={30}
      colorIcon={"#2c3e50"}
      buttonStyle={styles.backButton}
      containerStyle={styles.backButtonContainer}
      actionButton={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Swiper
          style={styles.swiperContainer}
          showsPagination
          dotStyle={styles.paginationDot}
          activeDotStyle={styles.paginationActiveDot}
        >
          {product.images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: image }}
                style={styles.additionalImage}
                onLoadStart={()=>setLoadingImage(true)}
                onLoadEnd={()=>{
                  setLoadingImage(false)
                }}
              />
              {loadingImage?<Loading />:<></>}
            </View>
          ))}
        </Swiper>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.priceStrike}>Precio: ${product.price.toFixed(2)}</Text>
        <Text style={styles.priceDiscount}>
          Descuento: {product.discountPercentage}% (Precio Real: ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)})
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
          />
          <Text style={styles.quantityText}>{quantity}</Text>
          <SubmitButton
            text
            actionButton={quantityPlus}
            title={"+"}
          />
        </View>
        <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>
        <SubmitButton
          text
          actionButton={addToCart}
          title={"Agregar al carrito"}
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
    marginTop: 60
  },
  additionalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
