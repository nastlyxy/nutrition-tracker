import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RecipeBuilder({ onCancel }) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [finalWeight, setFinalWeight] = useState("");

  const { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    const time = setTimeout(() => {
      fetchFoodFromAPI();
    }, 500);
    return () => clearTimeout(time);
  }, [searchQuery]);

  const fetchFoodFromAPI = async () => {
    const apiId = import.meta.env.VITE_EDAMAM_APP_ID;
    const apiKey = import.meta.env.VITE_EDAMAM_APP_KEY;
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${searchQuery}`,
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      const parsedResults = data.hints.slice(0, 5).map((item) => ({
        foodId: item.food.foodId,
        foodName: item.food.label,
        foodKcal: Math.round(item.food.nutrients.ENERC_KCAL || 0),
        foodProtein: Math.round(item.food.nutrients.PROCNT || 0),
        foodFats: Math.round(item.food.nutrients.FAT || 0),
        foodCarbs: Math.round(item.food.nutrients.CHOCDF || 0),
      }));
      setSearchResults(parsedResults);
      setIsDropdownOpen(true);
    } catch (err) {
      console.error("Error to fetch: ", err.message);
    }
  };

  const handleSelectIngredient = (food) => {
    const newIngredient = {
      id: food.foodId + Date.now(),
      name: food.foodName,
      calories: food.foodKcal,
      protein: food.foodProtein,
      fats: food.foodFats,
      carbs: food.foodCarbs,
      weight: 100,
    };
    setIngredients((prev) => [...prev, newIngredient]);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };
  const handleRemoveIngredient = (id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  };
  const handleUpdateWeight = (id, newWeight) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, weight: Number(newWeight) } : item,
      ),
    );
  };

  const totals = ingredients.reduce(
    (acc, item) => {
      const portion = item.weight / 100;
      return {
        weight: acc.weight + (item.weight || 0),
        kcal: acc.kcal + Math.round(item.calories * portion || 0),
        protein: acc.protein + Math.round(item.protein * portion || 0),
        fats: acc.fats + Math.round(item.fats * portion || 0),
        carbs: acc.carbs + Math.round(item.carbs * portion || 0),
      };
    },
    { weight: 0, kcal: 0, protein: 0, fats: 0, carbs: 0 },
  );

  const actualWeight = Number(finalWeight) || totals.weight;

  const macrosPer100g = {
    calories:
      actualWeight > 0 ? Math.round((totals.kcal / actualWeight) * 100) : 0,
    protein:
      actualWeight > 0 ? Math.round((totals.protein / actualWeight) * 100) : 0,
    fats: actualWeight > 0 ? Math.round((totals.fats / actualWeight) * 100) : 0,
    carbs:
      actualWeight > 0 ? Math.round((totals.carbs / actualWeight) * 100) : 0,
  };

  const handleSaveRecipe = async () => {
    if (!recipeName || ingredients.length === 0)
      return alert("Enter the name and add the products");
    const recipeData = {
      name: recipeName,
      calories: macrosPer100g.calories,
      protein: macrosPer100g.protein,
      fats: macrosPer100g.fats,
      carbs: macrosPer100g.carbs,
      createdAt: new Date().toISOString(),
    };
    try {
      const recipesRef = collection(db, "users", user.uid, "custom_recipes");
      const docRef = await addDoc(recipesRef, recipeData);
      onCancel();
    } catch (err) {
      console.error("Error adding a recipe: ", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Create New Recipe</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-sky-500 hover:text-sky-600 font-medium text-sm flex items-center gap-1"
        >
          ← Back
        </button>
      </div>
      <input
        type="text"
        className="border border-slate-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-sky-400 mb-6"
        placeholder="Write recipe name..."
        onChange={(e) => setRecipeName(e.target.value)}
        value={recipeName}
      />
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search food (e.g. Banana)..."
          className="border border-slate-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-sky-400"
        />
        {searchQuery.length >= 2 && (
          <div className="absolute top-full left-0 w-full z-10">
            {isDropdownOpen && searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.foodId}
                  onClick={() => handleSelectIngredient(result)}
                  className="p-3 bg-white border-b border-slate-100 hover:bg-sky-50 cursor-pointer shadow-lg"
                >
                  {result.foodName} {result.foodKcal} kcal
                </div>
              ))
            ) : (
              <div className="p-3 bg-white shadow-lg border border-slate-100 rounded-b-lg text-slate-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-6">
        {ingredients.length === 0
          ? "No ingredients added yet. Search and select items above."
          : ingredients.map((ingredient) => (
              <div
                className="bg-slate-50 p-3 rounded-xl flex items-center justify-between mb-2 border border-slate-100 shadow-sm"
                key={ingredient.id}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-700">
                    {ingredient.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {ingredient.calories} kcal / 100g
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      className="w-20 px-2 py-1 text-center border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400"
                      value={ingredient.weight}
                      onChange={(e) =>
                        handleUpdateWeight(ingredient.id, e.target.value)
                      }
                    />
                    <span className="text-sm text-slate-500 font-medium">
                      g
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                    className="text-red-400 text-lg font-bold hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
      </div>
      <div className="mt-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Final dish weight (optional)
        </label>
        <input
          type="number"
          className="border border-slate-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="e.g. 850"
          value={finalWeight}
          onChange={(e) => setFinalWeight(e.target.value)}
        />
      </div>
      <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Summary</h3>
            <p className="text-sm text-slate-500">
              Calculated weight:{" "}
              <span className="font-semibold text-slate-700">
                {actualWeight} g
              </span>
            </p>
          </div>
          <h4 className="text-sm font-medium text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            Macros per 100g
          </h4>
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">Kcal</p>
            <p className="font-bold text-slate-700 text-lg">
              {macrosPer100g.calories}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">Protein</p>
            <p className="font-bold text-green-500 text-lg">
              {macrosPer100g.protein}
              <span className="text-sm font-medium">g</span>
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">Fats</p>
            <p className="font-bold text-amber-500 text-lg">
              {macrosPer100g.fats}
              <span className="text-sm font-medium">g</span>
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">Carbs</p>
            <p className="font-bold text-blue-500 text-lg">
              {macrosPer100g.carbs}
              <span className="text-sm font-medium">g</span>
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-lg shadow-md transition-all hover:scale-[1.01]"
        onClick={() => handleSaveRecipe()}
      >
        Save recipe
      </button>
    </div>
  );
}
