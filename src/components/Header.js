import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../global/color'

export default function Header({title,route}) {
    if(route.name=='Search') return null;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.green2,
        textAlign:'center',
        padding:15
    },
    title:{
        fontSize:20,
        textAlign:'center'
    }
});