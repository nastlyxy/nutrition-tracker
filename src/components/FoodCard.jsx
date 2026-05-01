import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";

export default function FoodCard({ food}) {

  const {handleDeleteFood} = useContext(FoodContext);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden">
      <details className="group">
        <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☀️</span>
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
              className="text-red-400 text-xl font-bold hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </summary>
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-between items-center text-sm text-slate-600">
          <div className="">
            <span>{food.protein}</span>
          </div>
          <div className="">
            <span>{food.fats}</span>
          </div>
          <div className="">
            <span>{food.carbs}</span>
          </div>
          <div className="">
            <span className="text-xs text-slate-400">14%</span>
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
