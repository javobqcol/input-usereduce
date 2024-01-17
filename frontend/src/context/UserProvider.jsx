import { useEffect, useReducer, useState } from "react";

import axios from "../api/axios";
import {
  initialStateUserReducer, initialStateUserRow ,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  FETCH_DATA_USER_FAILURE,
  FETCH_DATA_USER_SUCCESS, 
  FILTER_USERS
} from "../hooks/actions"
const USERS_URL = 'api/users'
import withReactContent from "sweetalert2-react-content";
import { showAlert } from "../functions";
import Swal from "sweetalert2";
import { userContext } from "./context";

export const UserProvider = ( { children } ) => {

  const [row, setRow] = useState(initialStateUserRow);
  const [state, dispatch] = useReducer(useReducer, initialStateUserReducer);


  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await axios.get(USERS_URL)

        dispatch({
          type: FETCH_DATA_USER_SUCCESS,
          payload: { data: response?.data }
        })    
      } catch (error) {
        if (error.response){
          dispatch({
            type: FETCH_DATA_USER_FAILURE,
            error: {
              data:error.response?.data,
              status:error.response?.status,
              header:error.response?.header }
          })
        } else {
        dispatch({
          type: FETCH_DATA_USER_FAILURE,
          error: error?.message
        })
        }
      }
    };
    getUsers()    
    
  },[]);

  const editUser = (user = initialStateUserRow) => {
    const keys = Object.keys(user);
    for (const key of keys) {
      setRow({...row, [key]: user[key]});
    }
  };
  
  const saveUser = async (row, closeButton) => {
    if (row.id === "") {
      try {
        await axios.post(USERS_URL, row);
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: { row },
        });
        editProduct()
        closeButton.current.click();
      } catch (error) {
        dispatch({
          type: CREATE_USER_FAILURE,
          payload: { error: error.message },
        });
      }
    } else {
      try {
        await axios.put(`${USERS_URL}${row.id}`, row);
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { row },
        });
        closeButton.current.click();
      } catch (error) {
        dispatch({
          type: UPDATE_USER_FAILURE,
          payload: { error: error.message },
        });
      }
    }
  };

  const filterUser = (userFil) => {
    dispatch({
      type: FILTER_USERS,
      payload: { usersFilter:userFil },
    });
  };

  const deleteUser = (id, name) => {
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
            await axios.delete(`${USERS_URL}${id}`);
            dispatch({
              type: DELETE_USER_SUCCESS,
              payload: { id: id },
            });
          } catch (error) {
            dispatch({
              type: DELETE_USER_FAILURE,
              payload: { error: error.message },
            });
          }
        } else {
          showAlert("El producto no fue eliminado", "info");
        }
      });
  };



  return(
   <userContext.Provider
   value={{
    rowUser: row,
    setRowUser:setRow,
    users: state.products,
    loading:state.loading,
    editUser:editUser,
    saveuser:saveUser,
    userFilter: state.usersFilter,
    deleteUser:deleteUser,
    filterUsers
  }} 
   >
    {children} 
   </userContext.Provider>
  )
};
