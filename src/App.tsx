import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

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
import Register from "./routes/register-route/Register.tsx";
import registerAction from "./routes/register-route/register-action.tsx";
import Login from "./routes/login-route/Login.tsx";
import loginAction from "./routes/login-route/login-action.tsx";
import Terms from "./routes/terms-route/Terms.tsx";
import NotFound from "./routes/not-found-route/NotFound.tsx";

import "./assets/styles/fallback.css";

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
                        lazy: async () =>
                            await import(
                                "./routes/create-post-route/CreatePost.tsx"
                            ),
                    },
                    {
                        path: "topics/:topic/",
                        element: <PostsByTopic />,
                        loader: postsByTopicLoader,
                    },
                    {
                        path: "edit/:id/:title/",
                        lazy: async () =>
                            await import(
                                "./routes/edit-post-route/EditPost.tsx"
                            ),
                    },
                    {
                        path: "comments/edit/:id",
                        lazy: async () =>
                            await import(
                                "./routes/edit-comment-route/EditComment.tsx"
                            ),
                    },
                    {
                        path: ":id/:title/",
                        lazy: async () =>
                            await import("./routes/post-route/Post.tsx"),
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
                lazy: async () =>
                    await import("./routes/verify-route/VerifyEmail.tsx"),
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
                lazy: async () =>
                    await import("./routes/user-details-route/UserDetails.tsx"),
                errorElement: <ErrorElement />,
            },
            {
                path: "/profile/",
                lazy: async () =>
                    await import("./routes/profile-route/Profile.tsx"),
                errorElement: <ErrorElement />,
            },
            {
                path: "/moderation/",
                lazy: async () =>
                    await import("./routes/moderation-route/Moderation.tsx"),
                errorElement: <ErrorElement />,
            },
            {
                path: "/reset",
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        lazy: async () =>
                            await import(
                                "./routes/reset-route/ResetPassword.tsx"
                            ),
                    },
                    {
                        path: "complete/",
                        lazy: async () =>
                            await import(
                                "./routes/complete-reset-route/CompleteReset.tsx"
                            ),
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
