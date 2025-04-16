import { combineSlices } from "@reduxjs/toolkit";
import personsReducer from "./personsSlice";
import nodesReducer from "./nodesSlice";
import edgesReducer from "./edgesSlice";
import activeCardReducer from "./activeCardSlice";

const rootReducer = combineSlices({
  persons: personsReducer,
  nodes: nodesReducer,
  edges: edgesReducer,
  activeCard: activeCardReducer
});

export default rootReducer;
