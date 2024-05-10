import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
//Components
import MainLayout from "./MainLayout.tsx";
import ErrorElement from "./Error.tsx";
//Pages
import Home from "../pages/Home.tsx";
import homeLoader from "../loaders/home-loader.tsx";
import Search, { searchAction } from "../pages/Search.tsx";
import resultsLoader from "../loaders/search-loader.tsx";
import Post, { commentAction } from "../pages/Post.tsx";
import postLoader from "../loaders/post-loader.tsx";
import PostsByTopic from "../pages/PostsByTopic.tsx";
import postsTopicLoader from "../loaders/topic-posts-loader.tsx";
import CreatePost, { createPostAction } from "../pages/CreatePost.tsx";
import Register, { registerAction } from "../pages/Register.tsx";
import Profile, { profileAction } from "../pages/Profile.tsx";
import profileLoader from "../loaders/profile-loader.tsx";
import EditPost, { editPostAction } from "../pages/EditPost.tsx";
import editPostLoader from "../loaders/edit-post-loader.tsx";
import EditComment, { editCommentAction } from "../pages/EditComment.tsx";
import editCommentLoader from "../loaders/edit-comment-loader.tsx";
import Login, { loginAction } from "../pages/Login.tsx";
import Moderation, { moderationAction } from "../pages/Moderation.tsx";
import moderationLoader from "../loaders/moderation-loader.tsx";
import Terms from "../pages/Terms.tsx";
import NotFound from "../pages/NotFound.tsx";
//Assets
import "../assets/styles/main.css";

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
                path="/moderation"
                element={<Moderation />}
                loader={moderationLoader}
                action={moderationAction}
                errorElement={<ErrorElement />}
            />
            <Route
                path="/terms"
                element={<Terms />}
                errorElement={<ErrorElement />}
            />
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
