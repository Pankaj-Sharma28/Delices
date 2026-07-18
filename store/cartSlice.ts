import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "@/types";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity: number }>) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.variantId === newItem.variantId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      calculateTotals(state);
    },
    removeFromCart(state, action: PayloadAction<{ id: string; variantId: string }>) {
      const { id, variantId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.variantId === variantId)
      );
      calculateTotals(state);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; variantId: string; quantity: number }>) {
      const { id, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.variantId === variantId
      );
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
      calculateTotals(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
