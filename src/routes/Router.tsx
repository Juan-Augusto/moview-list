import { MainNavbar } from "../components/Navbar/navbar";
import { Home } from "../pages/Home";
import { MovieDetails } from "../pages/MovieDetails";
import { UserAccount } from "../pages/UserAccount";
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
  {
    path: "/user",
    element: <UserAccount />,
  },
]);

export const CurrentRouter = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
