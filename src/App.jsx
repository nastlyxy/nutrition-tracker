import { useState, useEffect } from "react";
import {
  calculateBMR,
  calculateTDEE,
  calculateMacros,
} from "./utils/calculator";
import {useLocalStorage } from "./hooks/useLocalStorage"

import SummaryCard from "./components/SummaryCard";
import FoodList from "./components/FoodList";
import AddFoodForm from "./components/AddFoodForm";

function App() {
  const userWeight = 60;
  const userHeight = 167;
  const userAge = 18;
  const userGender = "female";
  const userActivity = "moderate";

  const userBMR = calculateBMR(userWeight, userAge, userHeight, userGender);
  const userTDEE = calculateTDEE(userBMR, userActivity);
  const userMacros = calculateMacros(userWeight, userTDEE);

  const [foods, setFoods] = useLocalStorage("trackerFoods", []);

  const handleAddFood = (newFood) => {
    setFoods([...foods, newFood]);
  };
  const handleDeleteFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalFats = foods.reduce((sum, food) => sum + food.fats, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  return (
    <div className="mx-auto max-w-6xl min-h-screen bg-sky-100">
      <h1 className="text-2xl font-bold text-center pt-8">MacroTracker</h1>
      <SummaryCard
        consumedCalories={totalCalories}
        targetCalories={userTDEE}
        consumedProtein={totalProtein}
        consumedFats={totalFats}
        consumedCarbs={totalCarbs}
        targetProtein={userMacros.protein}
        targetFats={userMacros.fats}
        targetCarbs={userMacros.carbs}
      />
      <FoodList foods={foods} onDeleteFood={handleDeleteFood} />
      <AddFoodForm onAddFood={handleAddFood} />
    </div>
  );
}

export default App;
