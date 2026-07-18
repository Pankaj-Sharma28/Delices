import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutState, ShippingAddress } from "@/types";

const initialState: CheckoutState = {
  shippingAddress: null,
  paymentMethod: "cod",
  isGuest: true,
  orderNumber: null,
  isCompleted: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    setGuestStatus(state, action: PayloadAction<boolean>) {
      state.isGuest = action.payload;
    },
    completeCheckout(state) {
      state.isCompleted = true;
      state.orderNumber = `DEL-${Math.floor(100000 + Math.random() * 900000)}`;
    },
    resetCheckout(state) {
      state.shippingAddress = null;
      state.paymentMethod = "cod";
      state.isGuest = true;
      state.orderNumber = null;
      state.isCompleted = false;
    },
  },
});

export const {
  saveShippingAddress,
  savePaymentMethod,
  setGuestStatus,
  completeCheckout,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
