import { useContext, useRef, useState, useEffect, useReducer } from "react";
import "./showproducts.css";
import { Modal } from "./Modal";

import { DataTable } from "./DataTable";
import { productReducer } from "../../hooks/productReducer";
import {
  initialStateProductRow,
  initialStateProductReducer,
} from "../../hooks/actions";

import { deleteProduct, editProduct, getProducts, saveProduct, validateProduct } from "../../hooks/utilProducts";
import { EditButton } from "./EditButton";

export const ShowProducts = () => {
  const [row, setRow] = useState(initialStateProductRow);
  const [state, dispatch] = useReducer(
    productReducer,
    initialStateProductReducer
  );
  const { products, loading } = state;
  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    Price: useRef(null),
    closeButton: useRef(null),
  };

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setRow({ ...row, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (validateProduct(row, inputRef)) {
      saveProduct(row, setRow, inputRef.closeButton, dispatch);
    }
  };

  const handleDelete = (id, name) => {
    deleteProduct(id, name, dispatch)
  };
  
  const handleEdit = (product) => {
    editProduct(product, setRow)
  };
  

  return (
    <>
      {" "}
      {loading ? (
        <div className="App">
          <div className="container">
            <EditButton handleEdit={handleEdit}/>
            <DataTable
              products={products}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
          <Modal
            row={row}
            inputRef={inputRef}
            onInputChange={onInputChange}
            handleForm={handleForm}
          />
        </div>
      ) : (
        <h1> no data</h1>
      )}
    </>
  );
};
