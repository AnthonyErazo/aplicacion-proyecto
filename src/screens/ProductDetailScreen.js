import { useGetProductQuery } from '../app/services/shopServices';
import Loading from '../components/Loading';
import ProductDetail from '../components/ProductDetail';
import WaveLoading from '../components/WaveLoading';

export default function ProductDetailScreen({ navigation,route }) {
    const {productId}=route.params
    const {data:productSelected,isLoading}= useGetProductQuery(productId)
    if(isLoading) return <WaveLoading size={10} color="#0000ff" style={{ marginTop: 20 }} />
    return (
        <>
            <ProductDetail product={productSelected} />
        </>
    );
}
