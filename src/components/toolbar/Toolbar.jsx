import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { Toolbar as MuiToolbar } from "@mui/material";
import { AuthenticationContext } from "../../App";
import styles from "./Toolbar.module.css";

function Toolbar(props) {
  const { handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setIsAuthenticated, user, setUser } = useContext(
    AuthenticationContext
  );
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({ avatar: "", banner: "", name: "" });
  };

  const handleMyAccountClick = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <MuiToolbar
      sx={{
        position: "fixed",
        width: "100%",
        boxShadow: 5,
        backgroundColor: "#533ADA",
        zIndex: 1201,
        justifyContent: "space-between",
        color: "#fff",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        FionaBombona
      </Typography>
      <div>
        <Avatar
          className={styles.avatar}
          alt="Remy Sharp"
          onClick={handleMenu}
          src={user?.avatar}
        />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </MuiToolbar>
  );
}

export default Toolbar;
