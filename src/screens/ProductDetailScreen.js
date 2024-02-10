import { useGetProductQuery } from '../app/services/shopServices';
import Loading from '../components/Loading';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailScreen({ navigation,route }) {
    const {productId}=route.params
    const {data:productSelected,isLoading}= useGetProductQuery(productId)
    if(isLoading) return <Loading />
    return (
        <>
            <ProductDetail product={productSelected} />
        </>
    );
}
