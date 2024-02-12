import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { setProductSelected } from '../features/shop/shopSlice';
import {AntDesign} from '@expo/vector-icons'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function ProductList({ product, navigation, displayRating, displayDiscount }) {

  const handlePress = () => {
    navigation.navigate('ProductDetail', { productId:product.id });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.productItem}>
        <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.discountedPrice}>${calculateDiscountedPrice(product.price, product.discountPercentage)}</Text>
          {(!displayRating && !displayDiscount) && (
            <Text style={styles.productDescription}>{product.description}</Text>
          )}
          {displayRating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingTitle}>
                Rating: {[...Array(Math.floor(product.rating))].map((_, index) => (
                  <AntDesign key={index} name="star" size={15} color="#f1c40f" style={styles.star} />
                ))} {product.rating}
              </Text>
            </View>
          )}
          {displayDiscount && (
            <View style={styles.discountContainer}>
              <Text style={styles.regularPrice}>${product.price}</Text>
              <Text style={styles.discountPercentage}>{product.discountPercentage}% Descuento</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 160,
  },
  thumbnail: {
    width: windowWidth * 0.2,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e44d26',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingTitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 3,
  },
  star: {
    marginRight: 3,
  },
  discountContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  regularPrice: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  discountPercentage: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 3,
  },
});

function calculateDiscountedPrice(regularPrice, discountPercentage) {
  const discountAmount = (regularPrice * discountPercentage) / 100;
  const discountedPrice = regularPrice - discountAmount;
  return discountedPrice.toFixed(2);
}
