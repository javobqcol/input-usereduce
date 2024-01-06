import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const showAlert = (mensaje, icono, foco='') => {
  const mySwal = withReactContent(Swal)
  onFocus(foco)
  mySwal.fire({
    title:mensaje, 
    icon: icono
  })
}
const onFocus = (foco) => {
  if(foco !== ''){
    document.getElementById(foco).focus()
  }
}