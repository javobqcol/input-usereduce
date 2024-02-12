import { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
const USERS_URL = "/api/v1/users/";
const ROLES = ["user", "moderator", "admin"];
export const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickUserActive = async(e, user) => {
    user = {...user, active:!user.active}
    console.log(JSON.stringify(user))
    setUsers((users) => users.map((us) => (us.id === user.id ? user : us)));
    const response = await axiosPrivate.put(`${USERS_URL}${user.id}`,JSON.stringify(user));
  }
  
  const handleClickRoles = async(e, user, rol) => {
    console.log(rol, user);
    const role = user.roles.find((ro) => ro.rolename === rol);
    if (role) {
      user.roles = user.roles.map((ro) =>
        ro.rolename === rol ? { ...ro, active: !ro.active } : ro
      );
      console.log(user.roles);
    } else {
      user.roles = [...user.roles, { rolename: rol, active: true }];
    }

    setUsers((users) => users.map((us) => (us.id === user.id ? user : us)));
    console.log(JSON.stringify(user))
    const response = await axiosPrivate.put(`${USERS_URL}${user.id}`,JSON.stringify(user));
  };

  useEffect(() => {
    console.log("por aqui");
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL);
        console.log("response", response);

        setUsers(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("error", error);
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
              {ROLES.map((rol, i) => (
                <TableCell key={i} align="center">
                  {rol}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" sx={{cursor:"pointer"}}scope="row" onClick={(e) =>handleClickUserActive(e, user)}>
                  {user.active? <IconButton><AccountCircleIcon/></IconButton> : <IconButton><NoAccountsIcon /></IconButton>}

                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.password}</TableCell>
                {ROLES.map((rol) =>
                  user.roles.find((ro) => ro.rolename === rol && ro.active) ? (
                    <TableCell
                      sx={{cursor:"pointer"}}
                      key={rol}
                      onClick={(e) => handleClickRoles(e, user, rol)}
                      align="center"
                    >
                     <IconButton><HowToRegIcon /></IconButton> 
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{cursor:"pointer"}}
                      key={rol}
                      onClick={(e) => handleClickRoles(e, user, rol)}
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
