import { createSlice } from "@reduxjs/toolkit";
import { FolderInterface } from "../interfaces/folderInterface";

interface FolderSliceInterface {
  isLoading: boolean;
  error: string;
  folderData: FolderInterface;
}

const initialState: FolderSliceInterface = {
  isLoading: false,
  error: "",
  folderData: {
    _id: "",
    userId: "",
    folderName: "",
    subFolders: [],
    files: [],
    type: "folder",
  },
};

const folderSlice = createSlice({
  name: "folderSlice",
  initialState,
  reducers: {
    setFolderData(state, action) {
      state.isLoading = false;
      state.error = "";
      state.folderData = action.payload;
    },

    resetFolderData(state) {
      state.isLoading = false;
      state.error = "";
      state.folderData = initialState.folderData;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFolderData, resetFolderData, setIsLoading, setError } =
  folderSlice.actions;

export default folderSlice.reducer;
