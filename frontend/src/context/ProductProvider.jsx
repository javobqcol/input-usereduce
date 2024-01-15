import { useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import axios from "../api/axios";
import {
  initialStateReducer, initialStateRow ,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS, 
  FILTER_PRODUCTS
} from "../hooks/actions"
const PRODUCTS_URL = 'api/products'
import withReactContent from "sweetalert2-react-content";
import { showAlert } from "../functions";
import Swal from "sweetalert2";
import { productContext } from "./context";

export const ProductsProvider = ( { children } ) => {

  const [row, setRow] = useState(initialStateRow);
  const [state, dispatch] = useReducer(reducer, initialStateReducer);


  useEffect(() => {
    const getProducts = async() => {
      try {
        const response = await axios.get(PRODUCTS_URL)

        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: { data: response?.data }
        })    
      } catch (error) {
        if (error.response){
          dispatch({
            type: FETCH_DATA_FAILURE,
            error: {
              data:error.response?.data,
              status:error.response?.status,
              header:error.response?.header }
          })
        } else {
        dispatch({
          type: FETCH_DATA_FAILURE,
          error: error?.message
        })
        }
      }
    };
    getProducts()    
    
  },[]);

  // const editProduct = (product = initialStateRow) => {
  //   const {id, name, description, price} = product
  //   setRow({...row, id,name, description, price});
  // };
  const editProduct = (product = initialStateRow) => {
    const keys = Object.keys(product);
    for (const key of keys) {
      setRow({...row, [key]: product[key]});
    }
  };
  
  const saveProduct = async (row, closeButton) => {
    if (row.id === "") {
      try {
        await axios.post(PRODUCTS_URL, row);
        dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: { row },
        });
        editProduct()
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

  const filterProducts = (productsFil) => {
    dispatch({
      type: FILTER_PRODUCTS,
      payload: { productsFilter:productsFil },
    });
};
  const deleteProduct = (id, name) => {
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
          }
        } else {
          showAlert("El producto no fue eliminado", "info");
        }
      });
  };



  return(
   <productContext.Provider
    value={{
      row: row,
      setRow:setRow,
      products: state.products,
      loading:state.loading,
      editProduct:editProduct,
      saveProduct:saveProduct,
      productsFilter: state.productsFilter,
      deleteProduct:deleteProduct,
      filterProducts
    }} 
   >
    {children}
   </productContext.Provider>
  )
};
