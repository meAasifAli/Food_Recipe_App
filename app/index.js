import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import AreaSlider from '../components/AreaSlider';
import CategorySlider from '../components/CategorySlider';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import MealCategories from '../components/MealCategories';
import SearchedMeals from '../components/SearchedMeals';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStoreProvider from '../store/provider';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
    const { favoriteMeals } = useStoreProvider()
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false)
    const [randomMeal, setRandomMeal] = useState({})
    const [mealCategories, setMealCategories] = useState([])
    const [searchedMeals, setSearchedMeals] = useState([])

    useEffect(() => {
        const fetchRandomMeal = async () => {
            setLoading(true)
            try {
                const res = await fetch("http://www.themealdb.com/api/json/v1/1/random.php", {
                    method: 'GET',
                    headers: {
                        "content-Type": "application/json"
                    }
                })

                const singleMeal = await res.json()
                setRandomMeal(singleMeal.meals[0])
            } catch (error) {
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        fetchRandomMeal()
    }, [])
    useEffect(() => {
        const fetchMealCategories = async () => {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php", {
                method: 'GET',
                headers: {
                    "content-Type": "application/json"
                }
            })
            const categories = await res.json()
            setMealCategories(categories?.categories);
        }
        fetchMealCategories()
    }, [])

    useEffect(() => {
        const fetchMealsByQuery = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`, {
                    method: "GET",
                    headers: {
                        "content-Type": "application/json"
                    }
                })
                const data = await res.json()
                setSearchedMeals(data?.meals);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMealsByQuery()
    }, [searchQuery])
    return loading ? <View className="flex justify-center items-center w-full h-full">
        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.red800} />
    </View> : (
        <ScrollView className="mb-4">
            <View className="h-80">
                <Image className="relative h-full w-full object-contain" source={{
                    uri: randomMeal?.strMealThumb
                }} />
                <SafeAreaView className="absolute  p-4 w-full">
                    <Searchbar
                        placeholder="Search Meals by Name"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </SafeAreaView>
                <View className="absolute bottom-0 left-4 w-full p-4">

                    <View className="flex flex-row items-center flex-wrap gap-2">
                        <Text className=" font-bold text-white text-2xl pr-2">{randomMeal?.strMeal?.slice(0, 30)}</Text>
                        <Text className="bg-white h-1 w-1 rounded-full">&middot;</Text>
                        <Text className=" font-bold text-gray-200 text-md">{randomMeal?.strArea}</Text>
                    </View>
                    <Text className="text-white pr-2">{randomMeal?.strInstructions?.slice(0, 200)}</Text>
                </View>
            </View>
            <MealCategories mealCategories={mealCategories} />
            {
                searchQuery && <SearchedMeals searchedMeals={searchedMeals} />
            }
            <View className="p-4 space-y-2">
                {
                    favoriteMeals.length > 0 && <View className="flex flex-row items-center gap-2">
                        <Text className=" font-bold text-lg">Favorite Meals</Text>
                        <Ionicons onPress={() => router.push("/favoriteMeals")} name="navigate-circle-outline" size={17} color="black" />
                    </View>
                }
                <View className="flex flex-row items-center flex-wrap gap-2">
                    {
                        favoriteMeals.length > 0 && favoriteMeals?.map((item, id) => {
                            return <Pressable onPress={() => router.push(`/meal/${item?.idMeal}`)} key={id}>
                                <Text className="bg-gray-300 p-1 rounded-md">{item?.strMeal}</Text>
                            </Pressable>
                        })
                    }
                </View>
            </View>
            <AreaSlider />
            <CategorySlider />
        </ScrollView>
    )
}
export default Home
