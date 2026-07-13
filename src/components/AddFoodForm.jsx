import { useState, useContext, useRef, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import RecipeBuilder from "./RecipeBuilder";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function AddFoodForm() {
  const { handleAddFood } = useContext(FoodContext);
  const { user } = useContext(AuthContext);

  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");

  const [isPer100g, setIsPer100g] = useState(false);
  const [weight, setWeight] = useState("");

  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [isBuildingRecipe, setIsBuildingRecipe] = useState(false);
  const [customRecipes, setCustomRecipes] = useState([]);

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

  useEffect(() => {
    const fetchCustomRecipes = async () => {
      if (!user) return;
      try {
        const recipesCollectionRef = collection(
          db,
          "users",
          user.uid,
          "custom_recipes",
        );
        const querySnapshot = await getDocs(recipesCollectionRef);
        const recipesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomRecipes(recipesList);
      } catch (err) {
        console.error("Error fetching recipes: ", err);
      }
    };
    fetchCustomRecipes();
  }, [user, isBuildingRecipe]);

  const fetchFoodFromAPI = async () => {
    const apiId = import.meta.env.VITE_EDAMAM_APP_ID;
    const apiKey = import.meta.env.VITE_EDAMAM_APP_KEY;
    try {
      setIsSearching(true);
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
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFood = (food) => {
    setName(food.foodName);
    setCalories(food.foodKcal);
    setProtein(food.foodProtein);
    setFats(food.foodFats);
    setCarbs(food.foodCarbs);
    setActiveTab("manual");
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleSelectCustomRecipe = (recipe) => {
    setName(recipe.name);
    setCalories(recipe.calories);
    setProtein(recipe.protein);
    setFats(recipe.fats);
    setCarbs(recipe.carbs);
    setIsPer100g(true);
    setActiveTab("manual");
  };

  const handleDeleteRecipe = async (e, id) => {
    e.stopPropagation();
    try {
      const recipeDocRef = doc(db, "users", user.uid, "custom_recipes", id);
      await deleteDoc(recipeDocRef);
      setCustomRecipes(customRecipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      console.error("Error deleting recipe: ", err);
    }
  };

  const handleSubmit = (e) => {
    if (!name.trim()) {
      alert("Please enter a meal name or select one from the list!");
      return;
    }
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
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  if (isBuildingRecipe) {
    return <RecipeBuilder onCancel={() => setIsBuildingRecipe(false)} />;
  }

  return (
    <form
      className="bg-white rounded-2xl shadow-md p-6 mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full bg-slate-100 p-1.5 rounded-2xl mb-8 shadow-inner gap-1">
        <button
          type="button"
          className={`flex-1 py-3 text-base rounded-xl transition-all duration-300 ${
            activeTab === "search"
              ? "bg-white text-sky-600 font-bold shadow-sm scale-100"
              : "text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100"
          }`}
          onClick={() => setActiveTab("search")}
        >
          Search
        </button>
        <button
          type="button"
          className={`flex-1 py-3 text-base rounded-xl transition-all duration-300 ${
            activeTab === "manual"
              ? "bg-white text-sky-600 font-bold shadow-sm scale-100"
              : "text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100"
          }`}
          onClick={() => setActiveTab("manual")}
        >
          Manual
        </button>
        <button
          type="button"
          className={`flex-1 py-3 text-base rounded-xl transition-all duration-300 ${
            activeTab === "myMeals"
              ? "bg-white text-sky-600 font-bold shadow-sm scale-100"
              : "text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100"
          }`}
          onClick={() => setActiveTab("myMeals")}
        >
          My Meals
        </button>
      </div>
      {activeTab === "search" && (
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food (e.g. Banana)..."
            className="border border-slate-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-sky-400"
          />
          {isSearching && (
            <div className="absolute right-3 top-3">
              <svg
                className="animate-spin h-5 w-5 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {searchQuery.length >= 2 && (
            <div className="absolute top-full left-0 w-full z-10">
              {isDropdownOpen && searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.foodId}
                    onClick={() => handleSelectFood(result)}
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
      )}
      {activeTab === "manual" && (
        <>
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
            <span className="text-sm font-medium text-slate-700">
              Calculate from 100g
            </span>
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
        </>
      )}
      {activeTab === "myMeals" && (
        <div className="">
          <button
            type="button"
            onClick={() => setIsBuildingRecipe(true)}
            className="w-full py-5 border-2 border-dashed border-sky-300 rounded-2xl text-sky-600 font-bold text-lg hover:bg-sky-50 hover:border-sky-400 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Custom Recipe
          </button>

          <div className="">
            {customRecipes.length > 0 ? (
              customRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleSelectCustomRecipe(recipe)}
                  className="flex justify-between items-center bg-white border border-slate-200 rounded-xl p-4 mb-3 mt-4 hover:bg-sky-50 hover:border-sky-300 hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                    <p>{recipe.name}</p>
                    <span className="text-slate-600">
                      {recipe.calories} kcal
                    </span>
                    <span className="text-green-500">{recipe.protein}g P</span>
                    <span className="text-amber-500">{recipe.fats}g F</span>
                    <span className="text-cyan-500">{recipe.carbs}g C</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteRecipe(e, recipe.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete recipe"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p>You don't have recipes yet. Create the first one!</p>
            )}
          </div>
        </div>
      )}
      {activeTab !== "myMeals" && (
        <button
          type="submit"
          className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5"
        >
          Add meal
        </button>
      )}
    </form>
  );
}
