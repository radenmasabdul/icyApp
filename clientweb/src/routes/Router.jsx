import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/Login";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
]);
