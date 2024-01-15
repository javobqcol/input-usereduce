import { useContext, useRef, useState } from "react";
import "./showproducts.css";
import { Modal } from "./Modal";
import { validateProduct } from "../hooks/validateProduct";
import { DataTable } from "./DataTable";
import { SelectLimit } from "./SelectLimit";
import { EditButton } from "./EditButton";
import { Pagination } from "./Pagination";
import { productContext } from "../context/context";
import { initialStateRow } from "../hooks/actions";

export const ShowProducts = () => {

  const {
    row, 
    setRow,
    editProduct,
    products,
    saveProduct,
    deleteProduct,
    loading,
    productsFilter,
    filterProducts
} = useContext(productContext)
 

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("")
  
  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    Price: useRef(null),
    closeButton: useRef(null),
  };


  const rangeProducts = (page, limit) => {
    return productsFilter.slice((page - 1) * limit, page * limit);
  };

  const totalPage = (Math.ceil(productsFilter.length / limit) >= 1)
          ? Math.ceil(productsFilter.length / limit)
          : 1
  if (page > totalPage){
    setPage(totalPage > 0 ? totalPage: 1);
  }
  


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setRow({...row, [name]: value});  
  };

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

  const handleForm = (e) => {
    e.preventDefault();
    if (validateProduct(row, inputRef)) {
      saveProduct(row, inputRef.closeButton);
    }
  };

  const handleSearch =(e) =>{
    setSearch(e.target.value)
    const filterTable = products.filter(o => Object.keys(o).some(k=> String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
    filterProducts(filterTable)
  }

  return (
    <>
      {" "}
      {loading ? (
        <div className="App">
          <div className="container">
            <EditButton editProduct={() => editProduct()} />
            <form className="my-3">
             <input type="text" className="form-control" name="search" id="search" value={search} onChange={handleSearch} placeholder='Search' />
            </form>
            <DataTable
              page={page}
              limit={limit}
              products={rangeProducts(page, limit)}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
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
