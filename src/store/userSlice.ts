import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GitHubUser } from "../types/User";

interface UserState {
  query: string;
  users: GitHubUser[];
  lastVisitedPage: string | null;
}

const initialState: UserState = {
  query: "",
  users: [],
  lastVisitedPage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    addUser(state, action: PayloadAction<GitHubUser>) {
      const exists = state.users.find((u) => u.login === action.payload.login);
      if (!exists) {
        state.users.unshift(action.payload);
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.login !== action.payload);
    },
    setLastVisitedPage(state, action: PayloadAction<string>) {
      state.lastVisitedPage = action.payload;
    },
  },
});

export const { setQuery, addUser, deleteUser, setLastVisitedPage } = userSlice.actions;
export default userSlice.reducer;
