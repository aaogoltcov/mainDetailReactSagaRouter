import { call, put } from "redux-saga/effects";

export function* productRequest(action) {
  try {
    if (action.payload !== "") {
      // Показывает загрузку
      const isProductLoading = true;
      yield put({ type: "setIsProductLoading", isProductLoading });
      const requestButtonName = "Загружаю подукт...";
      yield put({ type: "setRequestButtonName", requestButtonName });

      // Запрашивает результаты поиска
      const productRequest = yield call(ajaxRequest, action);
      if (productRequest) {
        yield put({ type: "setProduct", productRequest });

        // Показывает завершение загрузки
        const isProductLoading = false;
        const isProductLoadingError = false;
        const requestButtonName = "Загрузить продукт снова?";
        yield put({ type: "setIsProductLoading", isProductLoading });
        yield put({ type: "setIsProductLoadingError", isProductLoadingError });
        yield put({ type: "setRequestButtonName", requestButtonName });
      }
    }
  } catch (e) {
    // Показывает ошибку загрузки результатов поиска
    const isProductLoadingError = true;
    const requestButtonName = "Не смог загрузить, попробовать снова?";
    yield put({ type: "setIsProductLoadingError", isProductLoadingError });
    yield put({ type: "setRequestButtonName", requestButtonName });
  }
}

function ajaxRequest(action) {
  return fetch(`http://localhost:7070/api/services/${action.payload}`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Что-то пошло не так, делаю запрос снова...");
      return ajaxRequest(action);
    });
}
