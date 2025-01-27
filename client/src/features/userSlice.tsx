import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: "",
  userData: {
    id: "",
    photo: "",
    coverPhoto: "",
    facebook: "",
    twitter: "",
    instagram: "",
    fName: "",
    lName: "",
    bio: "",
    email: "",
    phone: 0,
    addressLine_1: "",
    addressLine_2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
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
      state.userData.id = action.payload._id || state.userData.id || "";
      state.userData.photo = action.payload.photo || "";
      state.userData.coverPhoto = action.payload.coverPhoto || "";

      state.userData.facebook =
        action.payload.facebook || state.userData.facebook || "";
      state.userData.twitter =
        action.payload.twitter || state.userData.twitter || "";
      state.userData.instagram =
        action.payload.instagram || state.userData.instagram || "";
      state.userData.fName = action.payload.fName || state.userData.fName || "";
      state.userData.lName = action.payload.lName || state.userData.lName || "";
      state.userData.bio = action.payload.bio || state.userData.bio || "";
      state.userData.email = action.payload.email || state.userData.email || "";
      state.userData.phone = action.payload.phone || state.userData.phone || 0;
      state.userData.addressLine_1 =
        action.payload.addressLine_1 || state.userData.addressLine_1 || "";
      state.userData.addressLine_2 =
        action.payload.addressLine_2 || state.userData.addressLine_2 || "";
      state.userData.city = action.payload.city || state.userData.city || "";
      state.userData.state = action.payload.state || state.userData.state || "";
      state.userData.country =
        action.payload.country || state.userData.country || "";
      state.userData.zipCode =
        action.payload.zipCode || state.userData.zipCode || "";
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

    setPhoto(state, action) {
      state.userData.photo = action.payload;
    },
    setCoverPhoto(state, action) {
      state.userData.coverPhoto = action.payload;
    },
    setFacebook(state, action) {
      state.userData.facebook = action.payload;
    },
    setTwitter(state, action) {
      state.userData.twitter = action.payload;
    },
    setInstagram(state, action) {
      state.userData.instagram = action.payload;
    },
    setFName(state, action) {
      state.userData.fName = action.payload;
    },
    setLName(state, action) {
      state.userData.lName = action.payload;
    },
    setBio(state, action) {
      state.userData.bio = action.payload;
    },
    setEmail(state, action) {
      state.userData.email = action.payload;
    },
    setPhone(state, action) {
      state.userData.phone = action.payload;
    },
    setAddressLine_1(state, action) {
      state.userData.addressLine_1 = action.payload;
    },
    setAddressLine_2(state, action) {
      state.userData.addressLine_2 = action.payload;
    },
    setCity(state, action) {
      state.userData.city = action.payload;
    },
    setState(state, action) {
      state.userData.state = action.payload;
    },
    setCountry(state, action) {
      state.userData.country = action.payload;
    },
    setZipCode(state, action) {
      state.userData.zipCode = action.payload;
    },
  },
});

export const {
  setUserData,
  resetUserData,
  setIsLoading,
  setError,

  setPhoto,
  setCoverPhoto,
  setFacebook,
  setTwitter,
  setInstagram,
  setFName,
  setLName,
  setBio,
  setEmail,
  setPhone,
  setAddressLine_1,
  setAddressLine_2,
  setCity,
  setState,
  setCountry,
  setZipCode,
} = userSlice.actions;

export default userSlice.reducer;
