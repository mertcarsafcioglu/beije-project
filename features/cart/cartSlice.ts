import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  packetCount: number;
}

const initialState: CartState = {
  packetCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Sadece 1 paket ekler
    addPackage(state) {
      state.packetCount += 1;
    },
    // (İstersen ilerde paket silme de eklersin)
    setCartCount(state, action: { payload: number }) {
      state.packetCount = Math.max(0, action.payload);
    },
  },
});

export const { addPackage, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
