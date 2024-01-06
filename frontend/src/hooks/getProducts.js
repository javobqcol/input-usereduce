import axios from "axios";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "./actions";

export const getProducts = async (url, dispatch) => {

  try {
    const response = await axios.get(url)
    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: { data: response.data }
    })
  
  } catch (error) {
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: { error: error.message }
    })
  }
};

// getProducts old
// export const getProducts = async (url, setProducts) => {
//   const respuesta = await axios.get(url);
//   setProducts(respuesta.data);
// };
