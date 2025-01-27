import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsLoading, setUserData } from "../features/userSlice";
import { API_BASE_URL } from "../config/config";

import { RootState } from "../store";

// Custom hook to load the logged-in user's data
export function useLoadLoggedInUserData() {
  const dispatch = useDispatch();

  const { isLoading: isUserDataLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    async function getUserData() {
      try {
        dispatch(setIsLoading(true));
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
        console.log(userData);

        dispatch(setUserData(userData.data.user));
      } catch (error: any) {
        console.log(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    getUserData();
  }, [dispatch]);

  return { isUserDataLoading };
}
