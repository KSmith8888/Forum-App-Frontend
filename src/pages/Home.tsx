import React, { useEffect } from "react";
import {
    useLoaderData,
    useSearchParams,
    redirect,
    Link,
    useOutletContext,
} from "react-router-dom";

import { outletInterface, postInterface } from "../utils/interfaces";

export async function homeLoader({ ...args }) {
    try {
        const url = new URL(args.request.url);
        const redirectRoute = url.searchParams.get("route");
        if (redirectRoute) {
            return redirect(redirectRoute);
        }
        const res = await fetch("http://127.0.0.1:3000/api/v1/posts/popular");
        if (!res.ok) {
            throw new Error(`Status error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        let errorMsg = "Post data is unavailable at this time";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
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
    const postData = useLoaderData() as Array<postInterface> | string;
    const postElements =
        typeof postData !== "string" ? (
            postData.map((post) => {
                const startingChars = post.content.substring(0, 25);
                return (
                    <div key={post._id} className="trending-post-link">
                        <Link to={`/posts/details/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <p>{`${startingChars}...`}</p>
                    </div>
                );
            })
        ) : (
            <p>{postData}</p>
        );

    return (
        <>
            <p className="user-message">{message ? message : ""}</p>
            <h2 className="home-heading">Trending Posts</h2>
            <div>{postElements}</div>
        </>
    );
}
