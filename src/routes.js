import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginForm/LoginForm";
import NavBar from "./components/navbar/NavBar";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Post from "./components/posts/Post";
import PostForm from "./components/posts/PostForm";
import Posts from "./components/posts/Posts";
import MyProfile from "./components/profile/MyProfile";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profile/Profiles";
import RegisterForm from "./components/registerForm/RegisterForm";

export const protectedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <MyProfile />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/posts/new",
        element: <PostForm />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/profiles/:name",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
export const otherRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "*",
    element: <LoginForm />,
  },
]);
