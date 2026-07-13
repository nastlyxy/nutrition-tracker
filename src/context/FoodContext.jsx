import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import {UserContext} from "./UserContext"
import { calculateBMR, calculateTDEE, calculateMacros } from "../utils/calculator";
import toast from "react-hot-toast";

export const FoodContext = createContext();

function getTodayDay() {
  return new Date().toISOString().split("T")[0];
}

export function FoodProvider({ children }) {
  const [currentDay, setCurrentDay] = useState(getTodayDay());
  const [foods, setFoods] = useState([]);
  const [daySnapshot, setDaySnapshot] = useState(null);

  const { user } = useContext(AuthContext);
  const { userStats } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const fetchDailyFoods = async () => {
      const docRef = doc(db, "users", user.uid, "daily_logs", currentDay);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dbData = docSnap.data();
        setFoods(dbData.foods || []); 
        setDaySnapshot(dbData.macrosSnapshot || null);
      } else {
        setFoods([]);
        setDaySnapshot(null);
      }
    };
    fetchDailyFoods();
  }, [currentDay, user]);

  const handleAddFood = async (newFood) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "daily_logs", currentDay);
    const dataToSave = {
      foods: arrayUnion(newFood) 
    };
    if (!daySnapshot) {
      const userBMR = calculateBMR(userStats.weight, userStats.age, userStats.height, userStats.gender);
      const userTDEE = calculateTDEE(userBMR, userStats.activityLevel);
      const freshMacros = calculateMacros(userStats.weight, userTDEE, userStats.goal);
      
      dataToSave.macrosSnapshot = freshMacros;
      setDaySnapshot(freshMacros); 
    }
    await setDoc(docRef, dataToSave, { merge: true });
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };
  const handleDeleteFood = async (id) => {
    if (!user) return;
    
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    
    const docRef = doc(db, "users", user.uid, "daily_logs", currentDay);
    await setDoc(docRef, { foods: updatedFoods }, { merge: true });
    toast.success("Meal deleted!");
  };

  return (
    <FoodContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        foods,
        handleAddFood,
        handleDeleteFood,
        daySnapshot,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
