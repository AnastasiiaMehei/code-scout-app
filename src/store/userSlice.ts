import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GitHubUser } from "../types/User";

interface UserState {
  query: string;
  users: GitHubUser[];
}

const initialState: UserState = {
  query: "",
  users: [],
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
  },
});

export const { setQuery, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
