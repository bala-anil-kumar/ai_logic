import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
    },
    increaseQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalAmount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
