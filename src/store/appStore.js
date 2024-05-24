import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import mailReducer from "./slices/mailSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer,
  },
});

export default appStore;
