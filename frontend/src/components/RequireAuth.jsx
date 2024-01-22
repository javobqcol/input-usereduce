
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const RequireAuth = ({allowedRoles}) => {
  const {auth} = useAuth()
  const location = useLocation()
  console.log("auth= ", auth," allowedRoles=", allowedRoles)
  console.log(auth?.roles?.find(rol=>(rol.active && allowedRoles.includes(rol.rolename))))
  console.log(auth?.email)
  return (
    auth?.roles?.find(rol=>(rol.active && allowedRoles?.includes(rol.rolename)))
      ? <Outlet/>
      : auth?.email
        ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
        : <Navigate to="/login" state={{ from: location }} replace/>
  )
}
