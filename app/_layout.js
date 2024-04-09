import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'

export default function Layout() {
    return <PaperProvider>
        <Stack>
            <Stack.Screen options={{ title: 'Home', headerShown: false }} name="index" />
            <Stack.Screen options={{ title: 'Meal Detail', headerShown: false }} name="meal/[id]" />
            <Stack.Screen options={{ title: 'Favorite Meals', headerShown: false }} name="favoriteMeals/index" />
        </Stack>
    </PaperProvider>
}