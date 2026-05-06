import { useState, useContext, useRef} from "react";
import { FoodContext } from "../context/FoodContext";

export default function AddFoodForm() {

  const {handleAddFood} = useContext(FoodContext);

  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");

  const [isPer100g, setIsPer100g] = useState(false);
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCalories = Number(calories);
    let finalProtein = Number(protein);
    let finalFats = Number(fats);
    let finalCarbs = Number(carbs);

    if (isPer100g) {
      const portion = Number(weight) || 0;
      finalCalories = Math.round((finalCalories / 100) * portion);
      finalProtein = Math.round((finalProtein / 100) * portion);
      finalFats = Math.round((finalFats / 100) * portion);
      finalCarbs = Math.round((finalCarbs / 100) * portion);
    }

    
    const newFood = {
      name: name,
      calories: finalCalories,
      protein: finalProtein,
      fats: finalFats,
      carbs: finalCarbs,
      id: Date.now(),
    };

    handleAddFood(newFood);
    setName("");
    setCalories("");
    setProtein("");
    setFats("");
    setCarbs("");
    setIsPer100g(false);
    setWeight("");
    nameInputRef.current.focus();
  };

  return (
    <form
      className="bg-white rounded-2xl shadow-md p-6 mt-8"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        ref={nameInputRef}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of dish..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        min="0"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        min="0"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        placeholder="Protein..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        min="0"
        value={fats}
        onChange={(e) => setFats(e.target.value)}
        placeholder="Fats..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        min="0"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
        placeholder="Carbs..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isPer100g}
          onChange={(e) => setIsPer100g(e.target.checked)}
          className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400 cursor-pointer"
        />
        <span className="text-sm font-medium text-slate-700">Calculate from 100g</span>
      </label>
      {isPer100g && (
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Portion weight (in grams)..."
          className="border border-sky-300 bg-sky-50 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:ring-2 focus:ring-sky-400"
          required={isPer100g}
          min="0" 
        />
      )}
      <button
        type="submit"
        className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5"
      >
        Add meal
      </button>
    </form>
  );
}
