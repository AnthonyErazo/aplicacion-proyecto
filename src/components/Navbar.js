import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {colors} from '../global/Color'

export default function Navbar({handleBackPress}) {
    return (
        <View style={styles.container}>
            <Pressable onPress={handleBackPress}>
                <Text style={styles.title}>Shop</Text>
            </Pressable>
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