import { useFonts } from 'expo-font';
import { StyleSheet,StatusBar } from 'react-native';
import { colors } from './src/global/color';
import Navigator from './src/navigation/Navigator';
import { fonts } from './src/global/fonts';
import { store } from './src/app/store'
import { Provider } from 'react-redux'

export default function App() {

  const [fontLoaded] = useFonts(fonts)
  if (!fontLoaded) return null

  return (
    <>
      <StatusBar
        backgroundColor={colors.green2}
        barStyle={"default"}
      />
      <Provider store={store}>
        <Navigator />
      </Provider>
    </>

  );
};

const styles = StyleSheet.create({
});