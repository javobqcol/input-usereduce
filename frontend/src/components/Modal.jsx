import { Input } from "./Input";

export const Modal = ({ row, onInputChange, handleForm}) => {
  const { id, name, description, price } = row
  return (
    <>
      <form onSubmit={handleForm}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
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
                <div className="input-group mb-3">
                  <Input icon={"fa-solid fa-gift"} type="text" id='inputname' placeholder='Name' name='name' value={name} onInputChange={onInputChange} />
                </div>
                <div className="input-group mb-3">
                  <Input icon={"fa-solid fa-comment"} type="text" id='inputdescription' name='description' value={description} placeholder='Description' onInputChange={onInputChange} />
                </div>
                <div className="input-group mb-3">
                 <Input icon={"fa-solid fa-dollar-sign"} type="text" id='inputprice' placeholder='Price' name='price' value={price} onInputChange={onInputChange} />

                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="close"
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
