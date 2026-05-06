import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const FoodContext = createContext();

function getTodayDay() {
  return new Date().toISOString().split("T")[0];
}

export function FoodProvider({ children }) {
  const [currentDay, setCurrentDay] = useState(getTodayDay());
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchDailyFoods = async () => {
      const docRef = doc(db, "daily_logs", currentDay);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoods(docSnap.data().meals);
      } else {
        setFoods([]);
      }
    };
    fetchDailyFoods();
  }, [currentDay]);

  const handleAddFood = async (newFood) => {
    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    const docRef = doc(db, "daily_logs", currentDay);
    await setDoc(docRef, { meals: updatedFoods });
  };
  const handleDeleteFood = async (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    const docRef = doc(db, "daily_logs", currentDay);
    await setDoc(docRef, { meals: updatedFoods });
  };

  return (
    <FoodContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        foods,
        handleAddFood,
        handleDeleteFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
