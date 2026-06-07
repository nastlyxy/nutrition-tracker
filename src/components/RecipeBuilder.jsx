import { useState, useEffect } from "react";

export default function RecipeBuilder() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);

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

  return (
    <div className="">
      <input
        type="text"
        className=""
        placeholder="Write recipe name..."
        onChange={(e) => setRecipeName(e.target.value)}
        value={recipeName}
      />
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search food (e.g. Banana)..."
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:ring-2 focus:ring-sky-400"
        />
        {searchQuery.length >= 2 && (
          <div className="absolute top-full left-0 w-full z-10">
            {isDropdownOpen && searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.foodId}
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
        <div className=""></div>
      </div>
    </div>
  );
}
