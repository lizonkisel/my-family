import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPersonAllData } from "../../utils/interfaces";

// import data from "../../data/data.json";
import { RootState } from "../app/store";

// const initialState: IMainPersonData[] = JSON.parse(JSON.stringify(data));
const initialState: IPersonAllData[] = [];

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setPersons(state, action: PayloadAction<IPersonAllData[]>) {
      action.payload.forEach((element: IPersonAllData) => {
        state.push(element);
      });
    }
  }
});

export const getPerson = (state: RootState, personId: number) => {
  const person = state.persons.filter((man) => man.id === personId)[0];
  return person;
};

export const { setPersons } = personsSlice.actions;

export default personsSlice.reducer;
