import { combineSlices } from "@reduxjs/toolkit";
import personsReducer from "./personsSlice";
import nodesReducer from "./nodesSlice";
import edgesReducer from "./edgesSlice";

const rootReducer = combineSlices({
  persons: personsReducer,
  nodes: nodesReducer,
  edges: edgesReducer
});

export default rootReducer;
