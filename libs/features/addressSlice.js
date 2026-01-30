const { createSlice } = require("@reduxjs/toolkit");

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    selectedAddress: "",
    editAddressDetails: {},
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setEditAddressDetails: (state, action) => {
      state.editAddressDetails = action.payload;
    },
  },
});

export const { setAddress, setSelectedAddress, setEditAddressDetails } =
  addressSlice.actions;
export default addressSlice.reducer;
