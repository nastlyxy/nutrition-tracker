import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Profile() {
  const { userStats, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState(userStats);

  useEffect(() => {
    setFormData(userStats);
  }, [userStats]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "weight" || name === "height" || name === "age"
          ? Number(value)
          : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert("Profile saved successfully!");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error in sign out", error);
    }
  };

  return (
    <>
      <form
        className="bg-white rounded-2xl shadow-md p-6 mt-8"
        onSubmit={handleSave}
      >
        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Your weight
        </label>
        <input
          type="number"
          name="weight"
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 bg-white"
          onChange={handleChange}
          value={formData.weight}
        />

        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Your height
        </label>
        <input
          type="number"
          name="height"
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 bg-white"
          onChange={handleChange}
          value={formData.height}
        />

        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Your age
        </label>
        <input
          type="number"
          name="age"
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 bg-white"
          onChange={handleChange}
          value={formData.age}
        />

        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Gender
        </label>
        <select
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 bg-white"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Activity level
        </label>
        <select
          name="activityLevel"
          onChange={handleChange}
          value={formData.activityLevel}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-4 outline-none focus:border-sky-400 bg-white"
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>

        <label className="block text-sm font-semibold text-slate-500 mb-1">
          Goal
        </label>
        <select
          name="goal"
          onChange={handleChange}
          value={formData.goal}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full mb-6 outline-none focus:border-sky-400 bg-white"
        >
          <option value="deficit">Weight Loss (Deficit)</option>
          <option value="maintenance">Maintain Weight</option>
          <option value="surplus">Muscle Gain (Surplus)</option>
        </select>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
        >
          Save Changes
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="text-white bg-red-600 hover:bg-red-800 focus:ring-sky-300 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 mt-2"
      >
        Log Out
      </button>
    </>
  );
}
