import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const WaveLoading = ({ size = 10, color = '#0000ff', style }) => {
    const dot1Size = useRef(new Animated.Value(1)).current;
    const dot2Size = useRef(new Animated.Value(1)).current;
    const dot3Size = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loopAnimation = () => {
            Animated.sequence([
                Animated.timing(dot1Size, {
                    toValue: 1.5,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(dot1Size, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(dot2Size, {
                    toValue: 1.5,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(dot2Size, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(dot3Size, {
                    toValue: 1.5,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(dot3Size, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),
            ]).start(loopAnimation);
        };

        loopAnimation();

        return () => {
            dot1Size.setValue(1);
            dot2Size.setValue(1);
            dot3Size.setValue(1);
        };
    }, []);

    const dotStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
    };

    return (
        <View style={[styles.container, style]}>
            <Animated.View style={[dotStyle, styles.dot, { transform: [{ scale: dot1Size }] }]} />
            <Animated.View style={[dotStyle, styles.dot, { transform: [{ scale: dot2Size }] }]} />
            <Animated.View style={[dotStyle, styles.dot, { transform: [{ scale: dot3Size }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        marginHorizontal: 4,
    },
});

export default WaveLoading;
