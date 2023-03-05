import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Toolbar from "../toolbar/Toolbar";
import styles from "./NavBar.module.css";

const drawerWidth = 240;
const menuItems = [
  { name: "My Profile", link: "/profile" },
  { name: "All Posts", link: "/posts" },
  { name: "All Profiles", link: "/profiles" },
];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List sx={{ mt: 8 }}>
      {menuItems.map((menuItem, index) => (
        <ListItem
          key={menuItem.name}
          disablePadding
          sx={{ backgroundColor: "#fcfcfc" }}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "#414141" }}>
              {index % 2 === 0 ? <AccountBoxIcon /> : <MailIcon />}
            </ListItemIcon>
            <NavLink
              to={menuItem.link}
              sx={{ color: "#414141" }}
              className={styles.activeLink}
            >
              <ListItemText primary={menuItem.name} />
            </NavLink>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Toolbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ display: "flex", backgroundColor: "#fcfcfc" }}>
        {" "}
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        ></AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#fcfcfc",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              backgroundColor: "#fcfcfc",
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#fcfcfc",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            marginTop: "70px",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet />{" "}
        </Box>
      </Box>
    </div>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
