import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPersonNode } from "../../utils/interfaces";

const initialState: IPersonNode[] = [];

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    // Пока эту функцию нигде не используем
    addNode(state, action: PayloadAction<IPersonNode>) {
      state.push(action.payload);
    },
    addMultipleNodes(state, action: PayloadAction<IPersonNode[]>) {
      const arr = action.payload;
      arr.forEach((element) => {
        state.push(element);
      });
    }
  }
});

export const { addNode, addMultipleNodes } = nodesSlice.actions;

export default nodesSlice.reducer;
