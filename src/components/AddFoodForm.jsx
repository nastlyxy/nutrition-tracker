import { useState } from "react";

export default function AddFoodForm({ onAddFood }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFood = {
      name: name,
      calories: Number(calories),
      protein: Number(protein),
      fats: Number(fats),
      carbs: Number(carbs),
      id: Date.now(),
    };

    onAddFood(newFood);
    setName("");
    setCalories("");
    setProtein("");
    setFats("");
    setCarbs("");
  };

  return (
    <form
      className="bg-white rounded-2xl shadow-md p-6 mt-8"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of dish..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        placeholder="Protein..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        value={fats}
        onChange={(e) => setFats(e.target.value)}
        placeholder="Fats..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <input
        type="number"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
        placeholder="Carbs..."
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <button
        type="submit"
        className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5"
      >
        Add meal
      </button>
    </form>
  );
}
