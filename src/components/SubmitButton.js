import { StyleSheet, Text, Pressable, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


const SubmitButton = ({ title, actionButton, text, icon, nameIcon, colorIcon, sizeIcon, containerStyle, buttonStyle, textStyle, iconStyle }) => {

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable style={[styles.button, buttonStyle]} onPress={actionButton}>
        {text ? <Text style={[styles.text, textStyle]}>{title}</Text> : <></>}
        {icon ? <AntDesign name={nameIcon} size={sizeIcon} color={colorIcon} style={[styles.icon, iconStyle]} /> : <></>}
      </Pressable>
    </View>
  )
}


export default SubmitButton


const styles = StyleSheet.create({
  buttonContainer: {
  },
  button: {
  },
  text: {
  },
  icon: {
  },
})