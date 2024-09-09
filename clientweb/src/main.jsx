import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.jsx";

import { store } from "./utils/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={Router}></RouterProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
