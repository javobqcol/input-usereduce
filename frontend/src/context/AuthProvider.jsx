import React, { useState } from 'react'
import { authContext } from './context'



export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({})
  return(
    <authContext.Provider
     value={{
      auth, 
      setAuth
     }} 
    >
    { children }
    </authContext.Provider>
   )
}