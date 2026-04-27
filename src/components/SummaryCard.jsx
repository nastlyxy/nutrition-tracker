export default function SummaryCard({calories, protein, fats, carbs}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
      <p className="text-slate-500">Calories: {calories} kcal</p>
      <div className="flex justify-between mt-6 pt-6 border-t border-slate-200">
        <div className="text-center">
          <p className="text-lg text-slate-600 bg-lime-300 p-2 rounded-xl">
            Protein
          </p>
          <p className="font-bold">{protein} g</p>
        </div>
        <div className="text-center">
          <p className="text-lg text-slate-600 bg-red-400 p-2 rounded-xl">
            Fats
          </p>
          <p className="font-bold">{fats} g</p>
        </div>
        <div className="text-center">
          <p className="text-lg text-slate-800 bg-amber-200 p-2 rounded-xl">
            Carbs
          </p>
          <p className="font-bold">{carbs} g</p>
        </div>
      </div>
    </div>
  );
}
