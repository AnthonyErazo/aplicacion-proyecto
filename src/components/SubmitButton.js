import { StyleSheet, Text, Pressable, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export default function SubmitButton ({title, actionButton, text, icon, nameIcon, colorIcon, sizeIcon, containerStyle, buttonStyle, textStyle, iconStyle }) {

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable style={[styles.button, buttonStyle]} onPress={actionButton}>
        {text ? <Text style={[styles.text, textStyle]}>{title}</Text> : <></>}
        {icon ? <AntDesign name={nameIcon} size={sizeIcon} color={colorIcon} style={[styles.icon, iconStyle]} /> : <></>}
      </Pressable>
    </View>
  )
}



const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    margin:10,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    margin: 10,
  },
  
})