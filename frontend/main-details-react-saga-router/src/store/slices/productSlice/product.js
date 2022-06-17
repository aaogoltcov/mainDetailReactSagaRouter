import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: {},
  productId: Number(),
  isProductLoading: false,
  isProductLoadingError: false,
  requestButtonName: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.productId = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    cleatProduct: (state) => {
      state.product = {};
    },
    setIsProductLoading: (state, action) => {
      state.isProductLoading = action.payload;
    },
    setIsProductLoadingError: (state, action) => {
      state.isProductLoadingError = action.payload;
    },
    setRequestButtonName: (state, action) => {
      state.requestButtonName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase('setProduct', (state, action) => {
      state.product = action.productRequest;
    })
    builder.addCase('setIsProductLoading', (state, action) => {
      state.isProductLoading = action.isProductLoading;
    })
    builder.addCase('setIsProductLoadingError', (state, action) => {
      state.isProductLoadingError = action.isProductLoadingError;
    })
    builder.addCase('setRequestButtonName', (state, action) => {
      state.requestButtonName = action.requestButtonName;
    })
  },
})

export const { 
  getProduct,
  setProduct, 
  clearProduct, 
  setIsProductLoading, 
  setIsProductLoadingError, 
  setRequestButtonName,
} = productSlice.actions;

export default productSlice.reducer;

export const productSelect = state => state.product.product;
export const isProductLoadingSelect = state => state.product.isProductLoading;
export const requestButtonNameSelect = state => state.productList.requestButtonName;