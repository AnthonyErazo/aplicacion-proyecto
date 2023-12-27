import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

export default function ProductDetail({ product }) {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Pressable
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButton}>
          <AntDesign name="left" size={30} color="#2c3e50" />
        </View>
      </Pressable>
      <View style={styles.container}>
        <Swiper
          style={styles.swiperContainer}
          showsPagination
          dotStyle={styles.paginationDot}
          activeDotStyle={styles.paginationActiveDot}
        >
          {product.images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.additionalImage} />
            </View>
          ))}
        </Swiper>
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
});
