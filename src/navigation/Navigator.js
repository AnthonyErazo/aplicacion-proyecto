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
import ProductCategories from '../screens/ProductCategoriesScreen'
import CategoriesStack from './CategoriesStack'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
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
                    } else if (route.name === 'CategoriesStack') {
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
                name="CategoriesStack"
                component={CategoriesStack}
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
    );
};

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='MainTabs'
                screenOptions={
                    () => {
                        return {
                            headerShown: false,
                        }
                    }
                }
            >
                <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}