import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ style }) {
    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});