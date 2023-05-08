import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
//Components
import MainLayout from "./MainLayout";
import Error from "./Error";
import Results, { resultsLoader } from "./Results";
//Pages
import Home, { homeLoader } from "../pages/Home";
import Search, { searchAction } from "../pages/Search";
import Posts, { postsLoader } from "../pages/Posts";
import NotFound from "../pages/NotFound";
//Assets
import "../assets/styles.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} loader={homeLoader} />
            <Route
                path="/search"
                element={<Search />}
                loader={resultsLoader}
                action={searchAction}
            />
            <Route path="/posts">
                <Route path=":topic" element={<Posts />} loader={postsLoader} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
