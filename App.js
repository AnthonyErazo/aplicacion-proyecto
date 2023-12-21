import { useFonts } from 'expo-font';
import { StyleSheet,StatusBar } from 'react-native';
import { colors } from './src/global/Color';
import Navigator from './src/navigation/Navigator';
import { fonts } from './src/global/fonts';

export default function App() {

  const [fontLoaded] = useFonts(fonts)
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