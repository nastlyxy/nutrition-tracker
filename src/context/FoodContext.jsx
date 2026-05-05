import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const FoodContext = createContext();

function getTodayDay(){
  return new Date().toISOString().split("T")[0];
}

export function FoodProvider({ children }) {
  const [history, setHistory] = useLocalStorage("foodHistory", {});
  const [currentDay, setCurrentDay] = useState(getTodayDay());
  const foods = history[currentDay] || [];

  const handleAddFood = (newFood) => {
    setHistory((prevHistory) => {
      const currentDayFoods = prevHistory[currentDay] || [];
      return {
        ...prevHistory, 
        [currentDay]: [...currentDayFoods, newFood],
      };
    });
  };
  const handleDeleteFood = (id) => {
    setHistory((prevHistory)=>{
      const currentDayFoods = prevHistory[currentDay] || [];
      return {
        ...prevHistory,
        [currentDay]: currentDayFoods.filter(food => food.id !== id)
      }
    })
  };

  return(
    <FoodContext.Provider value={{history, currentDay, setCurrentDay, foods, handleAddFood, handleDeleteFood}}>
        {children}
    </FoodContext.Provider>
  )
}
