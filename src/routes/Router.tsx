import { MainNavbar } from "../components/Navbar/navbar";
import { Auth } from "../pages/Auth";
import { AuthRedirector } from "../pages/AuthRedirector";
import { Home } from "../pages/Home";
import { MovieDetails } from "../pages/MovieDetails";
import { UserAccount } from "../pages/UserAccount";
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";

const requireAuth = (element: JSX.Element) => {
  const path = window.location.pathname;
  const token = localStorage.getItem("jwt");
  if (!token && path !== "/auth") {
    window.location.href = "/";
  }
  return element;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: requireAuth(<Home />),
  },
  {
    path: "/movie/:id",
    element: requireAuth(<MovieDetails />),
  },
  {
    path: "/user",
    element: requireAuth(<UserAccount />),
  },
  {
    path: "/auth",
    element: <AuthRedirector />,
  },
  {
    path: "/",
    element: <Auth />,
  },
]);

export const CurrentRouter = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
