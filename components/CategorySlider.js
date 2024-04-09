import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router';

const CategorySlider = () => {
    const [loading, setLoading] = useState(false)
    const [mealsByCategory, setMealsBycategory] = useState([])
    const fetchMealByCategory = async (category) => {
        setLoading(true)
        try {
            const res = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {
                method: 'GET',
                headers: {
                    "content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMealsBycategory(data?.meals)
        } catch (error) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchMealByCategory("Beef")
    }, [])
    return (
        <View>
            <View className="flex flex-row items-center justify-between px-2">
                <Text className="p-4 text-center text-lg font-bold">Filter Meals by category</Text>
            </View>
            <View className="flex flex-row gap-1 items-center flex-wrap p-4">
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Beef")}>
                    <Text>Beef</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Breakfast")}>
                    <Text>Breakfast</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Chicken")}>
                    <Text>Chicken</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Dessert")}>
                    <Text>Dessert</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Goat")}>
                    <Text>Goat</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Lamb")}>
                    <Text>Lamb</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Pasta")}>
                    <Text>Pasta</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Seafood")}>
                    <Text>Seafood</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Vegan")}>
                    <Text>Vegan</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Vegetarian")}>
                    <Text>Vegetarian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Starter")}>
                    <Text>Starter</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByCategory("Pork")}>
                    <Text>Pork</Text>
                </Pressable>
            </View>
            <ScrollView className="space-x-4 mt-4 px-4" horizontal showsHorizontalScrollIndicator={false}>
                {
                    loading ? <View className="flex justify-center items-center w-full h-full">
                        <Text>Loading..</Text>
                    </View> :
                        mealsByCategory?.map((meal, index) => (
                            <Pressable onPress={() => { router.push(`/meal/${meal.idMeal}`) }} key={index} className="flex items-center">
                                <Image className="h-24 w-40" source={{
                                    uri: meal?.strMealThumb
                                }} />
                                <Text>{meal?.strMeal}</Text>
                            </Pressable>
                        ))
                }

            </ScrollView >
        </View>
    )
}
export default CategorySlider
