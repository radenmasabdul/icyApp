import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/Login";
import Home from "../views/home/Home";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);
