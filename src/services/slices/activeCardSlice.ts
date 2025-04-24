import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IState {
  value: number | undefined;
  // description: string[];
}

// const initialState: IState = { value: undefined, description: [] };
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
    // setCardDesc(state, action: PayloadAction<string[]>) {

    // },
    deleteActiveCard(state) {
      /* eslint-disable-next-line */
      state.value = undefined;
    }
  }
});

export const getActiveCard = (state: RootState) => state.activeCard.value;

export const { setActiveCard, deleteActiveCard } = activeCardSlice.actions;

export default activeCardSlice.reducer;
