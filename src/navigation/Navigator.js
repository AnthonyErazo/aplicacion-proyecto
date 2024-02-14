import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home/HomeScreen'
import SearchScreen from '../screens/home/SearchScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import Header from '../components/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoriesStack from './CategoriesStack'
import AuthStack from './AuthStack'
import { useDispatch, useSelector } from 'react-redux'
import ProfileStack from './ProfileStack'
import { setUser } from '../features/auth/authSlice'
import { fechSession } from '../database'
import { useEffect } from 'react'
import CartStack from './CartStack'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const dispatch = useDispatch()
    const idToken = useSelector(state => state.auth.value.idToken)

    useEffect(() => {
        fechSession()
            .then(result => {
                console.log(result)
                if(result.rows.length>0){
                    const { email, localId, idToken } = result.rows._array[0]
                    const data = {
                        email,
                        localId,
                        idToken
                    }
                    dispatch(setUser(data))
                }
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabel: () => null,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Account') {
                        iconName = 'account';
                    } else if (route.name === 'Categories') {
                        iconName = 'menu';
                    } else if (route.name === 'Cart') {
                        iconName = 'cart';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
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
                component={CategoriesStack}
                options={{ tabBarLabel: 'Categories' }}
            />
            <Tab.Screen
                name="Account"
                component={idToken ? ProfileStack : AuthStack}
                options={{ tabBarLabel: 'Account' }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStack}
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
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}