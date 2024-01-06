import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getProducts } from "../hooks/getProducts";
import "./showproducts.css"
import { Modal } from "./Modal";
import { reducer } from "../hooks/reducer";
import { initialStateReducer, initialStateRow } from "../hooks/actions";
import { URL } from "../config";
import { deleteProduct } from "../hooks/deleteProducts";
import { validateProduct } from "../hooks/validateProduct";


export const ShowProducts = () => {

  const [row, setRow ] = useState(initialStateRow)

  const [state, dispatch] = useReducer(reducer, initialStateReducer)

  useEffect(() => {
    getProducts(URL, dispatch);
  },[]);

  const { products, loading } = state

  console.log("products", products," loading ", loading?"true":false)
  
  const editProduct = (product = initialStateRow) =>{ 
    setRow(product)
  }

  const onInputChange = ({ target }) =>{
    const {name, value} = target
    setRow({
      ...row,
      [name]: value
    })
  }

  const saveProduct = (row) =>{
    console.log(row)
  }

  const handleForm = ( e ) =>{
    e.preventDefault();
    if ( validateProduct(row) ){
      saveProduct(row)
    }

  }

  return (
    <> {loading ?
    <div className="App">
      <div className="container-fluid">
        <div className="d-grid gap-2 col-6 mx-auto m-2">
          <button
            onClick={() => editProduct()}
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </button>
        </div>
        <table className="container table table-striped table-sm table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <th >
                <i>#</i>
              </th>
              <th>
                <i>Products</i>
              </th>
              <th>
                <i>Description</i>
              </th>
              <th>
                <i>Price</i>
              </th>
              <th>
                <i>Actions</i>
              </th>
            </tr>
          </thead>
          <tbody className="table-striped">
            {products.map((product, i) => (
              <tr key={product.id}>
                <th scope="row" className="text-center">
                  {i + 1}
                </th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td className="text-end">
                  ${new Intl.NumberFormat("es-co").format(product.price)}
                </td>
                <td className="text-center ">
                  <button
                    onClick={() => editProduct(product)}
                    className="btn btn-warning btn-sm mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fa fa-solid fa-edit "></i>
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id, product.name, dispatch)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    <i className="fa fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal row={row} onInputChange={onInputChange} handleForm={handleForm}/>        
    </div>
    :<h1> no data</h1>}
    </>

  );
};
