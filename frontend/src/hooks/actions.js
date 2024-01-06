export const CREATE='CREATE_PRODUCTS'
export const DELETE_PRODUCT_SUCCESS='DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILURE='DELETE_PRODUCT_FAILURE'
export const UPDATE='UPDATE_PRODUCTS'
export const FETCH_DATA_SUCCESS='FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE='FETCH_DATA_SUCCESS'
export const initialStateReducer = {
  loading: false,
  products: null,
  error: null
}
export const initialStateRow={
  id:'',
  name:'',
  description:'',
  price:''
}
