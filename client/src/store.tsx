import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import folderReducer from "./features/folderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    folder: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
