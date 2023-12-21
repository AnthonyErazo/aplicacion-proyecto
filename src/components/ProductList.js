import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function ProductList({ product, navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("ProductDetail",{product})}>
      <View style={styles.productItem}>
        <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>
      </View>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff', // Fondo blanco
  },
  thumbnail: {
    width: 80,
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
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e44d26', // Color naranja
  },
});