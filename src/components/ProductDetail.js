import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, FlatList,ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const navigation = useNavigation();

  return (
    <ScrollView>
        <View>
          <Pressable onPress={()=>navigation.goBack()}>
            <Text>Ir atras</Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Image source={{ uri: selectedImage }} style={styles.mainImage} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.price}>${product.price}</Text>
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
          <View style={styles.imageContainer}>
            {product.images && product.images.length > 0 && (
              <>
                <Text style={styles.imageTitle}>More Images:</Text>
                <FlatList
                  data={product.images}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => setSelectedImage(item)}
                      style={styles.imageButton}
                    >
                      <Image source={{ uri: item }} style={styles.additionalImage} />
                    </Pressable>
                  )}
                />
              </>
            )}
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  mainImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
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
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    height: 180
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageButton: {
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  additionalImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
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
});