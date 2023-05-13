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
import { loginAction } from "./Header";
import { resultsLoader } from "./Results";
//Pages
import Home, { homeLoader } from "../pages/Home";
import Search, { searchAction } from "../pages/Search";
import Post, { postLoader } from "../pages/Post";
import PostsByTopic, { postsTopicLoader } from "../pages/PostsByTopic";
import CreatePost, { createPostAction } from "../pages/CreatePost";
import NotFound from "../pages/NotFound";
//Assets
import "../assets/styles.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route
                path="/"
                element={<Home />}
                loader={homeLoader}
                action={loginAction}
                errorElement={<Error />}
            />
            <Route
                path="/search"
                element={<Search />}
                loader={resultsLoader}
                action={searchAction}
                errorElement={<Error />}
            />
            <Route path="/posts">
                <Route
                    path=":topic"
                    element={<PostsByTopic />}
                    loader={postsTopicLoader}
                    errorElement={<Error />}
                />
                <Route
                    path="details/:id"
                    element={<Post />}
                    loader={postLoader}
                    errorElement={<Error />}
                />
            </Route>
            <Route
                path="/create"
                element={<CreatePost />}
                action={createPostAction}
                errorElement={<Error />}
            />
            <Route path="*" element={<NotFound />} errorElement={<Error />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
