import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../../utils/constants";

const emailData = localStorage.getItem("email");

export const fetchInboxData = createAsyncThunk("fetchMails", async () => {
  const email1 = emailData.slice(0, -10);
  const response = await fetch(`${DATABASE_URL}/mails/${email1}.json`);
  return response.json();
});

const mailSlice = createSlice({
  name: "mail",
  initialState: { isLoading: false, data: null, isError: false },
  extraReducers: (builder) => {
    builder.addCase(fetchInboxData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInboxData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchInboxData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default mailSlice.reducer;
