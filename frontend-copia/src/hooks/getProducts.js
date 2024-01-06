import axios from "axios";

export const getProducts = async (url, setProducts) => {
  const respuesta = await axios.get(url);
  setProducts(respuesta.data);
};
