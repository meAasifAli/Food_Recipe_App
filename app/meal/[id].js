import { Text, View, Image, ScrollView, ToastAndroid } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStoreProvider from '../../store/provider'

const MealDetail = () => {
    const { setFavoriteMeals, favoriteMeals } = useStoreProvider()
    const [loading, setLoading] = useState(false)
    const { id } = useLocalSearchParams()
    const [meal, setMeal] = useState({})
    useEffect(() => {
        const fetchMealById = async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
                    method: 'GET',
                    headers: {
                        "content-Type": "application/json"
                    }
                })
                const data = await res.json()
                setMeal(data?.meals[0]);
            } catch (error) {
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        fetchMealById()
    }, [id])

    const handleAddToStore = (meal) => {

        setFavoriteMeals([...favoriteMeals, meal])
        ToastAndroid.show("Item has been Added to favorites", ToastAndroid.SHORT)
        router.push("/favoriteMeals")
    }

    const handleRemoveFromStore = (meal) => {

        setFavoriteMeals(favoriteMeals.filter((item) => item.idMeal !== meal.idMeal))
        ToastAndroid.show("Item has been removed from favorites", ToastAndroid.SHORT)
    }

    return loading ? <View className="flex justify-center items-center h-full">
        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.red800} />
    </View> : (
        <ScrollView>
            <View className="h-80 w-full">
                <Image className="relative h-full w-full object-contain" source={{
                    uri: meal?.strMealThumb
                }} />
                <SafeAreaView className="absolute right-6 top-2">
                    {
                        !favoriteMeals?.includes(meal) ? <AntDesign onPress={() => handleAddToStore(meal)} className="absolute" name="hearto" size={24} color="white" /> :
                            <AntDesign onPress={() => handleRemoveFromStore(meal)} name="heart" size={24} color="red" />
                    }
                </SafeAreaView>
            </View>
            <View className="flex flex-row p-4 items-center flex-wrap gap-2">
                <Text className=" font-bold  text-2xl pr-2">{meal?.strMeal}</Text>
                <Text className="h-1 w-1 bg-black rounded-full">&middot;</Text>
                <Text className=" font-bold  text-md">{meal?.strArea}</Text>
            </View>
            <View className="p-4">
                <Text className="font-bold text-lg">Instructions</Text>
                <Text className="tracking-wider">{meal?.strInstructions}</Text>
            </View>
            <View className="p-4 flex flex-row gap-2 items-center">
                <AntDesign name="tags" size={24} color="black" />
                <Text className="font-bold">{meal?.strTags}</Text>
            </View>
        </ScrollView>
    )
}
export default MealDetail
