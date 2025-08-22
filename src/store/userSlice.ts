import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: null | string;
  token: string | null;
}

const initialState: IUser = {
  id: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => {
      return {
        id: null,
        username: null,
        token: null,
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
