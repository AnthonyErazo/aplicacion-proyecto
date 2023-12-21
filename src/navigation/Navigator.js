import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import Header from '../components/Header'


const Stack = createNativeStackNavigator()

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={
                    ({ route }) => {
                        return {
                            header: () => {
                                return <>
                                <Header title={
                                    route.name === 'ProductDetail' ? route.params.product.title : 'Shop'
                                } route={route} />
                                </>
                            },
                            headerShown: route.name !== 'Search',
                        }
                    }
                }
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}