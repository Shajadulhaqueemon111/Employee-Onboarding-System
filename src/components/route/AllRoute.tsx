import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import Error from "../pages/ErrorPage/Error";
import Home from "../pages/HomePage/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute></MainRoute>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
