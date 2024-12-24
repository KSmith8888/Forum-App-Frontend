import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./components/MainLayout.tsx";
import ErrorElement from "./components/Error.tsx";
import Home from "./routes/home-route/Home.tsx";
import homeLoader from "./routes/home-route/home-loader.tsx";
import Search from "./routes/search-route/Search.tsx";
import searchLoader from "./routes/search-route/search-loader.tsx";
import searchAction from "./routes/search-route/search-action.tsx";
import Attribution from "./routes/attribution-route/Attribution.tsx";
import PostsByTopic from "./routes/posts-by-topic-route/PostsByTopic.tsx";
import postsByTopicLoader from "./routes/posts-by-topic-route/posts-by-topic-loader.tsx";
import EditPost from "./routes/edit-post-route/EditPost.tsx";
import editPostLoader from "./routes/edit-post-route/edit-post-loader.tsx";
import editPostAction from "./routes/edit-post-route/edit-post-action.tsx";
import EditComment from "./routes/edit-comment-route/EditComment.tsx";
import editCommentLoader from "./routes/edit-comment-route/edit-comment-loader.tsx";
import editCommentAction from "./routes/edit-comment-route/edit-comment-action.tsx";
import Post from "./routes/post-route/Post.tsx";
import postLoader from "./routes/post-route/post-loader.tsx";
import postAction from "./routes/post-route/post-action.tsx";
import CreatePost from "./routes/create-post-route/CreatePost.tsx";
import createPostAction from "./routes/create-post-route/create-post-action.tsx";
import Register from "./routes/register-route/Register.tsx";
import VerifyEmail from "./routes/verify-route/VerifyEmail.tsx";
import verifyAction from "./routes/verify-route/verify-action.tsx";
import registerAction from "./routes/register-route/register-action.tsx";
import Login from "./routes/login-route/Login.tsx";
import loginAction from "./routes/login-route/login-action.tsx";
import UserDetails from "./routes/user-details-route/UserDetails.tsx";
import userDetailsLoader from "./routes/user-details-route/user-details-loader.tsx";
import Profile from "./routes/profile-route/Profile.tsx";
import profileLoader from "./routes/profile-route/profile-loader.tsx";
import profileAction from "./routes/profile-route/profile-action.tsx";
import Moderation from "./routes/moderation-route/Moderation.tsx";
import moderationLoader from "./routes/moderation-route/moderation-loader.tsx";
import moderationAction from "./routes/moderation-route/moderation-action.tsx";
import ResetPassword from "./routes/reset-route/ResetPassword.tsx";
import resetAction from "./routes/reset-route/reset-action.tsx";
import CompleteReset from "./routes/complete-reset-route/CompleteReset.tsx";
import completeResetAction from "./routes/complete-reset-route/complete-reset-action.tsx";

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
                errorElement: <ErrorElement />,
                children: [
                    {
                        path: "create/",
                        element: <CreatePost />,
                        action: createPostAction,
                    },
                    {
                        path: "topics/:topic/",
                        element: <PostsByTopic />,
                        loader: postsByTopicLoader,
                    },
                    {
                        path: "edit/:id/:title/",
                        element: <EditPost />,
                        loader: editPostLoader,
                        action: editPostAction,
                    },
                    {
                        path: "comments/edit/:id",
                        element: <EditComment />,
                        loader: editCommentLoader,
                        action: editCommentAction,
                    },
                    {
                        path: ":id/:title/",
                        element: <Post />,
                        loader: postLoader,
                        action: postAction,
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
                element: <Profile />,
                loader: profileLoader,
                action: profileAction,
                errorElement: <ErrorElement />,
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
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
