import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userStats, setUserStats] = useState({
    gender: "female",
    weight: 60,
    height: 170,
    age: 25,
    activityLevel: "sedentary",
    goal: "maintenance",
  });
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setIsProfileLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().profile) {
          setUserStats(docSnap.data().profile);
        }
      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setIsProfileLoading(false);
      }

      fetchProfile();
    };
  }, [user]);

  const updateUser = async (newStats) => {
    setUserStats(newStats);

    if (user) {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { profile: newStats }, { merge: true });
    }
  };

  return (
    <UserContext.Provider
      value={{
        userStats,
        updateUser,
        isProfileLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
