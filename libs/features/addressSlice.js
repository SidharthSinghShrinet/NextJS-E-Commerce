const { createSlice } = require("@reduxjs/toolkit");

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    selectedAddress: "",
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setAddress, setSelectedAddress } = addressSlice.actions;
export default addressSlice.reducer;
