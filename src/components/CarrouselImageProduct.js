import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import Loading from './Loading'; // Importar el componente Loading

const windowWidth = Dimensions.get('window').width;

export default function CarrouselImageProduct({ product }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingImage, setLoadingImage] = useState({loading:false,index:0});

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const scrolled = contentOffset.x;
        const position = Math.floor((scrolled + 0.5 * viewSize) / viewSize); 
        setCurrentIndex(position);
    };
    

    return (
        <View style={styles.containerImage}>
            <View style={styles.container}> 
                <FlatList
                    data={product.images}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item }} onLoadStart={() => setLoadingImage({loading:true,index})}
                                onLoadEnd={() => {
                                    setLoadingImage({loading:false,index})
                                }} style={styles.images} />
                            {(loadingImage.loading&&loadingImage.index==index)?<Loading />:<></>}
                        </View>
                    )}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>
            <View style={styles.indicatorContainer}>
                {product.images.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.indicator, index === currentIndex && styles.activeIndicator]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, 
    },
    container:{
        width: windowWidth * 0.8, 
    },
    imageContainer: {
        position: 'relative',
    },
    images: {
        width: windowWidth * 0.8, 
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: '#518BEB',
    },
});
