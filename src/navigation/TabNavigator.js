import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons';
import CartScreen from '../screens/CartScreen'
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabel: () => null,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Categories') {
                        iconName = 'menu';
                    } else if (route.name === 'Cart') {
                        iconName = 'cart';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                header: () => {
                    return <>
                        <Header title={
                            route.name === 'ProductDetail' ? route.params.product.title : 'Shop'
                        } route={route} />
                    </>
                },
                headerShown: route.name !== 'Search',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{ tabBarLabel: 'Categories' }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{ tabBarLabel: 'Search' }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{ tabBarLabel: 'Cart' }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    )
}