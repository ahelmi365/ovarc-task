import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuthSliceState {
  isLoggedIn: boolean;
  isLoading: boolean;
}
const initialState: IAuthSliceState = {
  isLoggedIn: false,
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state: IAuthSliceState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },

    setIsLoading(state: IAuthSliceState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { setIsLoggedIn, setIsLoading, reset } = authSlice.actions;

export default authSlice.reducer;
