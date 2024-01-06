import { showAlert } from "../functions";

export const validateProduct = ({id, name, description, price}) => {
  if (name.trim() === "") {
    showAlert("Escriba un nombre de producto", "warning");
  } else if (description.trim() === "") {
    showAlert("Escriba una descripcion de producto", "warning");
  } else if (price.trim() === "") {
    showAlert("Escriba un precio de producto", "warning");
    document.getElementById("inputprice").focus();

  } else {
    return ( true )
  }
  return ( false )
}