import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
  const progressKcal = targetCalories
    ? Math.min((consumedCalories / targetCalories) * 100, 100)
    : 0;
  const progressProtein = targetProtein
    ? Math.min((consumedProtein / targetProtein) * 100, 100)
    : 0;
  const progressFats = targetFats
    ? Math.min((consumedFats / targetFats) * 100, 100)
    : 0;
  const progressCarbs = targetCarbs
    ? Math.min((consumedCarbs / targetCarbs) * 100, 100)
    : 0;

  const chartData = [
    {
      name: "Protein",
      value: consumedProtein,
      color: "#22C55E",
    },
    {
      name: "Fats",
      value: consumedFats,
      color: "#F59E0B",
    },
    {
      name: "Carbs",
      value: consumedCarbs,
      color: "#3B82F6",
    },
  ];

  const totalMacros= consumedProtein + consumedFats + consumedCarbs;  
  const displayData = totalMacros > 0 ? chartData : [{ name: "Empty", value: 1, color: "#E2E8F0" }];
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Today's Summary</h2>

      <div className="h-52 relative flex items-center justify-center mb-4">
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-extrabold text-slate-800">
            {consumedCalories}
          </span>
          <span className="text-sm font-medium text-slate-400">
            /{targetCalories} kcal
          </span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              dataKey="value"
              innerRadius={75}
              outerRadius={100}
              stroke="none"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between gap-8 mt-6 pt-6 border-t border-slate-200">
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-500">Protein</p>
          <p className="text-slate-700 font-bold">
            {consumedProtein}/{targetProtein} g
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
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
              className="bg-amber-500 h-2 rounded-full"
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
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressCarbs}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
