import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable,Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons'

const windowWidth = Dimensions.get('window').width;

export default function ProductList({ product, navigation, display }) {

  const handlePress = () => {
    navigation.navigate('ProductDetail', { productId:product.id });
  };
  const [descriptionLines, setDescriptionLines] = useState(4);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const lineHeight = 20; 
    const maxHeight = lineHeight * descriptionLines;

    if (descriptionRef.current) {
      descriptionRef.current.measure((x, y, width, height) => {
        if (height > maxHeight) {
          setDescriptionLines(Math.floor(maxHeight / lineHeight));
        }
      });
    }
  }, [product.description, descriptionLines]);

  return (
    <View>
      <Pressable onPress={handlePress} style={styles.productItem}>
        <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.title}</Text>
          {(!(display=='rating') && !(display=='discount') && !(display=='stock')) && (
            <Text
            style={[styles.productDescription, { height: descriptionLines * 20 }]}
            numberOfLines={descriptionLines}
            ref={descriptionRef}
          >
            {product.description}
          </Text>
          )}
          <Text style={styles.discountedPrice}>${calculateDiscountedPrice(product.price, product.discountPercentage)}</Text>
          {(display=='rating') && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingTitle}>
                Rating: {[...Array(Math.floor(product.rating))].map((_, index) => (
                  <AntDesign key={index} name="star" size={15} color="#f1c40f" style={styles.star} />
                ))} {product.rating}
              </Text>
            </View>
          )}
          {(display=='discount') && (
            <View style={styles.discountContainer}>
              <Text style={styles.regularPrice}>${product.price}</Text>
              <Text style={styles.discountPercentage}>{product.discountPercentage}% Descuento</Text>
            </View>
          )}
          {(display=='stock') && (
            <View style={styles.discountContainer}>
              <Text style={styles.stock}>Stock: {product.stock}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 160,
    alignItems:'center',
    marginLeft:10,
    marginRight:10
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
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
  stock:{
    fontSize: 18,
    color: 'gray',
  }
});

function calculateDiscountedPrice(regularPrice, discountPercentage) {
  const discountAmount = (regularPrice * discountPercentage) / 100;
  const discountedPrice = regularPrice - discountAmount;
  return discountedPrice.toFixed(2);
}
