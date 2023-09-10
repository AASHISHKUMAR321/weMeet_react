import { legacy_createStore } from "redux";
import { reducer } from "./reducer";

export const Store = legacy_createStore(reducer);
