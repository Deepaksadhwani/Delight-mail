import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { token: null },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { addToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
