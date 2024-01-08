import withReactContent from "sweetalert2-react-content";
import { DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS } from "./actions";
import { showAlert } from "../functions";
import Swal from "sweetalert2";
import axios from "axios";
import { URL } from "../config";

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

          await axios.delete(`${URL}${id}`)
          dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: { productId: id }
          })
  
        } catch (error) {
          dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: { error: error.message }
          })
        }
      } else {
        showAlert("El producto no fue eliminado", "info");
      }
    });
};
