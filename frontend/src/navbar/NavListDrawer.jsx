import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavListDrawer = ({ navArrayLinks }) => {
  return (
    <Box sx={{ width: 250 }}>

      <nav>
        <List>
          {navArrayLinks.map((nav, i) => (
            <ListItem key={i} disablePadding>
                
              <ListItemButton component={NavLink} to={nav.path}>
              <ListItemIcon>{nav.icon}</ListItemIcon>  
              <ListItemText>{nav.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
