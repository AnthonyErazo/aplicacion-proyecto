import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import ProductList from './ProductList';

const CarouselProducts = ({ products,navigation,display }) => {
    const carouselRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const { width: screenWidth } = Dimensions.get('window');

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentPage < products.length - 1) {
                carouselRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
                setCurrentPage(prev => prev + 1);
            } else {
                carouselRef.current.scrollToIndex({ animated: true, index: 0 });
                setCurrentPage(0);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentPage]);

    const renderProductItem = ({ item }) => {
        return (
            <View style={{ width: screenWidth }}>
                <ProductList key={item.id} product={item} navigation={navigation} display={display} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={carouselRef}
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={event => {
                    setCurrentPage(Math.floor(event.nativeEvent.contentOffset.x / screenWidth));
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },
    paginationDot: {
        fontSize: 30,
        color: 'gray',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        color: 'black',
    },
});

export default CarouselProducts;
