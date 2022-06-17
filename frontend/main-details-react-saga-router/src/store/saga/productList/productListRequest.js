import { call, put } from "redux-saga/effects";

export function* productListRequest(action) {
  try {
    if (action.payload !== "") {
      // Показывает загрузку
      const isProductListLoading = true;
      yield put({ type: "setIsProductListLoading", isProductListLoading });

      // Запрашивает результаты поиска
      const productListRequest = yield call(ajaxRequest);
      if (productListRequest) {
        yield put({ type: "setProductList", productListRequest });

        // Показывает завершение загрузки
        const isProductListLoading = false;
        const isProductListLoadingError = false;
        yield put({ type: "setIsProductListLoading", isProductListLoading });
        yield put({ type: "setIsProductListLoadingError", isProductListLoadingError });
      }
    }
  } catch (e) {
    // Показывает ошибку загрузки результатов поиска
    const isProductListLoadingError = true;
    yield put({ type: "setIsProductListLoadingError", isProductListLoadingError });
  }
}

function ajaxRequest() {
  return fetch(`http://localhost:7070/api/services`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Что-то пошло не так, делаю запрос снова...");
      return ajaxRequest();
    });
}
