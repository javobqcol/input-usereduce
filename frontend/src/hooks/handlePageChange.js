export const handlePageChange = (value, page, setPage) =>{

  switch (value) {
    case "... ":
    case "&laquo;":
      setPage(1)
      break
    case "&lsaquo;":
      setPage( page !== 1 ? page - 1 : page)
      break;
    case "&rsaquo;":
      setPage( page !== totalPage ? page + 1 : page)
      break;
    case " ...":
    case "&raquo;":
      setPage( totalPage )
      break;
      
    default:
      setPage(value)
      break;
  }
}