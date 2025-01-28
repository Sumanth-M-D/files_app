import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserData } from "../features/userSlice";
import { API_BASE_URL } from "../config/config";

// Custom hook to load the logged-in user's data
export function useLoadLoggedInUserData() {
  const dispatch = useDispatch();

  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch(`${API_BASE_URL}/user`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to sign up.");
        }
        const userData = await response.json();

        dispatch(setUserData(userData.data.user));
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsUserDataLoading(false);
      }
    }

    getUserData();
  }, [dispatch]);

  return { isUserDataLoading };
}
