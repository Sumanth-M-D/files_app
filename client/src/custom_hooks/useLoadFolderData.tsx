import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";

import { RootState } from "../store";
import { setFolderData } from "../features/folderSlice";
import { toast } from "react-toastify";

// Custom hook to load the logged-in user's data
export function useLoadFolderData() {
  const dispatch = useDispatch();
  const [isFolderDataLoading, setIsFolderDataLoading] = useState(true);

  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getFolderData() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/folder/${userData.rootFolder}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to load folder.");
        }
        const folderData = await response.json();
        console.log(folderData);

        dispatch(setFolderData(folderData.data));
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setIsFolderDataLoading(false);
      }
    }

    getFolderData();
  }, [dispatch, userData.rootFolder]);

  return { isFolderDataLoading };
}
