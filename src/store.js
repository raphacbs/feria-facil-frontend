import { configureStore } from "@reduxjs/toolkit";
import shoppingCartSliceReducer from "./features/shoppingCart/shoppingCartSlice";
import shoppingListsReducer from "./features/shoppingList/shoppingListSlice";

export const store = configureStore({
  reducer: {
    shoppingListReducer: shoppingListsReducer,
    shoppingCartReducer: shoppingCartSliceReducer,
  },
});
