import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistState } from "@/types";

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const index = state.items.indexOf(itemId);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(itemId);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      state.items = state.items.filter((id) => id !== itemId);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
