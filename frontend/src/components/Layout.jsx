import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
export const Layout = () => {
  return (
    <Box component="main" >
      <Outlet />
    </Box> 
  )
}
