import { showAlert } from "../functions";

export const validateProduct = (row, inputRef) => {
  console.log(row)
  const {id, name, description, price} = row

  if (name.trim() === "") {
    inputRef.name.current.focus();
    showAlert("Escriba un nombre de producto", "warning");
   
  } else if (description.trim() === "") {
    inputRef.description.current.focus();
    showAlert("Escriba una descripcion de producto", "warning");

  } else if (price.trim() === "") {
    inputRef.price.current.focus();
    showAlert("Escriba un precio de producto", "warning");
  } else {
    return ( true )
  }
  return ( false )
}