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
//Pages
import Home, { homeLoader } from "../pages/Home";
import Search, { searchAction, resultsLoader } from "../pages/Search";
import Post, { postLoader, commentAction } from "../pages/Post";
import PostsByTopic, { postsTopicLoader } from "../pages/PostsByTopic";
import CreatePost, { createPostAction } from "../pages/CreatePost";
import Register, { registerAction } from "../pages/Register";
import Profile, { profileLoader } from "../pages/Profile";
import Login, { loginAction } from "../pages/Login";
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
                    action={commentAction}
                    errorElement={<Error />}
                />
            </Route>
            <Route
                path="/register"
                element={<Register />}
                action={registerAction}
                errorElement={<Error />}
            />
            <Route
                path="/login"
                element={<Login />}
                action={loginAction}
                errorElement={<Error />}
            />
            <Route path="/profile" errorElement={<Error />}>
                <Route index element={<Profile />} loader={profileLoader} />
                <Route
                    path="create"
                    element={<CreatePost />}
                    action={createPostAction}
                />
            </Route>
            <Route path="*" element={<NotFound />} errorElement={<Error />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
