import { create } from "zustand";

const useStoreProvider = create((set) => ({
    favoriteMeals: [],
    setFavoriteMeals: (favoriteMeals) => set({ favoriteMeals })
}))

export default useStoreProvider