import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMainPersonData } from "../../utils/interfaces";

import data from "../../data/data.json";

// const initialState: Post[] = [
//   { id: '1', title: 'First Post!', content: 'Hello!' },
//   { id: '2', title: 'Second Post', content: 'More text' },
// ]

const initialState: IMainPersonData[] = JSON.parse(JSON.stringify(data));

// const initialState = {
//   personsData: IMainPersonData[] = JSON.parse(JSON.stringify(data)),
//   nodes: IPersonNode[] = [],
//   edges: INodeEdges[] =[]
// }

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    // Пока это просто функция-заглушка
    postAdded(state, action: PayloadAction<IMainPersonData>) {
      state.push(action.payload);
    }
  }
});

export const { postAdded } = personsSlice.actions;

export default personsSlice.reducer;
