import withReactContent from "sweetalert2-react-content";
import axios from "../api/axios";
import { showAlert } from "../functions";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS, FETCH_DATA_PRODUCT_FAILURE, FETCH_DATA_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS, initialStateProductRow } from "./actions";
const PRODUCTS_URL='/api/products/'
import Swal from "sweetalert2";
export const getProducts = async (dispatch) => {
  try {
    const response = await axios.get(PRODUCTS_URL);

    dispatch({
      type: FETCH_DATA_PRODUCT_SUCCESS,
      payload: { data: response?.data },
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: FETCH_DATA_PRODUCT_FAILURE,
        error: {
          data: error.response?.data,
          status: error.response?.status,
          header: error.response?.header,
        },
      });
    } else {
      dispatch({
        type: FETCH_DATA_PRODUCT_FAILURE,
        error: error?.message,
      });
    }
  }
};

export const editProduct = (product, setRow) => {
  setRow(product);
};


export const saveProduct = async (row, setRow,  closeButton, dispatch) => {
  if (row.id === "") {
    try {
      await axios.post(PRODUCTS_URL, row);
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: { row },
      });
      editProduct(initialStateProductRow,setRow);
      closeButton.current.click();
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE,
        payload: { error: error.message },
      });
    }
  } else {
    try {
      await axios.put(`${PRODUCTS_URL}${row.id}`, row);
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: { row },
      });
      closeButton.current.click();
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        payload: { error: error.message },
      });
    }
  }
};

export const deleteProduct = (id, name, dispatch) => {
  const mySwal = withReactContent(Swal);
  mySwal
    .fire({
      title: `¿seguro que quiere eliminar el producto ${name}`,
      icon: "question",
      text: "eliminacion definitiva",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${PRODUCTS_URL}${id}`);
          dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: { id: id },
          });
        } catch (error) {
          dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: { error: error.message },
          });
          showAlert("Error en el borrado", "Error");
        }
      } else {
        showAlert("El producto no fue eliminado", "info");
      }
    });
};

export const validateProduct = (row, inputRef) => {
  const {name, description, price} = row

  if (name.trim() === "") {
    inputRef.name.current.focus();
    showAlert("Escriba un nombre de producto", "warning");
  } else if (description.trim() === "") {
    inputRef.description.current.focus();
    showAlert("Escriba una descripcion de producto", "warning");
  } else if (price.trim() === "") {
    inputRef.price.current.focus();
    showAlert("Escriba un precio de producto", "warning");
  } else {
    return ( true )
  }
  return ( false )
}
