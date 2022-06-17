import { takeLatest } from 'redux-saga/effects'
import { productRequest } from './product/productRequest';
import { productListRequest } from './productList/productListRequest';

export function* sagas() {
    yield takeLatest("productList/getProductList", productListRequest);
    yield takeLatest("product/getProduct", productRequest);
  }