import React, { useEffect, useState } from "react";
import { SelectLimit } from "./SelectLimit";
import { Pagination } from "./Pagination";

export const DataTable = ({products, handleEdit,  handleDelete,}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("")
  const [productsFilter, setProductFilter ] = useState(products)
  
  const rangeProducts = (page, limit) => {
    return productsFilter.slice((page - 1) * limit, page * limit);
  };

 useEffect(() => {
   setProductFilter(products) 
 }, [products])
 
  
  const totalPage =
    Math.ceil(productsFilter.length / limit) >= 1
      ? Math.ceil(productsFilter.length / limit)
      : 1;
  if (page > totalPage) {
    setPage(totalPage > 0 ? totalPage : 1);
  }
  
  const handleSearch =(e) =>{
    setSearch(e.target.value)
    setProductFilter(products.filter(o => Object.keys(o).some(k=> String(o[k]).toLowerCase().includes(e.target.value.toLowerCase()))))
  }
  const handlePageChange = (value) => {

    switch (value) {
      case "... ":
      case "&laquo;":
        setPage(1);
        break;
      case "&lsaquo;":
        setPage(page !== 1 ? page - 1 : page);
        break;
      case "&rsaquo;":
        setPage(page !== totalPage ? page + 1 : page);
        break;
      case " ...":
      case "&raquo;":
        setPage(totalPage);
        break;
      default:
        setPage(value);
        break;
    }
  };


  return (
    <>
      <form className="my-3">
        <input
          type="text"
          className="form-control"
          name="search"
          id="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search"
        />
      </form>

      <table className="table table-striped table-sm table-hover">
        <thead className="table-dark">
          <tr className="text-center">
            <th>
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
        <tbody className="table-striped container-fluid">
          {rangeProducts(page, limit).map((product, i) => (
            <tr key={product.id}>
              <th scope="row" className="text-center">
                {(page - 1) * limit + i + 1}
              </th>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td className="text-end">
                ${new Intl.NumberFormat("es-co").format(product.price)}
              </td>
              <td className="text-center ">
                <button
                  onClick={(e) => handleEdit(product)}
                  className="btn btn-warning btn-sm mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa fa-solid fa-edit"></i>
                </button>

                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="btn btn-danger btn-sm mx-1"
                >
                  <i className="fa fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
          <SelectLimit onLimitChange={setLimit} />
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            siblings={2}
            onPageChange={handlePageChange}
          />
      </div>
    </>
  );
};
