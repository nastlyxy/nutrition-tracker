import { useState } from "react";

import SummaryCard from "./components/SummaryCard";
import FoodList from "./components/FoodList"

function App() {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Homemade Syrniki",
      calories: 320,
      protein: 35,
      fats: 10,
      carbs: 25,
    },
    {
      id: 2,
      name: "Chicken & Rice",
      calories: 450,
      protein: 45,
      fats: 5,
      carbs: 50,
    },
  ]);

  const totalCalories = foods.reduce((sum, food)=> sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food)=> sum + food.protein, 0);
  const totalFats = foods.reduce((sum, food)=> sum + food.fats, 0);
  const totalCarbs = foods.reduce((sum, food)=> sum + food.carbs, 0);
  return (
    <div className="mx-auto max-w-6xl min-h-screen bg-sky-100">
      <h1 className="text-2xl font-bold text-center pt-8">MacroTracker</h1>
      <SummaryCard calories={totalCalories} protein={totalProtein} fats={totalFats} carbs={totalCarbs} />
      <FoodList foods={foods}/>
    </div>
  );
}

export default App;
