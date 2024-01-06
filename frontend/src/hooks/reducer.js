import { CREATE, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS, UPDATE } from "./actions";

export const reducer = (state, action) => {
  console.log("action=",action, " state=", state)
  switch (action.type) {
    case CREATE:
      return console.log("create Producto")
      
    case UPDATE:
        return console.log("update products")
    
    case DELETE_PRODUCT_SUCCESS:
      return{
        ...state,
        loading: true,
        products: state.products.filter((x) => x.id !==action.payload.productId),
        error: ''
      }
      case DELETE_PRODUCT_FAILURE:
      return{
        ...state,
        loading: true,
        error: action.payload.error
      }
    case FETCH_DATA_SUCCESS:
        return {
          ...state,
          loading: true,
          products: action.payload.data,
          error: ''
        }      
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        products: {},
        error: action.payload.error
      }
  
    default:
      return {...state}
  }
}


