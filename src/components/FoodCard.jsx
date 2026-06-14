import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import { UserContext } from "../context/UserContext";

export default function FoodCard({ food, targetCalories }) {
  const { handleDeleteFood } = useContext(FoodContext);

  const getFoodIcon = (name) => {
    if (!name) return "🍽️";
    const lowerName = name.toLowerCase();

    if (
      lowerName.includes("fruit") ||
      lowerName.includes("bana") ||
      lowerName.includes("orange") ||
      lowerName.includes("apple") ||
      lowerName.includes("straw")
    )
      return "🍎";
    if (lowerName.includes("egg")) return "🍳";
    if (
      lowerName.includes("milk") ||
      lowerName.includes("cheese") ||
      lowerName.includes("cottage")
    )
      return "🥛";
    if (
      lowerName.includes("bread") ||
      lowerName.includes("rise") ||
      lowerName.includes("porrige") ||
      lowerName.includes("pasta")
    )
      return "🌾";
    if (
      lowerName.includes("meat") ||
      lowerName.includes("chicken") ||
      lowerName.includes("pork")
    )
      return "🍗";
    return "🍽️";
  };

  const percent = targetCalories
    ? Math.round((food.calories / targetCalories) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden">
      <details className="group">
        <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getFoodIcon(food.name)}</span>
            <h3 className="text-lg font-bold text-slate-800">{food.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-slate-800">{food.calories}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                Kcal
              </p>
            </div>
            <button
              onClick={() => handleDeleteFood(food.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
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
        </summary>
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-between items-center text-sm text-slate-600">
          <div className="flex-col items-center">
            <p>Protein</p>
            <span className="text-green-500 font-bold">{food.protein} g</span>
          </div>
          <div className="flex-col items-center">
            <p>Fats</p>
            <span className="text-amber-500 font-bold">{food.fats} g</span>
          </div>
          <div className="flex-col items-center">
            <p>Carbs</p>
            <span className="text-blue-500 font-bold">{food.carbs} g</span>
          </div>
          <div className="">
            <p>DI</p>
            <span className="text-xs text-slate-400">{`${percent}%`}</span>
          </div>

          <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </details>
    </div>
  );
}
