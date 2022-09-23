import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  shoppingCart: {
    cartItems: [],
    totalCartItems: 25,
    totalProducts: 96,
    totalProductsChecked: 91,
    amountItems: "R$ 0,00",
    subtotalChecked: "R$ 0,00",
  },
  status: "idle",
  error: null,
};
export const fetchShoppingCart = createAsyncThunk(
  "shoppingCart/fetchShoppingCart",
  async (shoppingListId) => {
    const response = await api.get(
      `/api/v1/shopping-carts/${shoppingListId}/cart-item`
    );
    return response.data;
  }
);
export const putPostCartItem = createAsyncThunk(
  "shoppingList/putShoppingList",
  async (cartItem) => {
    if (cartItem.id === null) {
      const response = await api.post(
        `/api/v1/shopping-carts/${cartItem.shoppingCartId}/cart-item`,
        cartItem
      );
      return response.data;
    } else {
      const response = await api.put(
        `/api/v1/shopping-carts/${cartItem.shoppingCartId}/cart-item`,
        cartItem
      );
      return response.data;
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCartSlice",
  initialState,
  reducers: {
    resetStatus(state, action) {
      state.status = "idle";
      console.log("resetStatus", state);
    },
    resetShoppingCart(state, action) {
      state = initialState;
      console.log("resetShoppingCart", state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShoppingCart.pending, (state, action) => {
        state.status = "loading";
        state.shoppingCart = initialState.shoppingCart;
      })
      .addCase(fetchShoppingCart.fulfilled, (state, action) => {
        state.shoppingCart = action.payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(fetchShoppingCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = "fetch: " + action.error.message;
      })
      .addCase(putPostCartItem.pending, (state, action) => {
        state.status = "loading";
        state.shoppingCart = {};
      })
      .addCase(putPostCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shoppingCart = action.payload;
        state.error = null;
      })
      .addCase(putPostCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = "putPostCartItem: " + action.error.message;
      });
  },
});

export const { resetStatus, resetShoppingCart } = shoppingCartSlice.actions;

export const getShoppingCart = (state) =>
  state.shoppingCartReducer.shoppingCart;
export default shoppingCartSlice.reducer;
