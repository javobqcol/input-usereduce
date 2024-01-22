import React from 'react'

export const SelectLimit = ({onLimitChange}) => {
  return (
    <select className="select" onChange={(e) => onLimitChange(e.target.value)}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  )
}
