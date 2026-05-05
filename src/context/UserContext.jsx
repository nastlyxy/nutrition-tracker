import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [weight, setWeight] = useLocalStorage("userWeight", 60);
  const [height, setHeight] = useLocalStorage("userHeight", 167);
  const [age, setAge] = useLocalStorage("userAge", 18);
  const [gender, setGender] = useLocalStorage("userGender", "female");
  const [activityLevel, setActivityLevel] = useLocalStorage(
    "userActivityLevel",
    "moderate",
  );
  const [goal, setGoal] = useLocalStorage("userGoal", "maintenance");

  return (
    <UserContext.Provider
      value={{
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
        goal,
        setGoal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
