import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "./Error";
import Home, { homeLoader } from "../pages/Home";
import NotFound from "../pages/NotFound";
import "../assets/styles.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route
                index
                element={<Home />}
                errorElement={<Error />}
                loader={homeLoader}
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
