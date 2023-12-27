import ProductDetail from '../components/ProductDetail';

export default function ProductDetailScreen({ navigation,route }) {
    const {product}=route.params
    return (
        <>
            <ProductDetail product={product} />
        </>
    );
}
