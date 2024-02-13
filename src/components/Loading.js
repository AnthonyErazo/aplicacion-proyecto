import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ circular, style }) {
    const containerStyle = circular ? styles.circularContainer : styles.container;
    return (
        <View style={[containerStyle, style]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    circularContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 200,
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});
