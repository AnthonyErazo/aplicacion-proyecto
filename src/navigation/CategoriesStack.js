import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '../screens/categories/CategoriesScreen'
import ProductCategories from '../screens/categories/ProductCategoriesScreen'

const Stack = createNativeStackNavigator()

export default function CategoriesStack () {
  return (
    <Stack.Navigator
    initialRouteName='AllCategories'
    screenOptions={
        () => {
            return {
                headerShown: false,
            }
        }
    }
    >
        <Stack.Screen name="AllCategories" component={CategoriesScreen} />
        <Stack.Screen name="ProductCategories" component={ProductCategories} />
    </Stack.Navigator>
  )
}