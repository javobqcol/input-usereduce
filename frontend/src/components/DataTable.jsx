import React from 'react'

export const DataTable = ({ page, limit, products, editProduct, deleteProduct }) => {
  console.log("product==", products)
  return (
    <table className="table table-striped table-sm table-hover">
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
            {(page -1) * limit + i + 1}
          </th>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td className="text-end">
            ${new Intl.NumberFormat("es-co").format(product.price)}
          </td>
          <td className="text-center ">
            <button
              onClick={(e) => editProduct(product)}
              className="btn btn-warning btn-sm mx-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="fa fa-solid fa-edit"></i>
            </button>

            <button
              onClick={() => deleteProduct(product.id, product.name)}
              className="btn btn-danger btn-sm mx-1"
            >
              <i className="fa fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
