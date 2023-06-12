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
} from "../utils/interfaces";

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
    if (!Array.isArray(data)) {
        throw new Error("Invalid data returned from server");
    }
    return data;
}

export default function Home() {
    const [searchParams] = useSearchParams();
    const { setIsUserLoggedIn } = useOutletContext() as outletInterface;
    const message = searchParams.get("message");
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "logged in") {
            setIsUserLoggedIn(true);
        }
    }, []);
    const postData = useLoaderData() as Array<postInterface>;
    const postElements = postData.map((post) => {
        const startingChars = post.content.substring(0, 50);
        return (
            <div key={post._id} className="trending-post-link">
                <Link to={`/posts/details/${post._id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>{`${startingChars}...`}</p>
            </div>
        );
    });

    return (
        <div className="home-container">
            <p className="user-message">{message ? message : ""}</p>
            <section className="trending-posts-section">
                <h2 className="home-heading">Trending Posts:</h2>
                {postElements.length > 0 ? (
                    <div className="trending-post-elements">{postElements}</div>
                ) : (
                    <p>No trending posts available at this time</p>
                )}
            </section>
            <section className="topics-links-section">
                <h2>Topics:</h2>
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
    );
}
