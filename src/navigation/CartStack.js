import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartScreen'
import OrdersScreen from '../screens/OdersScreen'
import OrdersDetailsScreen from '../screens/OrderDetailsScreen'

const Stack = createNativeStackNavigator()

export default function CartStack () {
  return (
    <Stack.Navigator
        initialRouteName='CartProducts'
        screenOptions={
            () => {
                return {
                    headerShown: false,
                }
            }
        }
    >
        <Stack.Screen name="CartProducts" component={CartScreen} />
        <Stack.Screen name="MyOrders" component={OrdersScreen} />
        <Stack.Screen name="OrderDetails" component={OrdersDetailsScreen} />
    </Stack.Navigator>
  )
}