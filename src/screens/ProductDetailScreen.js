import { View } from 'react-native';
import Navbar from '../components/Navbar';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailScreen({ product, handleBackPress }) {
    return (
        <View>
            <Navbar handleBackPress={handleBackPress} />
            <ProductDetail product={product} />
        </View>
    );
}
