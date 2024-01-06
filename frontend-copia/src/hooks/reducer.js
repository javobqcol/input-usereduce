export const reduce = (state, action) => {
  switch (action.type) {
    case 'REGISTRAR':
      return{
        ...state, title:"Registrar Producto"
      }
     
    case 'EDITAR':
      return{
        ...state, title:"Editar Producto"
      }
      break;
    case 'BORRAR'
    return{
      ...state, title:"Borrar Producto"
    }

    default:
      return state
  }
  window.setTimeout(() => {
    document.getElementById("nombre").focus();
  }, 500);
};
