import { useEffect, useReducer, useRef, useState } from "react";
import { getProducts } from "../hooks/getProducts";
import "./showproducts.css";
import { Modal } from "./Modal";
import { reducer } from "../hooks/reducer";
import { initialStateReducer, initialStateRow } from "../hooks/actions";
import { URL } from "../config";
import { deleteProduct } from "../hooks/deleteProducts";
import { validateProduct } from "../hooks/validateProduct";
import { saveProduct } from "../hooks/saveProduct";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
import { SelectLimit } from "./SelectLimit";
import { EditButton } from "./EditButton";

export const ShowProducts = () => {
  const [row, setRow] = useState(initialStateRow);

  const [state, dispatch] = useReducer(reducer, initialStateReducer);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("")
  const [productFilter, setProductFilter] = useState([])
  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    Price: useRef(null),
    closeButton: useRef(null),
  };

  useEffect(() => {
    getProducts(URL, dispatch);
  }, []);

  const { products, loading } = state;

  const rangeProducts = (page, limit  ) => {
    return products.slice((page - 1) * limit, page * limit);
  };

  const getLength = () => {
    return products?.length;
  };

  const totalPage = Math.ceil(getLength() / limit);

  let pageNo = page;
  if (page > totalPage) {
    setPage(totalPage);
    pageNo = page;
  }

  const editProduct = (product = initialStateRow) => {
    setRow(product);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setRow({
      ...row,
      [name]: value,
    });
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
      saveProduct(row, dispatch, inputRef.closeButton);
    }
  };

  const handleSearch =(e) =>{

    setSearch(e.target.value)
    const filterTable = products?.filter(o => Object.keys(o).some(k=> String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
    setProductFilter(filterTable)
    console.log("filterTable=",filterTable)

  }

  return (
    <>
      {" "}
      {loading ? (
        <div className="App">
          <div className="container">
            <EditButton editProduct={editProduct} />
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
                page={pageNo}
                limit={limit}
                siblings={1}
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
