import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
//Components
import MainLayout from "./MainLayout";
import ErrorElement from "./Error";
//Pages
import Home, { homeLoader } from "../pages/Home";
import Search, { searchAction, resultsLoader } from "../pages/Search";
import Post, { postLoader, commentAction } from "../pages/Post";
import PostsByTopic, { postsTopicLoader } from "../pages/PostsByTopic";
import CreatePost, { createPostAction } from "../pages/CreatePost";
import Register, { registerAction } from "../pages/Register";
import Profile, { profileLoader, profileAction } from "../pages/Profile";
import EditPost, { editPostLoader, editPostAction } from "../pages/EditPost";
import EditComment, {
    editCommentLoader,
    editCommentAction,
} from "../pages/EditComment";
import Login, { loginAction } from "../pages/Login";
import NotFound from "../pages/NotFound";
//Assets
import "../assets/styles.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />} errorElement={<ErrorElement />}>
            <Route
                path="/"
                element={<Home />}
                loader={homeLoader}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/search"
                element={<Search />}
                loader={resultsLoader}
                action={searchAction}
                errorElement={<ErrorElement />}
            />
            <Route path="/posts">
                <Route
                    path=":topic"
                    element={<PostsByTopic />}
                    loader={postsTopicLoader}
                    errorElement={<ErrorElement />}
                />
                <Route
                    path="details/:id"
                    element={<Post />}
                    loader={postLoader}
                    action={commentAction}
                    errorElement={<ErrorElement />}
                />
                <Route
                    path="edit/:id"
                    element={<EditPost />}
                    loader={editPostLoader}
                    action={editPostAction}
                    errorElement={<ErrorElement />}
                />
                <Route
                    path="comments/edit/:id"
                    element={<EditComment />}
                    loader={editCommentLoader}
                    action={editCommentAction}
                    errorElement={<ErrorElement />}
                />
            </Route>
            <Route
                path="/register"
                element={<Register />}
                action={registerAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/login"
                element={<Login />}
                action={loginAction}
                errorElement={<ErrorElement />}
            />
            <Route path="/profile" errorElement={<ErrorElement />}>
                <Route
                    index
                    element={<Profile />}
                    loader={profileLoader}
                    action={profileAction}
                />
                <Route
                    path="create"
                    element={<CreatePost />}
                    action={createPostAction}
                />
            </Route>
            <Route
                path="*"
                element={<NotFound />}
                errorElement={<ErrorElement />}
            />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
