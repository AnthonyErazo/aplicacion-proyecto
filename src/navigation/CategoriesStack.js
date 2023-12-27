import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '../screens/CategoriesScreen'
import ProductCategories from '../screens/ProductCategoriesScreen'
// import Header from '../Components/Header'

const Stack = createNativeStackNavigator()

export default function CategoriesStack () {
  return (
    <Stack.Navigator
    initialRouteName='Categories'
    screenOptions={
        () => {
            return {
                headerShown: false,
            }
        }
    }
    >
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="ProductCategories" component={ProductCategories} />
    </Stack.Navigator>
  )
}