import axios from "axios"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS } from "./actions"
import { URL } from "../config"

export const saveProduct = async (row, dispatch, closeButton) =>{
  console.log(row)
  if (row.id === ''){
    try{ 
      await axios.post(`${URL}${row.id}`, row)
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: { row }
      })
      closeButton.current.click()

    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE,
        payload: { error: error.message }
      })
    }
  } else{
    try{ 
      await axios.put(`${URL}${row.id}`, row)
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: { row }
      })
      closeButton.current.click()
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        payload: { error: error.message }
      })
    }
  }
}