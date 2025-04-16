import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = -1;

const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveCard(state, action: PayloadAction<number>) {
      /* eslint-disable-next-line */
      state = action.payload;
      return state;
    },
    getActiveCard(state) {
      return state;
    }
  }
});

export const { setActiveCard, getActiveCard } = activeCardSlice.actions;

export default activeCardSlice.reducer;
