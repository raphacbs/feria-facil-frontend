import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  shoppingLists: [],
  status: "idle",
  error: null,
  shoppingList: {},
};

export const fetchShoppingLists = createAsyncThunk(
  "shoppingList/fetchShoppingList",
  async () => {
    const response = await api.get("/api/v1/shopping-carts?isArchived=false");
    return response.data;
  }
);

export const putPostShoppingList = createAsyncThunk(
  "shoppingList/putShoppingList",
  async (shoppingList) => {
    if (shoppingList.id === null) {
      const response = await api.post("/api/v1/shopping-carts", shoppingList);
      return response.data;
    } else {
      const response = await api.put("/api/v1/shopping-carts", shoppingList);
      return response.data;
    }
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingListsSlice",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
      console.log(state, action);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShoppingLists.pending, (state, action) => {
        state.status = "loading";
        state.shoppingLists = [];
      })
      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shoppingLists = action.payload;
        state.error = null;
      })
      .addCase(fetchShoppingLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = "fetch: " + action.error.message;
      })
      .addCase(putPostShoppingList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(putPostShoppingList.fulfilled, (state, action) => {
        state.status = "idle";
        state.shoppingLists = state.shoppingLists.map((u) =>
          u.id !== action.payload.id ? u : action.payload
        );
        state.error = null;
      })
      .addCase(putPostShoppingList.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Put|Post: " + action.error.message;
      });
  },
});
export const { setStatus } = shoppingListSlice.actions;
export const selectAll = (state) => state.shoppingListReducer.shoppingLists;
export default shoppingListSlice.reducer;
