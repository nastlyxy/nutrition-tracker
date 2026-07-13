import { useState, useEffect, useContext, useMemo } from "react";
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
import DateSelector from "../components/DateSelector";

export default function Tracker() {
  const { foods, currentDay, setCurrentDay, daySnapshot } =
    useContext(FoodContext);
  const {
    userStats: { weight, height, age, gender, activityLevel, goal },
    isProfileLoading,
  } = useContext(UserContext);

  const consumed = useMemo(() => {
    return foods.reduce(
      (acc, food) => {
        acc.calories += food.calories || 0;
        acc.protein += food.protein || 0;
        acc.carbs += food.carbs || 0;
        acc.fats += food.fats || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    );
  }, [foods]);

  if (isProfileLoading) {
    return (
      <div className="bg-slate-200 animate-pulse rounded-2xl w-full h-48 sm:h-64 md:h-72 shadow-sm" />
    );
  }

  const userBMR = calculateBMR(weight, age, height, gender);
  const userTDEE = calculateTDEE(userBMR, activityLevel);
  const freshMacros = calculateMacros(weight, userTDEE, goal);
  const finalTargetCalories = daySnapshot
    ? daySnapshot.targetCalories
    : freshMacros.targetCalories;
  const finalProtein = daySnapshot ? daySnapshot.protein : freshMacros.protein;
  const finalFats = daySnapshot ? daySnapshot.fats : freshMacros.fats;
  const finalCarbs = daySnapshot ? daySnapshot.carbs : freshMacros.carbs;

  return (
    <>
      <DateSelector currentDay={currentDay} onChangeDate={setCurrentDay} />
      <SummaryCard
        consumedCalories={consumed.calories}
        targetCalories={finalTargetCalories}
        consumedProtein={consumed.protein}
        consumedFats={consumed.fats}
        consumedCarbs={consumed.carbs}
        targetProtein={finalProtein}
        targetFats={finalFats}
        targetCarbs={finalCarbs}
      />

      <AddFoodForm />

      <FoodList foods={foods} targetCalories={finalTargetCalories}/>
    </>
  );
}
