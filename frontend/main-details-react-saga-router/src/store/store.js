import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice/product';
import productListSlice from './slices/productListSlice/productList';
import createSagaMiddleware from 'redux-saga'
import { sagas } from './saga/sagas';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
      productList: productListSlice,
      product: productSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);