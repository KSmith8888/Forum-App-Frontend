import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./MainLayout.tsx";
import ErrorElement from "./Error.tsx";
import Home from "../routes/home-route/Home.tsx";
import Search from "../routes/search-route/Search.tsx";
import Attribution from "../routes/attribution-route/Attribution.tsx";
import PostsByTopic from "../routes/posts-by-topic-route/PostsByTopic.tsx";
import EditPost from "../routes/edit-post-route/EditPost.tsx";
import EditComment from "../routes/edit-comment-route/EditComment.tsx";
import Post from "../routes/post-route/Post.tsx";
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
        Component: MainLayout,
        ErrorBoundary: ErrorElement,
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
                Component: Home,
                loader: Home.loader,
                ErrorBoundary: ErrorElement,
            },
            {
                path: "/search/",
                Component: Search,
                loader: Search.loader,
                action: Search.action,
                ErrorBoundary: ErrorElement,
            },
            {
                path: "/attribution/",
                Component: Attribution,
                ErrorBoundary: ErrorElement,
            },
            {
                path: "/posts",
                children: [
                    {
                        path: "topics/:topic/",
                        Component: PostsByTopic,
                        loader: PostsByTopic.loader,
                        ErrorBoundary: ErrorElement,
                    },
                    {
                        path: "edit/:id/:title/",
                        Component: EditPost,
                        loader: EditPost.loader,
                        action: EditPost.action,
                        ErrorBoundary: ErrorElement,
                    },
                    {
                        path: "comments/edit/:id",
                        Component: EditComment,
                        loader: EditComment.loader,
                        action: EditComment.action,
                        ErrorBoundary: ErrorElement,
                    },
                    {
                        path: ":id/:title/",
                        Component: Post,
                        loader: Post.loader,
                        action: Post.action,
                        ErrorBoundary: ErrorElement,
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
