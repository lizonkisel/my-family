import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IState {
  value: number | undefined;
}

// const initialState: number | undefined = undefined;
const initialState: IState = { value: undefined };

const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveCard(state, action: PayloadAction<number | undefined>) {
      /* eslint-disable-next-line */
      state.value = action.payload;
      return state;
    },
    deleteActiveCard(state) {
      /* eslint-disable-next-line */
      state.value = undefined;
    }
  }
});

export const getActiveCard = (state: RootState) => state.activeCard.value;

export const { setActiveCard, deleteActiveCard } = activeCardSlice.actions;

export default activeCardSlice.reducer;
