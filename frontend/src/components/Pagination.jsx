import React from 'react'
import { paginationRange } from '../hooks/PaginationUtils'

export const Pagination = ({totalPage, page, limit, siblings, onPageChange}) => {
  const array = paginationRange(totalPage, page, limit, siblings)
  return (
    <ul className="pagination pagination-md justify-content-end">
      <li className="page-item"><span className="page-link" onClick={() => onPageChange("&laquo;")}>&laquo;</span></li>
      <li className="page-item"><span className="page-link" onClick={() => onPageChange("&lsaquo;")}>&lsaquo;</span></li>
      {array.map( value => (
        value === page 
          ? <li key={value} className="page-item active"><span className="page-link" onClick={() => onPageChange(value)}>{value}</span></li>
          : <li key={value} className="page-item"><span className="page-link" onClick={() => onPageChange(value)}>{value}</span></li>
          ))}
      <li className="page-item"><span className="page-link" onClick={() => onPageChange("&rsaquo;")}>&rsaquo;</span></li>
      <li className="page-item"><span className="page-link" onClick={() => onPageChange("&raquo;")}>&raquo;</span></li>
    </ul>
  )
}
