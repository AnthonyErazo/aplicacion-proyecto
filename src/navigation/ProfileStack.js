import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import ImageSelectorScreen from '../screens/ImageSelectorScreen'
import LocationSelectorScreen from '../screens/LocationSelectorScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

const Stack = createNativeStackNavigator()

export default function ProfileStack () {
  return (
    <Stack.Navigator
        initialRouteName='MyProfile'
        screenOptions={
            () => {
                return {
                    headerShown: false,
                }
            }
        }
    >
        <Stack.Screen name="MyProfile" component={ProfileScreen} />
        <Stack.Screen name="ImageSelector" component={ImageSelectorScreen} />
        <Stack.Screen name="LocationSelector" component={LocationSelectorScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}