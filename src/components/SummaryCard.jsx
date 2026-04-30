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
  const progressProtein = Math.min(
    (consumedProtein / targetProtein) * 100,
    100,
  );
  const progressFats = Math.min((consumedFats / targetFats) * 100, 100);
  const progressCarbs = Math.min((consumedCarbs / targetCarbs) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
      <div className="mb-4">
        <span className="text-4xl font-extrabold text-slate-800">
          {consumedCalories}
        </span>
        <span className="text-sm font-medium text-slate-400">
          /{targetCalories} kcal
        </span>
      </div>
      <div className="bg-slate-200 h-5 rounded-xl">
        <div
          className="bg-gradient-to-r from-sky-400 to-indigo-500 h-5 rounded-full"
          style={{ width: `${progressKcal}%` }}
        ></div>
      </div>
      <div className="flex justify-between gap-8 mt-6 pt-6 border-t border-slate-200">
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-500">Protein</p>
          <p className="text-slate-700 font-bold">
            {consumedProtein}/{targetProtein} g
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
            <div
              className="bg-lime-400 h-2 rounded-full"
              style={{ width: `${progressProtein}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-500">Fats</p>
          <p className="text-slate-700 font-bold">
            {consumedFats}/{targetFats} g
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
            <div
              className="bg-red-400 h-2 rounded-full"
              style={{ width: `${progressFats}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-500">Carbs</p>
          <p className="text-slate-700 font-bold">
            {consumedCarbs}/{targetCarbs} g
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
            <div
              className="bg-amber-400 h-2 rounded-full"
              style={{ width: `${progressCarbs}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
