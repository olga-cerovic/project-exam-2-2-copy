import React, { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import styles from "./components/loginForm/LoginForm.module.css";

import { otherRoutes, protectedRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProfile } from "./utils";

export const AuthenticationContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState({
    avatar: localStorage.getItem("avatar"),
    banner: localStorage.getItem("banner"),
    name: localStorage.getItem("name"),
  });

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile({ name: user?.name });
      setUser({ avatar: data.avatar, banner: data.banner, name: data.name });
    };
    getProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem("avatar", user.avatar);
    localStorage.setItem("banner", user.banner);
    localStorage.setItem("name", user.name);
  }, [user]);

  return (
    <Box sx={{ maxWidth: "100%" }} className={styles.documentContainer}>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
      >
        {!isAuthenticated ? (
          <Box className={styles.loginContainer}>
            <RouterProvider router={otherRoutes} />
          </Box>
        ) : (
          <RouterProvider router={protectedRoutes}></RouterProvider>
        )}
        <ToastContainer />
      </AuthenticationContext.Provider>
    </Box>
  );
}

export default App;
