import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./MainLayout.tsx";
import ErrorElement from "./Error.tsx";
import Home from "../routes/home-route/Home.tsx";
import homeLoader from "../routes/home-route/home-loader.tsx";
import Search from "../routes/search-route/Search.tsx";
import searchLoader from "../routes/search-route/search-loader.tsx";
import searchAction from "../routes/search-route/search-action.tsx";
import Attribution from "../routes/attribution-route/Attribution.tsx";
import PostsByTopic from "../routes/posts-by-topic-route/PostsByTopic.tsx";
import postsByTopicLoader from "../routes/posts-by-topic-route/posts-by-topic-loader.tsx";
import EditPost from "../routes/edit-post-route/EditPost.tsx";
import editPostLoader from "../routes/edit-post-route/edit-post-loader.tsx";
import editPostAction from "../routes/edit-post-route/edit-post-action.tsx";
import EditComment from "../routes/edit-comment-route/EditComment.tsx";
import editCommentLoader from "../routes/edit-comment-route/edit-comment-loader.tsx";
import editCommentAction from "../routes/edit-comment-route/edit-comment-action.tsx";
import Post from "../routes/post-route/Post.tsx";
import postLoader from "../routes/post-route/post-loader.tsx";
import postAction from "../routes/post-route/post-action.tsx";
import CreatePost from "../pages/CreatePost.tsx";
import createPostAction from "../actions/create-post-action.tsx";
import Register from "../pages/Register.tsx";
import VerifyEmail from "../pages/VerifyEmail.tsx";
import verifyAction from "../actions/verify-action.tsx";
import registerAction from "../actions/register-action.tsx";
import Profile from "../pages/Profile.tsx";
import profileAction from "../actions/profile-action.tsx";
import profileLoader from "../loaders/profile-loader.tsx";
import UserDetails from "../pages/UserDetails.tsx";
import userDetailsLoader from "../loaders/user-details-loader.tsx";
import Login from "../pages/Login.tsx";
import loginAction from "../actions/login-action.tsx";
import Moderation from "../pages/Moderation.tsx";
import moderationAction from "../actions/moderation-action.tsx";
import moderationLoader from "../loaders/moderation-loader.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";
import CompleteReset from "../pages/CompleteReset.tsx";
import completeResetAction from "../actions/complete-reset-action.tsx";
import resetAction from "../actions/reset-action.tsx";
import Terms from "../pages/Terms.tsx";
import NotFound from "../pages/NotFound.tsx";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        errorElement: <ErrorElement />,
        hydrateFallbackElement: (
            <div id="loading-area">
                <div id="loading-spinner"></div>
                <p id="loading-text">Loading</p>
            </div>
        ),
        children: [
            {
                path: "/",
                index: true,
                element: <Home />,
                loader: homeLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: "/search/",
                element: <Search />,
                loader: searchLoader,
                action: searchAction,
                errorElement: <ErrorElement />,
            },
            {
                path: "/attribution/",
                element: <Attribution />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/posts",
                children: [
                    {
                        path: "topics/:topic/",
                        element: <PostsByTopic />,
                        loader: postsByTopicLoader,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "edit/:id/:title/",
                        element: <EditPost />,
                        loader: editPostLoader,
                        action: editPostAction,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "comments/edit/:id",
                        element: <EditComment />,
                        loader: editCommentLoader,
                        action: editCommentAction,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: ":id/:title/",
                        element: <Post />,
                        loader: postLoader,
                        action: postAction,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
            {
                path: "/register/",
                element: <Register />,
                action: registerAction,
                errorElement: <ErrorElement />,
            },
            {
                path: "/verify/",
                element: <VerifyEmail />,
                action: verifyAction,
                errorElement: <ErrorElement />,
            },
            {
                path: "/login/",
                element: <Login />,
                action: loginAction,
                errorElement: <ErrorElement />,
            },
            {
                path: "/users/details/:username/",
                element: <UserDetails />,
                loader: userDetailsLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: "/profile",
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                        loader: profileLoader,
                        action: profileAction,
                    },
                    {
                        path: "create/",
                        element: <CreatePost />,
                        action: createPostAction,
                    },
                ],
            },
            {
                path: "/moderation/",
                element: <Moderation />,
                loader: moderationLoader,
                action: moderationAction,
                errorElement: <ErrorElement />,
            },
            {
                path: "/reset",
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <ResetPassword />,
                        action: resetAction,
                    },
                    {
                        path: "complete/",
                        element: <CompleteReset />,
                        action: completeResetAction,
                    },
                ],
            },
            {
                path: "/terms/",
                element: <Terms />,
                errorElement: <ErrorElement />,
            },
            {
                path: "*",
                element: <NotFound />,
                errorElement: <ErrorElement />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
