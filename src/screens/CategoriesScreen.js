import { View, StyleSheet, FlatList } from 'react-native';
import { useGetCategoriesQuery } from '../app/services/shopServices';
import Loading from '../components/Loading';
import SubmitButton from '../components/SubmitButton';

export default function CategoriesScreen({ navigation }) {
    const { data: categories, isLoading } = useGetCategoriesQuery()
    const formatCategory = (category) => {
        return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };
    if (isLoading) return <Loading />
    return (
        <View style={styles.modalContainer}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <SubmitButton   
                        actionButton={() => {
                            navigation.navigate('ProductCategories', { item })
                        }}
                        text
                        title={formatCategory(item)}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'green'
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
    buttonContainer:{
        backgroundColor:'red',
        marginBottom:10,
        marginTop:10,
        width:300
    },
    button:{

    },
    buttonText:{
        textAlign:'center',
        fontSize:18
    }
});