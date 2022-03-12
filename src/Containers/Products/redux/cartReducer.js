const initialState = {
  cartItems: [],
  totalItems: 0,
  loading: false,
  errors: null,
  products: [],
  cartTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_LIST_BEGIN":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_PRODUCT_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case "ADD_TO_CART":
      let alreadyExists = false;
      state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          alreadyExists = true;
          if (action.payload.type === "cart") {
            item.qty++;
          } else {
            console.log(item.qty);
            item.qty = item.qty + action.payload.qty;
          }
        }
      });
      if (!alreadyExists) {
        state.cartItems.push({
          ...action.payload,
          qty: action.payload.qty ?? 1,
        });
      }
      return {
        ...state,
        cartItems: state.cartItems,
        totalItems:
          action.payload.type === "cart"
            ? state.totalItems + 1
            : state.totalItems + action.payload.qty,
      };

    case "REMOVE_FROM_CART":
      state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.qty--;
        }
      });

      return {
        ...state,
        cartItems: state.cartItems,
        totalItems: state.totalItems - 1,
      };

    case "DELETE_FROM_CART":
      let newArray = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });

      return {
        ...state,
        cartItems: newArray,
        totalItems: state.totalItems - action.payload.qty,
      };
    default:
      return state;
  }
};

export default cartReducer;
