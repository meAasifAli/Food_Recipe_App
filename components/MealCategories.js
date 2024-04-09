import { Image, ScrollView, Text, View } from 'react-native'
const MealCategories = ({ mealCategories }) => {
    return (
        <View className="space-y-2 px-2">
            <Text className="text-lg font-bold p-2">Meal Categories</Text>
            <ScrollView className="space-x-4" horizontal showsHorizontalScrollIndicator={false}>
                {
                    mealCategories?.map((category, index) => (
                        <View key={index} className="flex items-center">
                            <Image className="h-12 w-20" source={{
                                uri: category?.strCategoryThumb
                            }} />
                            <Text>{category?.strCategory}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}
export default MealCategories
