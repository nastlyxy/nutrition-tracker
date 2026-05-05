import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const {
    weight,
    setWeight,
    height,
    setHeight,
    age,
    setAge,
    gender,
    setGender,
    activityLevel,
    setActivityLevel,
  } = useContext(UserContext);
  return (
    <form className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <label htmlFor="weight" className="block text-sm font-semibold text-slate-500 mb-1">Your weight</label>
      <input
        type="number"
        id="weight"
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
        placeholder="Weight..."
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />
      <label htmlFor="height" className="block text-sm font-semibold text-slate-500 mb-1">Your height</label>
      <input
        type="number"
        id="height"
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
        placeholder="Your height..."
        onChange={(e) => setHeight(e.target.value)}
        value={height}
      />
      <label htmlFor="age" className="block text-sm font-semibold text-slate-500 mb-1">Your age</label>
      <input
        type="number"
        id="age"
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
        placeholder="Your Age..."
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />
      <label htmlFor="gender-select" className="block text-sm font-semibold text-slate-500 mb-1">Gender</label>
      <select
        name="gender"
        id="gender-select"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
      >
        <option value="female" className="">
          Female
        </option>
        <option value="male" className="">
          Male
        </option>
      </select>
      <label htmlFor="activityLevel-select" className="block text-sm font-semibold text-slate-500 mb-1">Activity level</label>
      <select
        name="activityLevel"
        id="activityLevel-select"
        onChange={(e) => setActivityLevel(e.target.value)}
        value={activityLevel}
        className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
      >
        <option value="sedentary" className="">
          sedentary
        </option>
        <option value="light" className="">
          light
        </option>
        <option value="moderate" className="">
          moderate
        </option>
        <option value="active" className="">
          active
        </option>
      </select>
    </form>
  );
}
