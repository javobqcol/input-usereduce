//PRODUCTS
export const CREATE_PRODUCT_SUCCESS='CREATE_PRODUCT_SUCCESS'
export const CREATE_PRODUCT_FAILURE='CREATE_PRODUCT_FAILURE'
export const DELETE_PRODUCT_SUCCESS='DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILURE='DELETE_PRODUCT_FAILURE'
export const UPDATE_PRODUCT_SUCCESS='UPDATE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_FAILURE='UPDATE_PRODUCT_FAILURE'
export const FETCH_DATA_PRODUCT_SUCCESS='FETCH_DATA_PRODUCT_SUCCESS'
export const FETCH_DATA_PRODUCT_FAILURE='FETCH_DATA_PRODUCT_FAILURE'
export const FILTER_PRODUCTS='FILTER_PRODUCTS'
//USERS
export const CREATE_USER_SUCCESS='CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE='CREATE_USER_FAILURE'
export const DELETE_USER_SUCCESS='DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE='DELETE_USER_FAILURE'
export const UPDATE_USER_SUCCESS='UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE='UPDATE_USER_FAILURE'
export const FETCH_DATA_USER_SUCCESS='FETCH_DATA_DATA_SUCCESS'
export const FETCH_DATA_USER_FAILURE='FETCH_DATA_USER_FAILURE'
export const FILTER_USERS='FILTER_USERS'

export const initialStateProductReducer = {
  loading: false,
  products: [],
  error: null,
}
export const initialStateProductRow={
  id:'',
  name:'',
  description:'',
  price:''
}
export const initialStateLogin = {
  email:"",
  password:"",
  errMsg:""
}

export const initialStateUserReduce = {
  loading: false,
  products: [],
  error: null,
  productsFilter:[]

}
export const initialStateUserRow={
  id:'',
  username:'',
  email:'',
  password:'',
  matchPassword:''
}
export const ROLES ={
  "User": "user",
  "Moderator": "moderator",
  "Admin": "admin"
}