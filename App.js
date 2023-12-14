import { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [fontLoaded]=useFonts({
    Josefin:require("./assets/Fonts/JosefinSans-Bold.ttf")
  })
  if(!fontLoaded) return null
  const handleSearchPress = () => {
    setScreen('Search');
  };

  const handleBackPress = () => {
    setScreen('Home');
  };
  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setScreen('ProductDetail');
  };

  return (
    <View style={styles.container}>
      {screen === 'Home' && (
        <HomeScreen
        handleBackPress={handleBackPress}
        handleSearchPress={handleSearchPress}
        handleProductPress={handleProductPress}
      />
      )}
      {screen === 'Search' && (
        <SearchScreen
        handleProductPress={handleProductPress}
        handleBackPress={handleBackPress} />
      )}
      {screen === 'ProductDetail' && (
        <ProductDetailScreen
          product={selectedProduct}
          handleBackPress={handleBackPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  }
});