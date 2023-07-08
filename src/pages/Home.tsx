import { useEffect } from "react";
import {
    useLoaderData,
    useSearchParams,
    redirect,
    Link,
    useOutletContext,
} from "react-router-dom";

import {
    outletInterface,
    postInterface,
    loaderActionInterface,
} from "../utils/interfaces.ts";

export async function homeLoader({ request }: loaderActionInterface) {
    const url = new URL(request.url);
    const redirectRoute = url.searchParams.get("route");
    if (redirectRoute) {
        return redirect(redirectRoute);
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/popular`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    return data;
}

export default function Home() {
    const [searchParams] = useSearchParams();
    const { setIsUserLoggedIn } = useOutletContext<outletInterface>();
    const message = searchParams.get("message");
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "logged in") {
            setIsUserLoggedIn(true);
        }
    }, []);
    const loaderData = useLoaderData();
    const postData = Array.isArray(loaderData) ? loaderData : [];
    const postElements = postData.map((post: postInterface) => {
        const startingChars = post.content.substring(0, 50);
        return (
            <div key={post._id} className="trending-post-link-container">
                <Link
                    to={`/posts/details/${post._id}`}
                    className="trending-post-link"
                >
                    <h3 className="trending-post-title">{post.title}</h3>
                </Link>
                <p className="trending-post-text">{`${startingChars}...`}</p>
            </div>
        );
    });

    return (
        <>
            <p className="user-message">{message ? message : ""}</p>
            <div className="home-container">
                <section className="trending-posts-section">
                    <h2 className="popular-posts-heading">Popular Posts:</h2>
                    {postElements.length > 0 ? (
                        <div className="trending-post-elements">
                            {postElements}
                        </div>
                    ) : (
                        <p>No popular posts available at this time</p>
                    )}
                </section>
                <section className="topics-links-section">
                    <h2 className="topics-heading">Topics:</h2>
                    <nav className="topics-nav">
                        <Link to="/posts/programming" className="link">
                            Programming
                        </Link>
                        <Link to="/posts/movies" className="link">
                            Movies
                        </Link>
                        <Link to="/posts/politics" className="link">
                            Politics
                        </Link>
                        <Link to="/posts/games" className="link">
                            Games
                        </Link>
                        <Link to="/posts/space" className="link">
                            Space
                        </Link>
                        <Link to="/posts/books" className="link">
                            Books
                        </Link>
                        <Link to="/posts/other" className="link">
                            Other
                        </Link>
                    </nav>
                </section>
            </div>
        </>
    );
}
