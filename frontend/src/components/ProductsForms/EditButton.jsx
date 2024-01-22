import React from 'react'
import { initialStateProductRow } from '../../hooks/actions'

export const EditButton = ({handleEdit}) => {

  return (
    <div className="d-grid gap-2 col-6 mx-auto m-2">
      <button
        onClick={() => handleEdit(initialStateProductRow)}
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-circle-plus"></i> Añadir
      </button>
  </div>
  )
}
