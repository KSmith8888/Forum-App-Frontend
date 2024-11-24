import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

import MainLayout from "./MainLayout.tsx";
import ErrorElement from "./Error.tsx";
import Home from "../pages/Home.tsx";
import homeLoader from "../loaders/home-loader.tsx";
import Attribution from "../pages/Attribution.tsx";
import Search from "../pages/Search.tsx";
import searchAction from "../actions/search-action.tsx";
import resultsLoader from "../loaders/search-loader.tsx";
import Post from "../pages/Post.tsx";
import postAction from "../actions/post-action.tsx";
import postLoader from "../loaders/post-loader.tsx";
import PostsByTopic from "../pages/PostsByTopic.tsx";
import postsTopicLoader from "../loaders/topic-posts-loader.tsx";
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
import EditPost from "../pages/EditPost.tsx";
import editPostAction from "../actions/edit-post-action.tsx";
import editPostLoader from "../loaders/edit-post-loader.tsx";
import EditComment from "../pages/EditComment.tsx";
import editCommentAction from "../actions/edit-comment-action.tsx";
import editCommentLoader from "../loaders/edit-comment-loader.tsx";
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
                path="/search/"
                element={<Search />}
                loader={resultsLoader}
                action={searchAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/attribution/"
                element={<Attribution />}
                errorElement={<ErrorElement />}
            />
            <Route path="/posts">
                <Route
                    path="topics/:topic/"
                    element={<PostsByTopic />}
                    loader={postsTopicLoader}
                    errorElement={<ErrorElement />}
                />
                <Route
                    path="edit/:id/:title/"
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
                <Route
                    path=":id/:title/"
                    element={<Post />}
                    loader={postLoader}
                    action={postAction}
                    errorElement={<ErrorElement />}
                />
            </Route>
            <Route
                path="/register/"
                element={<Register />}
                action={registerAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/verify/"
                element={<VerifyEmail />}
                action={verifyAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/login/"
                element={<Login />}
                action={loginAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/users/details/:username/"
                element={<UserDetails />}
                loader={userDetailsLoader}
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
                    path="create/"
                    element={<CreatePost />}
                    action={createPostAction}
                />
            </Route>
            <Route
                path="/moderation/"
                element={<Moderation />}
                loader={moderationLoader}
                action={moderationAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/reset/"
                element={<ResetPassword />}
                action={resetAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/reset/complete/"
                element={<CompleteReset />}
                action={completeResetAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/terms/"
                element={<Terms />}
                errorElement={<ErrorElement />}
            />
            <Route
                path="*"
                element={<NotFound />}
                errorElement={<ErrorElement />}
            />
        </Route>
    ),
    {
        future: {
            v7_normalizeFormMethod: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
            v7_fetcherPersist: true,
        },
    }
);

export default function App() {
    return (
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    );
}
