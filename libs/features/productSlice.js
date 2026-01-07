import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    allProducts: [],
    wishlistToggle: false,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setWishlistToggle: (state) => {
      state.wishlistToggle = !state.wishlistToggle;
    },
  },
});

export const { setAllProducts, setProduct, setWishlistToggle } =
  productSlice.actions;
export default productSlice.reducer;
