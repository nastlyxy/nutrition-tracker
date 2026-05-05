import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import { UserContext } from "../context/UserContext";
import {
  calculateBMR,
  calculateTDEE,
  calculateMacros,
} from "../utils/calculator";

import SummaryCard from "../components/SummaryCard";
import FoodList from "../components/FoodList";
import AddFoodForm from "../components/AddFoodForm";

export default function Tracker() {
  const { foods, currentDay, setCurrentDay } = useContext(FoodContext);
  const { weight, height, age, gender, activityLevel, goal } =
    useContext(UserContext);

  const userBMR = calculateBMR(weight, age, height, gender);
  const userTDEE = calculateTDEE(userBMR, activityLevel);
  const userMacros = calculateMacros(weight, userTDEE, goal);

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalFats = foods.reduce((sum, food) => sum + food.fats, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  return (
    <>
      <div className="flex justify-center mb-6">
        <input
          type="date"
          value={currentDay}
          onChange={(e) => setCurrentDay(e.target.value)}
          className="bg-white border-none rounded-xl shadow-sm px-4 py-2 text-slate-700 font-bold outline-none cursor-pointer"
        />
      </div>
      <SummaryCard
        consumedCalories={totalCalories}
        targetCalories={userMacros.targetCalories}
        consumedProtein={totalProtein}
        consumedFats={totalFats}
        consumedCarbs={totalCarbs}
        targetProtein={userMacros.protein}
        targetFats={userMacros.fats}
        targetCarbs={userMacros.carbs}
      />

      <AddFoodForm />

      <FoodList foods={foods} />
    </>
  );
}
