import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

export type AppState = ReturnType<typeof reducer>;

export const store = createStore(reducer, applyMiddleware(thunk));
