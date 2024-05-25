import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../../utils/constants";

export const fetchInboxData = createAsyncThunk("fetchMails", async () => {
  const emailData = localStorage.getItem("email");
  const email1 = emailData.slice(0, -10);
  const response = await fetch(`${DATABASE_URL}/mails/${email1}.json`);
  return response.json();
});

export const deleteMail = createAsyncThunk(
  "deleteMail",
  async ({ mailId, recipient }) => {
    const email = recipient.slice(0, -10);
    const response = await fetch(
      `${DATABASE_URL}/mails/${email}/${mailId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete mail");
    }

    return mailId;
  },
);

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
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
    builder.addCase(deleteMail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMail.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedData = { ...state.data };
      delete updatedData[action.payload];
      state.data = updatedData;
    });
    builder.addCase(deleteMail.rejected, (state, action) => {
      console.log("Error deleting mail", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default mailSlice.reducer;
