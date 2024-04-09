import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const AreaSlider = () => {

    const [loading, setLoading] = useState(false)
    const [mealsByArea, setMealsByArea] = useState([])
    const fetchMealByArea = async (area) => {
        setLoading(true)
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`, {
                method: 'GET',
                headers: {
                    "content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMealsByArea(data.meals);
        } catch (error) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchMealByArea("Indian")
    }, [])

    return (
        <>
            <View className="flex flex-row items-center justify-between px-2">
                <Text className="p-4 text-center text-lg font-bold">Filter Meals by Area</Text>
            </View >
            <View className="flex flex-row gap-1 items-center flex-wrap p-4">
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Indian")}>
                    <Text>Indian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Thai")}>
                    <Text>Thai</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("French")}>
                    <Text>French</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("French")}>
                    <Text>Greek</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Egyptian")}>
                    <Text>Egyptian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Croatian")}>
                    <Text>Croatian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Japanese")}>
                    <Text>Japanese</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Canadian")}>
                    <Text>Canadian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Mexican")}>
                    <Text>Mexican</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Moroccan")}>
                    <Text>Moroccan</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("British")}>
                    <Text>British</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("American")}>
                    <Text>American</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Turkish")}>
                    <Text>Turkish</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Mexican")}>
                    <Text>Mexican</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Italian")}>
                    <Text>Italian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Chinese")}>
                    <Text>Chinese</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Tunisian")}>
                    <Text>Tunisian</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Dutch")}>
                    <Text>Dutch</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Irish")}>
                    <Text>Irish</Text>
                </Pressable>
                <Pressable className="p-[3px] bg-gray-300 rounded-lg" onPress={() => fetchMealByArea("Russian")}>
                    <Text>Russian</Text>
                </Pressable>
            </View>
            <ScrollView className="space-x-4 mt-4 px-4 " horizontal showsHorizontalScrollIndicator={false}>
                {
                    loading ? <View className="flex justify-center items-center w-full h-full">
                        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.red800} />
                    </View> :
                        mealsByArea?.map((meal, index) => (
                            <Pressable onPress={() => router.push(`/meal/${meal?.idMeal}`)} key={index} className="flex items-center">
                                <Image className="h-24 w-40" source={{
                                    uri: meal?.strMealThumb
                                }} />
                                <Text>{meal?.strMeal}</Text>
                            </Pressable>
                        ))
                }

            </ScrollView>
        </>
    )
}
export default AreaSlider
const styles = StyleSheet.create({})