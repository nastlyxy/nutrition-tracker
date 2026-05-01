import { useState, useEffect, useContext } from "react";
import { FoodContext } from "./context/FoodContext";
import {
  calculateBMR,
  calculateTDEE,
  calculateMacros,
} from "./utils/calculator";

import SummaryCard from "./components/SummaryCard";
import FoodList from "./components/FoodList";
import AddFoodForm from "./components/AddFoodForm";

function App() {
  const { foods } = useContext(FoodContext);

  const userWeight = 60;
  const userHeight = 167;
  const userAge = 18;
  const userGender = "female";
  const userActivity = "moderate";

  const userBMR = calculateBMR(userWeight, userAge, userHeight, userGender);
  const userTDEE = calculateTDEE(userBMR, userActivity);
  const userMacros = calculateMacros(userWeight, userTDEE);

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalFats = foods.reduce((sum, food) => sum + food.fats, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4 sm:px-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-6 tracking-tight">
          MacroTracker
        </h1>

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

        <AddFoodForm />

        <FoodList foods={foods} />
      </div>
    </div>
  );
}

export default App;
