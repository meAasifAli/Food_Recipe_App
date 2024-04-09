import { router } from 'expo-router'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

const SearchedMeals = ({ searchedMeals }) => {
    return (
        <View>
            <Text className="text-lg font-bold p-2">Searched Meals</Text>
            <ScrollView className="space-x-4" horizontal showsHorizontalScrollIndicator={false}>
                {searchedMeals?.map((meal, index) => (
                    <Pressable onPress={() => router.push(`/meal/${meal?.idMeal}`)} key={index} className="flex items-center">
                        <Image className="h-24 w-40" source={{
                            uri: meal?.strMealThumb
                        }} />
                        <Text>{meal?.strMeal}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}
export default SearchedMeals
