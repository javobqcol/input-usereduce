import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FILTER_PRODUCTS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
} from "../hooks/actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        products: [...state.products, action.payload.row],
        error: "",
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        products: state.products.map((product) =>
          product.id === action.payload.row.id ? action.payload.row : product
        ),
        error: "",
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        products: state.products.filter(
          (x) => x.id !== action.payload.id
        ),
        error: "",
      };
    case FILTER_PRODUCTS:{

      return {
        ...state,
        loading: true,
        productsFilter: [...action.payload.productsFilter],
        error: "",
      };  
    }
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: true,
        products: [...action.payload.data],
        productsFilter: [...action.payload.data],
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: "action.payload.error",
      };

    default:
      return { ...state };
  }
};
