import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "./features/teams/teamSlice";

const store = configureStore({
  reducer: {
    teamSlice: teamSlice,
  },
});

export default store;
