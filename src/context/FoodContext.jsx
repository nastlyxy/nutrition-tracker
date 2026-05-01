import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foods, setFoods] = useLocalStorage("trackerFoods", []);

  const handleAddFood = (newFood) => {
    setFoods([...foods, newFood]);
  };
  const handleDeleteFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  return(
    <FoodContext.Provider value={{foods, handleAddFood, handleDeleteFood}}>
        {children}
    </FoodContext.Provider>
  )
}
