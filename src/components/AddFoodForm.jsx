import { useState } from "react";

export default function AddFoodForm({ onAddFood }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newFood = {
        name: name,
        calories: Number(calories),
        protein: Number(protein),
        fats: Number(fats),
        carbs: Number(carbs),
        id: Date.now(),
    }

    onAddFood(newFood);
    setName("");
    setCalories("");
    setProtein("");
    setFats(""); 
    setCarbs("");
  }

  return (
    <form className="bg-white rounded-2xl shadow-md p-6 mt-8" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={setName((e) => e.target.value)}
        placeholder="Name of dish..."
        className=""
      />
      <input
        type="text"
        value={calories}
        onChange={setCalories((e) => e.target.value)}
        placeholder="Calories..."
        className=""
      />
      <input
        type="text"
        value={protein}
        onChange={setProtein((e) => e.target.value)}
        placeholder="Protein..."
        className=""
      />
      <input
        type="text"
        value={fats}
        onChange={setFats((e) => e.target.value)}
        placeholder="Fats..."
        className=""
      />
      <input
        type="text"
        value={carbs}
        onChange={setCarbs((e) => e.target.value)}
        placeholder="Carbs..."
        className=""
      />
      <button type="submit" className="text-white bg-brand box-border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"></button>
    </form>
  );
}
