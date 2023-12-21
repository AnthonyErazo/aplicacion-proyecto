import { View,ScrollView } from 'react-native';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailScreen({ navigation,route }) {
    const {product}=route.params
    return (
        <ScrollView>
            <ProductDetail product={product} />
        </ScrollView>
    );
}
