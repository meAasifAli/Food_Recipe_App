import { Image, Pressable, ScrollView, Text, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useStoreProvider from '../../store/provider'
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';


const FavoriteMeals = () => {
    const { favoriteMeals, setFavoriteMeals } = useStoreProvider()

    const handleRemoveItem = (item) => {
        setFavoriteMeals(favoriteMeals.filter((meal) => meal?.idMeal !== item.idMeal))
        ToastAndroid.show("Item has been removed", ToastAndroid.SHORT)
    }
    return (
        <SafeAreaView className="px-4">
            <ScrollView className="space-y-4">
                <Text className="text-2xl font-bold text-center">Favorites</Text>
                <Divider />
                {favoriteMeals?.map((item, id) => {
                    return <Pressable className="flex flex-row  items-center justify-between" key={id}>
                        <Image className="h-16 w-16 rounded-full object-contain" source={{
                            uri: item?.strMealThumb
                        }} />
                        <Text className="text-xl font-bold">{item?.strMeal}</Text>
                        <MaterialIcons onPress={() => handleRemoveItem(item)} name="delete-outline" size={24} color="black" />
                    </Pressable>
                })}
            </ScrollView>
        </SafeAreaView>
    )
}
export default FavoriteMeals
