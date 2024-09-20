import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  categoryList: []
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({category }) => {

    if(category!=null) {
      const result = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      return result?.data;

    } else {

      const result = await axios.get(
        `https://dummyjson.com/products`
      );
      return result?.data;

    }

  }
);

export const fetchAllCategories = createAsyncThunk(
  "/products/fetchAllCategories",
  async () => {
    const result = await axios.get(
      `https://dummyjson.com/products/categories`
    );

    return result?.data;
  }
);

export const getSearchResults = createAsyncThunk(
  "/products/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${keyword}`
    );

    return response.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
    resetSearchResults: (state) => {
      state.productList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = [];
      }).addCase(getSearchResults.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export const { setProductDetails,resetSearchResults } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
