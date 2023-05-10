import React from "react";
import { useLoaderData, Link } from "react-router-dom";

export async function resultsLoader({ request }) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/search?query=${query}`
        );
        if (!response.ok) {
            throw new Error(`Status error ${response.status}`);
        }
        const resultsData = await response.json();
        return resultsData;
    } catch (error) {
        return error;
    }
}

export default function Results() {
    const searchResults = useLoaderData() || [];
    const postElements = searchResults.map((post) => {
        return (
            <article className="post-container" key={post._id}>
                <Link to={`/posts/details/${post._id}`}>
                    <h2 className="post-title">{post.title}</h2>
                </Link>
                <p className="post-text">{post.content}</p>
            </article>
        );
    });

    return (
        <div className="results-container">
            {searchResults.length > 0 ? (
                postElements
            ) : (
                <h3>No results found</h3>
            )}
        </div>
    );
}
