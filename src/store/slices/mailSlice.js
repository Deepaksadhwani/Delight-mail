import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../../utils/constants";


export const fetchInboxData = createAsyncThunk("fetchMails", async () => {
  const emailData = localStorage.getItem("email");
const email1 = emailData.slice(0, -10);
  const response = await fetch(`${DATABASE_URL}/mails/${email1}.json`);
  return response.json();
});

export const fetchSentMailData = createAsyncThunk("fetchSentMail", async () => {
  const emailData = localStorage.getItem("email");
  const emailSliced = emailData.slice(0, -10);
  const response = await fetch(`${DATABASE_URL}/sent/${emailSliced}.json`);
  return response.json();
});

export const deleteSentMail = createAsyncThunk(
  "deleteSentMail",
  async ({ mailId, sender }) => {
    const email = sender.slice(0, -10);
    const response = await fetch(
      `${DATABASE_URL}/sent/${email}/${mailId}.json`,
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
    sentData: null,
    isError: false,
  },
  reducers: {
    removeData: (state, action) => {
      const newState = { ...state };
      delete newState.data;
      return newState;
    },
    removeSentData: (state, action) => {
      const newState = { ...state };
      delete newState.sentData;
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSentMailData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSentMailData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sentData = action.payload;
    });
    builder.addCase(fetchSentMailData.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(fetchInboxData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInboxData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchInboxData.rejected, (state, action) => {
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
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteSentMail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSentMail.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedData = { ...state.sentData };
      delete updatedData[action.payload];
      state.sentData = updatedData;
    });
    builder.addCase(deleteSentMail.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { removeData, removeSentData } = mailSlice.actions;
export default mailSlice.reducer;
