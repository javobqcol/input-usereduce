import { useContext, useRef, useState } from "react";
import "./showproducts.css";
import { Modal } from "./Modal";
import { validateProduct } from "../hooks/validateProduct";
import { DataTable } from "./DataTable";
import { EditButton } from "./EditButton";
import { productContext } from "../context/context";
import { initialStateProductRow } from "../hooks/actions";

export const ShowProducts = () => {

  const {
    row, 
    setRow,
    editProduct,
    products,
    saveProduct,
    deleteProduct,
    loading
} = useContext(productContext)
 
  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    Price: useRef(null),
    closeButton: useRef(null),
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setRow({...row, [name]: value});  
  };

  

  const handleForm = (e) => {
    e.preventDefault();
    if (validateProduct(row, inputRef)) {
      saveProduct(row, inputRef.closeButton);
    }
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className="App">
          <div className="container">
            <EditButton editProduct={() => editProduct()} />
            <DataTable
              products={products}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
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
