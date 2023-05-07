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
import Results, { resultsLoader, searchAction } from "../pages/Results";
import "../assets/styles.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />} errorElement={<Error />}>
            <Route path="/" element={<Home />} loader={homeLoader} />
            <Route
                path="search/:query"
                element={<Results />}
                loader={resultsLoader}
                action={searchAction}
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
