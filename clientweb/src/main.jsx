import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={Router}></RouterProvider>
        </ThemeProvider>
    </StrictMode>
);
