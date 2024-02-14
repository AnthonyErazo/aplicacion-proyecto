import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/account/RegisterScreen'
import LoginScreen from '../screens/account/LoginScreen'

const Stack = createNativeStackNavigator()

export default function AuthStack () {
  return (
    <Stack.Navigator
        initialRouteName='Login'
        screenOptions={
            () => {
                return {
                    headerShown: false,
                }
            }
        }
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}