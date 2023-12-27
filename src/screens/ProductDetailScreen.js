import ProductDetail from '../components/ProductDetail';
import { useSelector } from 'react-redux'

export default function ProductDetailScreen({ navigation,route }) {
    const productSelected = useSelector((state) => state.shop.value.productSelected)
    const {product}=route.params
    return (
        <>
            <ProductDetail product={productSelected} />
        </>
    );
}
