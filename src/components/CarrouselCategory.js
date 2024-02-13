import { View, FlatList, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CarouselCategory({ category, navigation }) {

    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const renderVerMasItem = () =>(
        <View>
            <Pressable style={styles.categoryContainer} onPress={() => {
                navigation.navigate('AllCategories');
            }}>
                <View style={styles.categoryInnerContainer}>
                    <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/reactnativeapp-d0505.appspot.com/o/arrow-right-to-arc-svgrepo-com.png?alt=media&token=62e47062-40a1-42b7-8837-d38e57e7c304" }} style={styles.image} />
                    <Text style={styles.text}>Ver mas</Text>
                </View>
            </Pressable>
        </View>
    )
    return (
        <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View>
                    <Pressable style={styles.categoryContainer} onPress={() => {
                        navigation.navigate('ProductCategories', { item: item.name })
                    }}>
                        <View style={styles.categoryInnerContainer}>
                            <Image source={{ uri: item.iconUrl }} style={styles.image} />
                            <Text style={styles.text}>{formatCategory(item.name)}</Text>
                        </View>
                    </Pressable>
                </View>
            )}
            ListFooterComponent={renderVerMasItem}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginBottom: 50
    },
    categoryContainer: {
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: screenWidth / 4,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: screenWidth / 2,
        aspectRatio: 1,
    },
    categoryInnerContainer: {
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
    },
});