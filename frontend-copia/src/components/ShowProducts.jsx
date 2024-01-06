import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getProducts } from "../hooks/getProducts";
import "./showproducts.css"

export const ShowProducts = () => {
  const url = "http://localhost:3000/products/";
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  use
  useEffect(() => {
    getProducts(url, setProducts);
  }, []);

  const openModal = (op, id, name, description, price) => {
    setId("");
    setDescription("");
    setName("");
    setPrice("");
    setOperation(op);
    switch (op) {
      case 1:
        setTitle("Registrar Producto");
        break;
      case 2:
        setTitle("Editar Producto");
        setId(id);
        setDescription(description);
        setName(name);
        setPrice(price);
        break;
      default:
        break;
    }
    window.setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = () => {
    let parametros;
    let metodo;
    if (name.trim() === "") {
      showAlert("Escriba un nombre de producto", "warning");
    } else if (description.trim() === "") {
      showAlert("Escriba una descripcion de producto", "warning");
    } else if (price.trim() === "") {
      showAlert("Escriba un precio de producto", "warning");
    } else {
      if (operation === 1) {
        parametros = {
          name: name.trim(),
          description: description.trim(),
          price: price,
        };
        metodo = "POST";
      } else {
        parametros = {
          id: id,
          name: name.trim(),
          description: description.trim(),
          price: price,
        };
        metodo = "PUT";
      }
      enviarSolicitud(metodo, parametros);
    }
  };
  const enviarSolicitud = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: metodo === "PUT" || metodo === "DELETE" ? url + parametros.id : url,
      data: parametros,
    })
      .then((respuesta) => {
        const tipo = respuesta.statusText;
        console.log(respuesta);
        if (tipo === "OK" || tipo === "No Content") {
          showAlert(tipo, "success");
          document.getElementById("btnCerrar").click();
          getProducts();
        }
      })
      .catch((error) => {
        showAlert("Error en la solicitud", "error");
        console.log(error);
      });
  };
  const deleteProduct = (id, name) => {
    const mySwal = withReactContent(Swal);
    mySwal
      .fire({
        title: `¿seguro que quiere eliminar el producto ${name}?`,
        icon: "question",
        text: "eliminacion definitiva",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setId(id);
          enviarSolicitud("DELETE", { id: id });
        } else {
          showAlert("El producto no fue eliminado", "info");
        }
      });
  };
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 mb-3 col-md-4 offset-md-4d-grid mx-auto">
          <button
            onClick={() => openModal(1)}
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#modalProducts"
          >
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </button>
        </div>
        <table className="container table table-striped table-sm table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                <i>#</i>
              </th>
              <th scope="col" className="text-center">
                <i>Products</i>
              </th>
              <th scope="col" className="text-center">
                <i>Description</i>
              </th>
              <th scope="col" className="text-center">
                <i>Price</i>
              </th>
              <th scope="col" className="text-center">
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
                <td className="text-center">
                  <button
                    onClick={() =>
                      openModal(
                        2,
                        product.id,
                        product.name,
                        product.description,
                        product.price
                      )
                    }
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProducts"
                  >
                    <i className="fa fa-solid fa-edit"></i>
                  </button>
                  &nbsp;
                  <button
                    onClick={() => deleteProduct(product.id, product.name)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="modalProducts" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>{" "}
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-comment"></i>{" "}
                </span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-dollar-sign"></i>{" "}
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Buardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
                id="btnCerrar"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
