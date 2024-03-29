import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
const USERS_URL = "/api/v1/users/";
const ROLES_URL = "/api/v1/roles/only/";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

     const handleClickUserActive = async(e, user, index) => {
        const updated = {...user, active:!user.active}   
        console.log("updateUser", updated)    
        const updateUsers=[...users]
        console.log("updateUsers",updateUsers[index])
        updateUsers[index] = updated
        setUsers(updateUsers);
        console.log("updateUsers",updateUsers[index])
        const response = await axiosPrivate.put(`${USERS_URL}${user.id}`,JSON.stringify(updated));
        console.log(response)
      }
      
      const handleClickRoles = async(e, user, rol, i) => {
        console.log( user, rol, i)
    
        const role = user.roles.find((ro) => ro.id === rol.id);
        console.log("role", role)
        if (!role) {
          user.roles =[...user.roles, {id:rol.id, usertorol:{active:true}}]
        
        } else {
          user.roles[i] ={...role, usertorol:{active: !role.usertorol.active}}   
        }  
        console.log(user.roles[i])
        setUsers((users) => users.map((us) => (us.id === user.id ? user : us)));
        console.log(users)  
        const response = await axiosPrivate.put(`${USERS_URL}${user.id}`,JSON.stringify(user));
      };


  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL);
        setUsers(response.data);
        const response1 = await axiosPrivate.get(ROLES_URL);
        setRoles(response1.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      {users?.length ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Password</TableCell>
              {roles?.map((rol, i) => (
                <TableCell key={i} align="center">
                  {rol.rolename}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" sx={{cursor:"pointer"}}scope="row"  onClick={(e) =>handleClickUserActive(e, user, index)}>
                  {user.active? <IconButton><AccountCircleIcon/></IconButton> : <IconButton><NoAccountsIcon /></IconButton>}

                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.password}</TableCell>
                {roles?.map((rol, i) =>
                  user.roles.find((ro) => ro.id === rol.id && ro.usertorol.active) ? (
                    <TableCell
                      sx={{cursor:"pointer"}}
                      key={i}
                      onClick={(e) => handleClickRoles(e, user, rol, i)}
                      align="center"
                    >
                     <IconButton><HowToRegIcon /></IconButton> 
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{cursor:"pointer"}}
                      key={i}
                      onClick={(e) => handleClickRoles(e, user, rol, i)}
                      align="center"
                    >
                      <IconButton><CloseIcon /></IconButton>
                    </TableCell>
                  )
                )}
                {/* roles.map((rol, i) => (a.find( ro => ro.rolename===rol) ? `ok ${rol}`:`no ${rol}`)) */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography
          sx={{ transition: "color 10seg", color: "red" }}
          variant="h2"
          component="p"
        >
          No user to display
        </Typography>
      )}
    </TableContainer>
  );
};
