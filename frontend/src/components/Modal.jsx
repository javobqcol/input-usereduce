import { Input } from "./Input";
import "./Modal.css"
export const Modal = ({ row, inputRef, onInputChange, handleForm}) => {
  const { id, name, description, price } = row
  console.log("modal, row", row)

  return (
    <>
      <form onSubmit={handleForm}>
        <div
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog bg-transparent" role="document">
            <div className="modal-content bg-transparent">
              <div className="modal-header bg-info text-white bg-transparent">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edicion Productos
                </h5>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="close"
                ></button>
              </div>
              <div className="modal-body">

                <input type="hidden" id="id" value={id} />
                <div className="input-box">
                   <input
                      id="inputname"
                      ref={inputRef.name}
                      type="text"
                      name="name"
                      className="form__input"
                      placeholder=" "
                      value={name}
                      onChange={onInputChange}
                  />
                  <label htmlFor="name" className="form__label">Name:</label>
                  <i className={"icon fa-solid fa-gift"}></i>
                </div>
                <div className="input-box">
                  <input
                      id="inputdescription"
                      ref={inputRef.description}
                      type="text"
                      name="description"
                      className="form__input"
                      placeholder=" "
                      value={description}
                      onChange={onInputChange}
                  />
                  <label htmlFor="description" className="form__label">Description:</label>
                  <i className={"icon fa-solid fa-comment"}></i>
                </div>
                <div className="input-box">
                 <input
                      id="inputprice"
                      ref={inputRef.price}
                      type="text"
                      name="price"
                      className="form__input"
                      placeholder=" "
                      value={price}
                      onChange={onInputChange}
                  />
                  <label htmlFor="price" className="form__label">Price:</label>
                  <i className={"icon fa-solid fa-dollar-sign"}></i>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="btnCerrar"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="close"
                  ref={inputRef.closeButton}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
