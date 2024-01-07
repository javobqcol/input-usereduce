export const CREATE_PRODUCT_SUCCESS='CREATE_PRODUCT_SUCCESS'
export const CREATE_PRODUCT_FAILURE='CREATE_PRODUCT_FAILURE'
export const DELETE_PRODUCT_SUCCESS='DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILURE='DELETE_PRODUCT_FAILURE'
export const UPDATE_PRODUCT_SUCCESS='UPDATE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_FAILURE='UPDATE_PRODUCT_FAILURE'
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