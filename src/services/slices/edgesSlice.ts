import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INodeEdges } from "../../utils/interfaces";

const initialState: INodeEdges[] = [
  // {
  //   id: `e1-2`,
  //   type: "straight",
  //   source: `node-1`,
  //   target: `node-2`
  // }
];

const edgesSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    addMultipleEdges(state, action: PayloadAction<INodeEdges[]>) {
      const arr = action.payload;
      arr.forEach((element) => {
        state.push(element);
      });
    }
  }
});

export const { addMultipleEdges } = edgesSlice.actions;

export default edgesSlice.reducer;
