import axios from "axios";

export const fetchProductsList = () => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCT_LIST_BEGIN",
    });
    axios
      .get("https://fakestoreapi.com/products")
      .then(({ data }) => {
        console.log("[DATA]", data);
        dispatch({
          type: "FETCH_PRODUCT_LIST_SUCCESS",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("[ERROR]", error);
        dispatch({
          type: "FETCH_PRODUCT_LIST_FAILURE",
          payload: error.message,
        });
      });
  };
};
