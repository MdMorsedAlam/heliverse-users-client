import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  teamUsers: [],
};

const teamSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add Task To Redux And LocalStorage
    addUser: (state, { payload }) => {
      state.teamUsers.push({ ...payload });
    },
    cleareUsers: (state) => {
      state.teamUsers = [];
    },
    removeUser: (state, { payload }) => {
      state.teamUsers = state.teamUsers.filter((item) => item.id !== payload);
    },
  },
});
export const { addUser, cleareUsers, removeUser } = teamSlice.actions;
export default teamSlice.reducer;
