export default function SummaryCard({
  targetCalories,
  consumedCalories,
  consumedProtein,
  consumedFats,
  consumedCarbs,
  targetProtein,
  targetFats,
  targetCarbs,
}) {
  const progressKcal = Math.min((consumedCalories / targetCalories) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
      <p className="">Consumed kcal / Target kcal</p>
      <div className="bg-slate-200 h-5 rounded-xl">
        <div className="bg-sky-500 h-5 rounded-full" style={{ width: `${progressKcal}%` }}></div>
      </div>
      <p className="text-slate-800">Consumed: {consumedCalories} kcal</p>
      <p className="text-slate-500">Target: {targetCalories} kcal</p>
      <div className="flex justify-between mt-6 pt-6 border-t border-slate-200">
        <div className="text-center">
          <p className="text-lg text-slate-600 bg-lime-300 p-2 rounded-xl">
            Protein
          </p>
          <p className="font-bold">
            {consumedProtein}/{targetProtein} g
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg text-slate-600 bg-red-400 p-2 rounded-xl">
            Fats
          </p>
          <p className="font-bold">
            {consumedFats}/{targetFats} g
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg text-slate-800 bg-amber-200 p-2 rounded-xl">
            Carbs
          </p>
          <p className="font-bold">
            {consumedCarbs}/{consumedCarbs} g
          </p>
        </div>
      </div>
    </div>
  );
}
