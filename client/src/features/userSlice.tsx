import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: "",
  userData: {
    addressLine_1: "",
    addressLine_2: "",
    bio: "",
    city: "",
    country: "",
    coverPhoto: "",
    email: "",
    fName: "",
    facebook: "",
    instagram: "",
    lName: "",
    phone: "",
    photo: "",
    rootFolder: "",
    state: "",
    twitterX: "",
    zipCode: "",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.userData = action.payload;
    },

    resetUserData(state) {
      state.isAuthenticated = initialState.isAuthenticated;
      state.isLoading = false;
      state.error = "";
      state.userData = initialState.userData;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUserData, resetUserData, setIsLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;
