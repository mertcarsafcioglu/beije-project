import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

export interface SubProduct {
  _id: string;
  name: string;
  price: number;
}
export interface Product {
  _id: string;
  title: string;
  type: "Menstrual" | "Other";
  subProducts: SubProduct[];
}
export interface Packet {
  _id: string;
  title: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  packets: Packet[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  packets: [],
  loading: false,
  error: null,
};

export const fetchProductsAndPackets = createAsyncThunk<
  { products: Product[]; packets: Packet[] },
  void,
  { rejectValue: string }
>("products/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/packets-and-products");
    return res.data.data as { products: Product[]; packets: Packet[] };
  } catch {
    return thunkAPI.rejectWithValue("Ürünler yüklenemedi");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchProductsAndPackets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsAndPackets.fulfilled,
        (state, action: PayloadAction<{ products: Product[]; packets: Packet[] }>) => {
          state.loading = false;
          state.products = action.payload.products;
          state.packets = action.payload.packets;
        }
      )
      .addCase(fetchProductsAndPackets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
});

export default productsSlice.reducer;
