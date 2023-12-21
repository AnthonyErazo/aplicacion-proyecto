import { useFonts } from 'expo-font';
import { StyleSheet,StatusBar } from 'react-native';
import { colors } from './src/global/Color';
import Navigator from './src/navigation/Navigator';

export default function App() {

  const [fontLoaded] = useFonts({
    Josefin: require("./assets/Fonts/JosefinSans-Bold.ttf")
  })
  if (!fontLoaded) return null

  return (
    <>
      <StatusBar
        backgroundColor={colors.green2}
        barStyle={"default"}
      />
      <Navigator />
    </>

  );
};

const styles = StyleSheet.create({
});