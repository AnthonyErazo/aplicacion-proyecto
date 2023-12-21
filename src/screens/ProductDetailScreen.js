import { View } from 'react-native';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailScreen({ navigation,route }) {
    const {product}=route.params
    return (
        <View>
            <ProductDetail product={product} />
        </View>
    );
}
