const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItemsCount: 0,
    cart: [],
  },
  reducers: {
    setCartItemsCount: (state, action) => {
      state.cartItemsCount = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});
export const { setCartItemsCount, setCart } = cartSlice.actions;
export default cartSlice.reducer;
