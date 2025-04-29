import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface SubProduct { _id: string; name: string; price: number; }
export interface Product {
  _id: string;
  title: string;
  image: string;
  type: string;
  subProducts: SubProduct[];
}
export interface Packet {
  _id: string;
  title: string;
  image: string;
}

export interface MenuState {
  products: Product[];
  packets: Packet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MenuState = {
  products: [],
  packets: [],
  status: "idle",
  error: null,
};
export const fetchMenuData = createAsyncThunk(
  "menu/fetchMenuData",
  async () => {
    const res = await axios.get<{
      success: boolean;
      data: { products: Product[]; packets: Packet[] };
    }>(
      "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/packets-and-products"
    );
    if (!res.data.success) {
      throw new Error("API’den veri okunamadı.");
    }
    return res.data.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.packets = action.payload.packets;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bilinmeyen hata";
      }),
});

export default menuSlice.reducer;
